# Sử dụng Python base image
FROM python:3.9-slim

# Cài đặt các công cụ cần thiết và thư viện ZBar
RUN apt-get update && apt-get install -y \
    zbar-tools \
    libzbar0 \
    libglib2.0-0 \
    libgl1-mesa-glx \
    && apt-get clean \
# Thiết lập thư mục làm việc bên trong container
WORKDIR /app-py

# Copy file yêu cầu và cài đặt dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng cho FastAPI app
EXPOSE 8081

# Lệnh chạy FastAPI app
CMD ["python3", "-m", "app.main"]
