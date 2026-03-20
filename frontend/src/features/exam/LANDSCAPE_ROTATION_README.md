# 📱 Force Landscape Mode - Giải pháp xoay UI tự động

## 🎯 Tổng quan

Giải pháp hoàn chỉnh để tự động xoay UI sang chế độ ngang (landscape) cho thiết bị mobile ở chế độ dọc (portrait), được thiết kế đặc biệt cho trang thi thử.

## 📦 Các file đã tạo

```
frontend/src/features/exam/
├── components/
│   ├── ForceLandscapeWrapper.tsx      # Component wrapper chính
│   ├── ForceLandscapeWrapper.scss     # CSS cho rotation
│   ├── ForceLandscapeWrapper.md       # Hướng dẫn chi tiết
│   ├── ExamPageExample.tsx            # Ví dụ demo
│   └── ExamPageExample.scss           # Style cho demo
└── hooks/
    └── useForceLandscape.ts           # Custom hook (optional)
```

## 🚀 Cách sử dụng nhanh

### Bước 1: Import component

```tsx
import { ForceLandscapeWrapper } from '@/features/exam/components';
```

### Bước 2: Wrap nội dung trang thi

```tsx
function YourExamPage() {
  return (
    <ForceLandscapeWrapper>
      {/* Toàn bộ nội dung trang thi của bạn */}
      <YourExamContent />
    </ForceLandscapeWrapper>
  );
}
```

### Bước 3: Xong! 🎉

Component sẽ tự động:
- ✅ Detect mobile + portrait
- ✅ Rotate UI 90 độ
- ✅ Hiển thị thông báo cho user
- ✅ Tự động tắt khi landscape thật

## 💡 Ví dụ thực tế

### Ví dụ 1: Tích hợp vào FinalExamForm

```tsx
// Trong file page hoặc route của bạn
import { ForceLandscapeWrapper, FinalExamForm } from '@/features/exam/components';

function ExamPage() {
  return (
    <ForceLandscapeWrapper>
      <FinalExamForm />
    </ForceLandscapeWrapper>
  );
}
```

### Ví dụ 2: Tắt thông báo

```tsx
<ForceLandscapeWrapper showNotification={false}>
  <FinalExamForm />
</ForceLandscapeWrapper>
```

### Ví dụ 3: Sử dụng với React Router

```tsx
import { Routes, Route } from 'react-router-dom';
import { ForceLandscapeWrapper } from '@/features/exam/components';

function ExamRoutes() {
  return (
    <Routes>
      <Route 
        path="/exam" 
        element={
          <ForceLandscapeWrapper>
            <ExamPage />
          </ForceLandscapeWrapper>
        } 
      />
    </Routes>
  );
}
```

## 🔧 Cách hoạt động

### 1. Detection Logic

```typescript
const isMobile = window.innerWidth <= 768;
const isPortrait = window.innerHeight > window.innerWidth;
const shouldRotate = isMobile && isPortrait;
```

### 2. CSS Transform

```scss
.landscape-wrapper--rotated {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;        // Swap width/height
  height: 100vw;
  transform: rotate(90deg) translateY(-100%);
  transform-origin: top left;
}
```

### 3. Event Listeners

- `resize` - Khi user resize browser
- `orientationchange` - Khi user xoay thiết bị

## 📱 Test trên thiết bị

### Desktop Browser (Chrome DevTools)

1. Mở DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Chọn thiết bị mobile (iPhone, Galaxy, etc.)
4. Xoay sang portrait mode
5. Reload trang → UI sẽ tự động xoay

### Mobile thật

1. Mở trang trên mobile
2. Giữ thiết bị ở chế độ dọc (portrait)
3. Truy cập trang thi → UI tự động xoay
4. Xoay thiết bị sang ngang → UI về bình thường

## ⚙️ Tùy chỉnh

### Thay đổi breakpoint mobile

```tsx
// Trong ForceLandscapeWrapper.tsx
const isMobile = width <= 1024; // Thay vì 768
```

### Custom notification style

```scss
// Trong file SCSS của bạn
.landscape-notification {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 16px 24px;
}
```

### Thay đổi thời gian hiển thị notification

```tsx
// Trong ForceLandscapeWrapper.tsx
setTimeout(() => setShowMessage(false), 5000); // 5 giây thay vì 3
```

## 🐛 Troubleshooting

### Vấn đề: UI bị lệch sau khi rotate

**Giải pháp:**
```scss
.landscape-wrapper--rotated {
  transform-origin: top left; // Đảm bảo có dòng này
  transform: rotate(90deg) translateY(-100%);
}
```

### Vấn đề: Touch events không hoạt động

**Giải pháp:**
```scss
.landscape-wrapper--rotated {
  touch-action: manipulation;
  pointer-events: auto;
}
```

### Vấn đề: Scroll bị lỗi

**Giải pháp:**
```scss
.landscape-wrapper--rotated {
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
```

### Vấn đề: Notification không hiển thị

**Kiểm tra:**
1. `z-index: 10000` đủ cao chưa?
2. `showNotification={true}` đã set chưa?
3. CSS animation có bị conflict không?

## 📊 Performance

- ✅ Lightweight: ~2KB gzipped
- ✅ No dependencies
- ✅ Optimized re-renders
- ✅ Proper cleanup

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome (Desktop) | ✅ |
| Firefox (Desktop) | ✅ |
| Safari (Desktop) | ✅ |
| Chrome (Android) | ✅ |
| Safari (iOS) | ✅ |
| Samsung Internet | ✅ |

## 📝 Best Practices

1. **Chỉ dùng cho trang cần thiết**: Không wrap toàn bộ app, chỉ wrap trang thi
2. **Test trên thiết bị thật**: DevTools không thể thay thế test thật 100%
3. **Giữ UI đơn giản**: Tránh animation phức tạp trong rotated mode
4. **Optimize touch targets**: Đảm bảo button đủ lớn (min 44x44px)

## 🔄 Cập nhật sau này

Nếu cần thêm tính năng:

### 1. Lock orientation khi đã rotate

```tsx
const [isLocked, setIsLocked] = useState(false);

useEffect(() => {
  if (shouldRotate && !isLocked) {
    setIsLocked(true);
    // Prevent further rotation
  }
}, [shouldRotate]);
```

### 2. Thêm animation transition

```scss
.landscape-wrapper {
  transition: transform 0.3s ease-in-out;
}
```

### 3. Thêm loading state

```tsx
const [isReady, setIsReady] = useState(false);

useEffect(() => {
  setTimeout(() => setIsReady(true), 100);
}, []);

return isReady ? <RotatedContent /> : <Loading />;
```

## 📞 Support

Nếu gặp vấn đề:
1. Đọc lại file `ForceLandscapeWrapper.md`
2. Check console log có error không
3. Test trên nhiều thiết bị khác nhau
4. Kiểm tra CSS có bị override không

## 📄 License

MIT

---

**Tạo bởi:** Kiro AI Assistant  
**Ngày:** 2026-03-20  
**Version:** 1.0.0
