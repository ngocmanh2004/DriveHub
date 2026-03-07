import cv2
import sys
import os
import time

def detect_and_crop_qr(image_path, output_dir, padding=10):
    # Đọc hình ảnh
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Image not found or invalid format.")
        return

    # Tạo QRCodeDetector
    detector = cv2.QRCodeDetector()

    # Phát hiện và giải mã QR Code
    data, points, _ = detector.detectAndDecode(image)

    if points is not None:
        # Kiểm tra nếu có QR Code trong ảnh
        print(f"QR Code Data: {data}")

        # Lấy tọa độ các điểm của QR Code
        points = points[0]
        x_min = int(min(points[:, 0]))
        y_min = int(min(points[:, 1]))
        x_max = int(max(points[:, 0]))
        y_max = int(max(points[:, 1]))

        # Thêm viền dư (padding)
        x_min = max(0, x_min - padding)
        y_min = max(0, y_min - padding)
        x_max = min(image.shape[1], x_max + padding)
        y_max = min(image.shape[0], y_max + padding)

        # Cắt vùng QR Code
        cropped = image[y_min:y_max, x_min:x_max]
        timestamp = int(time.time() * 1000)  
        # Kiểm tra kích thước QR Code (> 500x500)
        if cropped.shape[0] > 100 and cropped.shape[1] > 100:
            # Lưu hình ảnh cắt được
            output_path = os.path.join(output_dir, f"cropped_qr_{timestamp}.jpg")
            cv2.imwrite(output_path, cropped)
            print(f"QR Code cropped and saved to: {output_path}")

        # # Vẽ khung phát hiện QR Code lên ảnh gốc
        for i in range(len(points)):
            pt1 = tuple(map(int, points[i]))
            pt2 = tuple(map(int, points[(i + 1) % len(points)]))
            cv2.line(image, pt1, pt2, (0, 255, 0), 3)

        # Lưu ảnh có khung phát hiện QR Code
        detected_image_path = os.path.join(output_dir, f"cropped_qr_{timestamp}_xx.jpg")
        cv2.imwrite(detected_image_path, image)
        print(f"Image with detected QR Code saved to: {detected_image_path}")
    else:
        print("No QR code detected")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        input_image = sys.argv[1]
        output_directory = sys.argv[2]
        os.makedirs(output_directory, exist_ok=True)
        detect_and_crop_qr(input_image, output_directory, padding=20)  # Điều chỉnh viền dư (padding) ở đây
    else:
        print("Usage: python process_qr.py <image_path> <output_dir>")
    