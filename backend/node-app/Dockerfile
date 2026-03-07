# Sử dụng Node.js base image
FROM node:20

# Thiết lập thư mục làm việc là /app
WORKDIR /app

# Copy file package.json và package-lock.json từ thư mục gốc của context
COPY ./package.json ./package-lock.json ./ 

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn từ context build vào container
COPY . .

# Biên dịch mã nguồn bằng Babel để hỗ trợ ES6+
RUN npx babel src --out-dir build
# Mở cổng ứng dụng
EXPOSE 8080

# Lệnh để khởi động ứng dụng
CMD ["npm", "start"]
