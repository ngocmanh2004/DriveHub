from fastapi.responses import JSONResponse
import numpy as np
from pyzbar.pyzbar import decode
import cv2
import base64
import mediapipe as mp
from fastapi import FastAPI, APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict, Any
import logging
from paddleocr import PaddleOCR
import imagehash
from PIL import Image
from collections import defaultdict
import io
import base64
import openai

router = APIRouter()
# Cấu hình OpenAI client
client = openai.OpenAI(api_key="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")  # 
# Thiết lập logging cơ bản
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
try:
    logging.info("Đang khởi tạo mô hình OCR từ PaddleOCR...")
    ocr = PaddleOCR(lang='vi')
    logging.info("Khởi tạo mô hình OCR thành công. Sẵn sàng nhận yêu cầu.")
except Exception as e:
    logging.error(f"Lỗi khi tải mô hình OCR: {e}. Vui lòng kiểm tra lại các thư viện PaddlePaddle và phụ thuộc.", exc_info=True)
    ocr = None


def preprocess_qr_image(img_cv2): 
    # Chuyển sang grayscale
    img_gray = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2GRAY)

    # Danh sách các ảnh để thử giải mã
    images_to_decode = [img_gray]

    # Áp dụng CLAHE với clipLimit cao hơn để xử lý ánh sáng không đồng đều
    clahe = cv2.createCLAHE(clipLimit=4.0, tileGridSize=(8, 8))
    img_clahe = clahe.apply(img_gray)
    images_to_decode.append(img_clahe)

    # Khử nhiễu với Gaussian Blur, tăng kernel để loại bỏ nhiễu nền
    img_blurred = cv2.GaussianBlur(img_clahe, (7, 7), 1)

    # Áp dụng Otsu thresholding với tiền xử lý để làm rõ QR
    _, img_thresh = cv2.threshold(img_blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    images_to_decode.append(img_thresh)

    # Thêm Morphological Operations để loại bỏ nhiễu nhỏ (như chữ nền)
    kernel = np.ones((3, 3), np.uint8)
    img_morph = cv2.morphologyEx(img_thresh, cv2.MORPH_OPEN, kernel)
    images_to_decode.append(img_morph)

    # Thử các kích thước ảnh khác nhau (tăng tỷ lệ nhỏ hơn cho QR nhỏ)
    scales = [1.0, 0.75, 0.5, 0.3]  # 100%, 75%, 50%, 30%
    for scale in scales[1:]:
        resized = cv2.resize(img_morph, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
        images_to_decode.append(resized)

    return images_to_decode


import re

import re
import json


def parse_ocr_json(text: str) -> str:
    """Parse JSON text OCR thành chuỗi pipe-separated giống QR"""

    def normalize_date(date_str: str):
        if not date_str:
            return "null"
        parts = re.findall(r"\d+", date_str)
        if len(parts) == 3:
            dd, mm, yyyy = parts
            return f"{dd.zfill(2)}{mm.zfill(2)}{yyyy}"
        return "null"

    def clean_value(val: str):
        if not val:
            return "null"
        # loại bỏ \n đầu/cuối + gom space thừa
        return re.sub(r"\s+", " ", val).strip()

    # Bóc bỏ ```json ... ``` nếu có
    if text and text.startswith("```"):
        text = re.sub(r"^```json\n?", "", text)
        text = re.sub(r"```$", "", text).strip()

    try:
        parsed = json.loads(text)
        raw_text = parsed.get("text", "")
    except Exception:
        raw_text = text or ""

    # Extract dữ liệu từ raw_text
    cccd = re.search(r"Số định danh cá nhân.*?:\s*([0-9]+)", raw_text)
    name = re.search(
        r"Họ.*?tên.*?:\s*([\s\S]*?)(?:Ngày, tháng, năm sinh|Quốc tịch|Giới tính|Nơi sinh)",
        raw_text,
    )
    dob = re.search(r"Ngày.*?sinh.*?:\s*([0-9/]+)", raw_text)
    gender = re.search(r"Giới tính.*?:\s*([^\n]+)", raw_text)
    issue_date = re.search(r"Ngày cấp.*?:\s*([0-9/]+)", raw_text)

    # 👉 Chỉ lấy Nơi thường trú
    addr_perm = re.search(r"Nơi thường trú.*?:\s*([^\n]+)", raw_text)

    # Làm sạch dữ liệu
    cccd = clean_value(cccd.group(1) if cccd else None)
    scmt = "null"
    name = clean_value(name.group(1) if name else None)
    dob = normalize_date(dob.group(1) if dob else None)
    gender = clean_value(gender.group(1) if gender else None)
    issue_date = normalize_date(issue_date.group(1) if issue_date else None)
    address = clean_value(addr_perm.group(1) if addr_perm else None)
    father = "null"
    mother = "null"

    # Build final string theo QR format (address nằm sau gender)
    final_str = (
        f"{cccd}|{scmt}|{name}|{dob}|{gender}|{address}|"
        f"{issue_date}||{father}|{mother}|---"
    )
    return final_str


async def openai_fallback(img_cv2):
    """Fallback OCR bằng OpenAI GPT-4o-mini nếu không phát hiện QR"""
    # Encode ảnh sang base64
    _, buffer = cv2.imencode(".png", img_cv2)
    base64_image = base64.b64encode(buffer).decode("utf-8")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Hãy đọc toàn bộ văn bản trong hình ảnh và trả về JSON "
                            "theo format: { \"text\": \"...\" }"
                        ),
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{base64_image}"},
                    },
                ],
            }
        ],
    )

    text = response.choices[0].message.content if response.choices else None
    data_str = parse_ocr_json(text)

    return {
        "success": True if data_str else False,
        "decodedText": [
            {
                "data": data_str,
                "type": "OCR"
            }
        ]
    }


def remove_background_and_replace_with_blue(image_bgr):
    mp_selfie_segmentation = mp.solutions.selfie_segmentation
    with mp_selfie_segmentation.SelfieSegmentation(model_selection=1) as segmenter:
        image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
        result = segmenter.process(image_rgb)
        feathered_mask = cv2.GaussianBlur(result.segmentation_mask, (15, 15), 0)
        mask = feathered_mask > 0.1  # Ngưỡng có thể điều chỉnh

        # Tạo nền màu xanh
        
        background_color = (128, 0, 0)  # BGR: Xanh lá cây đậm
        background = np.zeros_like(image_bgr, dtype=np.uint8)
        background[:] = background_color

        # Áp dụng mask
        output_image = np.where(mask[:,:, np.newaxis], image_bgr, background)
        return output_image

def extract_avatar(img_cv2):
    # Tiền xử lý ảnh để cải thiện phát hiện khuôn mặt
    img_gray = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2GRAY)
    img_gray = cv2.equalizeHist(img_gray)
    img_gray = cv2.GaussianBlur(img_gray, (5, 5), 0)

    # Phát hiện khuôn mặt
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    if face_cascade.empty():
        raise ValueError("Could not load face cascade classifier")

    faces = face_cascade.detectMultiScale(img_gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) == 0:
        raise ValueError("No face detected in the image")

    # Lấy khuôn mặt đầu tiên
    (x, y, w, h) = faces[0]
    face_center_x = x + w // 2
    face_center_y = y + h // 2

    # Đặt chiều rộng của khung 3x4 dựa trên chiều rộng khuôn mặt
    box_width = int(w * 1.4)
    box_height = int(w * 1.6 * 4 / 3)  # Tỷ lệ 3:4

    # Tính toán tọa độ mới để crop ảnh
    new_x = max(0, face_center_x - box_width // 2)
    new_y = max(0, face_center_y - box_height // 2)

    # Đảm bảo không vượt quá kích thước ảnh gốc
    new_x = min(new_x, img_cv2.shape[1] - box_width)
    new_y = min(new_y, img_cv2.shape[0] - box_height)
    new_x = max(0, new_x)
    new_y = max(0, new_y)

    # Cắt ảnh theo tỷ lệ 3x4
    avatar = img_cv2[new_y:new_y + box_height, new_x:new_x + box_width]

    # Resize về kích thước chuẩn nếu muốn (ví dụ 300x400)
    avatar_resized = cv2.resize(avatar, (300, 400))

 # Xóa nền và thay bằng nền xanh
    avatar_final = remove_background_and_replace_with_blue(avatar_resized)

    # Chuyển ảnh thành base64
    _, buffer = cv2.imencode('.jpg', avatar_final)
    avatar_base64 = base64.b64encode(buffer).decode('utf-8')

    return avatar_base64

@router.post("/vnid/detect-info")
async def detect_cccd(file: UploadFile=File(...)):
    """Endpoint để tải ảnh CCCD lên và trích xuất thông tin."""
    try:
        logging.info("Nhận yêu cầu tại endpoint /vnid/detect-info.")
        contents = await file.read()
        
        extracted_data = detect_cccd_info(contents)
        
        if not extracted_data:
            return JSONResponse(
                status_code=404,
                content={"success": False, "message": "Không thể trích xuất thông tin từ ảnh."}
            )
            
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": extracted_data,
                "message": "Trích xuất thông tin thành công."
            }
        )
        
    except HTTPException as e:
        logging.error(f"Lỗi HTTP: {e.detail}")
        return JSONResponse(status_code=e.status_code, content={"success": False, "message": e.detail})
    except Exception as e:
        logging.error(f"Lỗi hệ thống không xác định: {e}", exc_info=True)
        return JSONResponse(status_code=500, content={"success": False, "message": "Lỗi hệ thống nội bộ.", 'infE':e})

# Cập nhật hàm find_similar_images_by_hash
def find_similar_images_by_hash(file_list: list, tolerance: int=5):
    """
    Tìm và trả về các cặp hình ảnh giống nhau nhất dựa trên độ khác biệt hash.

    Args:
        file_list (list): Danh sách các đối tượng UploadFile.
        tolerance (int): Ngưỡng khác biệt tối đa để coi là trùng lặp.

    Returns:
        list: Danh sách các cặp hình ảnh tương tự, được sắp xếp theo độ giống nhau giảm dần.
              Mỗi phần tử là một dictionary chứa thông tin về cặp ảnh và độ giống nhau.
    """
    image_list = []
    
    # Bước 1: Tính toán pHash cho mỗi hình ảnh-+ .,
    for file in file_list:
        try:
            image_content = file.file.read()
            img = Image.open(io.BytesIO(image_content))
            
            # Chuyển ảnh sang thang độ xám để phân tích mạnh mẽ hơn
            img_grayscale = img.convert("L")
            phash = imagehash.phash(img_grayscale)
            
            image_list.append({"filename": file.filename, "hash": phash})
        except Exception as e:
            logging.error(f"Lỗi khi xử lý file {file.filename}: {e}")
            
    similar_pairs = []
    
    # Bước 2: So sánh mọi cặp hash và lưu lại độ khác biệt
    for i in range(len(image_list)):
        for j in range(i + 1, len(image_list)):
            file1 = image_list[i]['filename']
            file2 = image_list[j]['filename']
            hash1 = image_list[i]['hash']
            hash2 = image_list[j]['hash']
            
            # Tính độ khác biệt (Hamming distance)
            hash_diff = hash1 - hash2
            
            # Chỉ xem xét những cặp có độ khác biệt nhỏ hơn ngưỡng
            if hash_diff <= tolerance:
                # Ghi lại cặp ảnh, độ khác biệt và tỷ lệ giống nhau
                # Tỷ lệ giống nhau được tính bằng (64 - hash_diff) / 64
                similarity_score = round((64 - hash_diff) / 64 * 100, 2)
                
                similar_pairs.append({
                    "image1": file1,
                    "image2": file2,
                    "hash_difference": hash_diff,
                    "similarity_score": similarity_score  # Thêm tỷ lệ giống nhau
                })

    # Bước 3: Sắp xếp danh sách theo độ khác biệt tăng dần
    # Các cặp giống nhau nhất (độ khác biệt nhỏ nhất) sẽ đứng đầu
    similar_pairs.sort(key=lambda x: x['hash_difference'])
    
    return similar_pairs


@router.post("/images/find-duplicates")
async def find_duplicates(files: list[UploadFile]=File(...)):
    """
    Endpoint để tải lên nhiều hình ảnh và tìm kiếm các hình ảnh trùng lặp.

    Args:
        files (list[UploadFile]): Danh sách các tệp hình ảnh.
    
    Returns:
        JSONResponse: Kết quả tìm kiếm các nhóm hình ảnh trùng lặp.
    """
    if not files:
        raise HTTPException(status_code=400, detail="Không có tệp nào được tải lên.")
    
    # Kiểm tra xem có quá nhiều file không
    if len(files) > 200:
        return JSONResponse(status_code=413, content={"success": False, "message": "Số lượng tệp quá lớn. Vui lòng tải lên tối đa 200 tệp mỗi lần."})

    try:
        duplicate_groups = find_similar_images_by_hash(files, tolerance=5)
        
        if not duplicate_groups:
            return JSONResponse(status_code=200, content={"success": True, "message": "Không tìm thấy hình ảnh trùng lặp."})
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Đã tìm thấy các nhóm hình ảnh trùng lặp.",
                "duplicate_groups": duplicate_groups
            }
        )
    except Exception as e:
        logging.error(f"Lỗi khi xử lý yêu cầu tìm kiếm trùng lặp: {e}", exc_info=True)
        return JSONResponse(status_code=500, content={"success": False, "message": "Lỗi hệ thống nội bộ."})
