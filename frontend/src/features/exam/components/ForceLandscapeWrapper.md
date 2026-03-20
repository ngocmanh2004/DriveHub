# ForceLandscapeWrapper - Hướng dẫn sử dụng

## Mô tả
Component wrapper tự động xoay UI sang chế độ ngang (landscape) cho thiết bị mobile ở chế độ dọc (portrait).

## Cách hoạt động
- Detect thiết bị mobile (width ≤ 768px) và orientation portrait (height > width)
- Tự động apply CSS transform để rotate UI 90 độ
- Không xoay màn hình thật của thiết bị, chỉ xoay UI
- Hiển thị thông báo thân thiện cho user

## Cách sử dụng

### 1. Sử dụng Component Wrapper (Khuyến nghị)

```tsx
import { ForceLandscapeWrapper } from '@/features/exam/components';

function ExamPage() {
  return (
    <ForceLandscapeWrapper showNotification={true}>
      <div className="exam-content">
        {/* Nội dung trang thi của bạn */}
      </div>
    </ForceLandscapeWrapper>
  );
}
```

### 2. Sử dụng Custom Hook

```tsx
import { useForceLandscape } from '@/features/exam/hooks';

function ExamPage() {
  const { shouldRotate, isMobile, isPortrait } = useForceLandscape();
  
  return (
    <div className={shouldRotate ? 'rotated-layout' : ''}>
      {/* Nội dung của bạn */}
    </div>
  );
}
```

## Props

### ForceLandscapeWrapper

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| children | ReactNode | required | Nội dung cần wrap |
| showNotification | boolean | true | Hiển thị thông báo khi rotate |

## Ví dụ thực tế

### Ví dụ 1: Trang thi thử cơ bản

```tsx
import { ForceLandscapeWrapper } from '@/features/exam/components';
import { FinalExamForm } from '@/features/exam/components';

function PracticeExamPage() {
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
  <YourExamContent />
</ForceLandscapeWrapper>
```

### Ví dụ 3: Sử dụng với điều kiện

```tsx
function ExamPage() {
  const isExamMode = true;
  
  if (isExamMode) {
    return (
      <ForceLandscapeWrapper>
        <ExamContent />
      </ForceLandscapeWrapper>
    );
  }
  
  return <ExamContent />;
}
```

## Lưu ý kỹ thuật

### 1. CSS Transform
- Sử dụng `transform: rotate(90deg)` với `transform-origin: top left`
- Swap width/height: `width: 100vh`, `height: 100vw`
- `position: fixed` để chiếm full viewport

### 2. Touch Events
- `touch-action: manipulation` để đảm bảo touch hoạt động đúng
- Không bị lệch click/touch sau khi rotate

### 3. Responsive
- Tự động tắt rotation khi:
  - Desktop (width > 768px)
  - Mobile landscape thật (orientation: landscape)

### 4. Performance
- Sử dụng `useEffect` với cleanup để tránh memory leak
- Event listeners được remove khi unmount

## Tùy chỉnh CSS

Nếu cần tùy chỉnh style, bạn có thể override các class:

```scss
// Custom notification style
.landscape-notification {
  background: rgba(33, 150, 243, 0.9);
  border-radius: 12px;
  
  &__icon {
    color: #fff;
  }
}

// Custom wrapper style
.landscape-wrapper--rotated {
  background: #f5f5f5;
}
```

## Troubleshooting

### UI bị lệch sau khi rotate
- Kiểm tra `transform-origin: top left`
- Đảm bảo `translateY(-100%)` được apply

### Touch events không hoạt động
- Thêm `touch-action: manipulation`
- Kiểm tra `z-index` của wrapper

### Scroll bị lỗi
- Thêm `overflow: hidden` vào wrapper
- Sử dụng `-webkit-overflow-scrolling: touch`

### Notification không hiển thị
- Kiểm tra `z-index: 10000`
- Đảm bảo `showNotification={true}`

## Browser Support
- Chrome/Edge: ✅
- Firefox: ✅
- Safari iOS: ✅
- Chrome Android: ✅

## License
MIT
