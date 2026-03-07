import cv2
import numpy as np
from fastapi import HTTPException


def detect_qr_from_image(file_content: bytes) -> str:
    """
    Nhận diện QR từ nội dung file ảnh.
    Args:
        file_content (bytes): Nội dung ảnh được tải lên.
    Returns:
        str: Dữ liệu QR được phát hiện.
    """
    # Chuyển file ảnh thành định dạng OpenCV
    try:
        np_array = np.frombuffer(file_content, np.uint8)
        image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

    # Dùng OpenCV để detect QR code
    detector = cv2.QRCodeDetector()
    data, points, _ = detector.detectAndDecode(image)

    if data:
        return data
    else:
        raise HTTPException(status_code=404, detail="No QR code detected")
