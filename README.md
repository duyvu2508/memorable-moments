# Memorable Moments

Bản demo Expo/React Native tái hiện section "Khoảnh khắc đáng nhớ" theo hướng motion hiện đại, ưu tiên hiệu năng và accessibility.

## Giải pháp

- Dùng `Expo` để demo nhanh trên `Expo Go`, Android/iOS simulator.
- Tách section thành `MemorableSection`, `StoryCarousel`, `StoryCard`, `stories.ts`, `useReducedMotion.ts` và `useMemorableCarousel.ts` để phần UI, motion và state không dính vào nhau.
- Animation dùng `Animated` native driver với `transform` và `opacity`, tránh animate `top/left/width/height`.
- Motion chính gồm:
  - hover move cho card
  - overlay reveal và CTA xuất hiện mượt
  - parallax nhẹ giữa ảnh và caption khi swipe
  - keyboard focus rõ ràng và hành vi tap 2 lần trên touch
- Tối ưu code và performance:
  - hook `useMemorableCarousel` gom toàn bộ logic `activeIndex`, `scrollX`, layout theo viewport, snap handler và `scrollToOffset`
  - `StoryCard` được `memo` để giảm render lại không cần thiết
  - `Animated.event` dùng native driver cho parallax, không set state theo từng frame scroll
  - `FlatList` được cấu hình `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, `removeClippedSubviews`
  - kích thước card được tính theo viewport để giảm overdraw và fit màn hình tốt hơn
- Accessibility:
  - tôn trọng `prefers-reduced-motion`
  - `Pressable` có `accessibilityRole`, `accessibilityHint`, `selected state`
  - thứ tự focus theo thứ tự card trong carousel
  - touch lần 1 để active, lần 2 để điều hướng

## Cấu trúc thư mục

```text
memorable-moments/
├── App.tsx
├── src/
│   ├── components/
│   │   └── MemorableSection/
│   │       ├── index.tsx
│   │       ├── StoryCard.tsx
│   │       ├── StoryCarousel.tsx
│   │       └── styles.ts
│   ├── constants/
│   │   └── stories.ts
│   └── hooks/
│       ├── useMemorableCarousel.ts
│       └── useReducedMotion.ts
├── assets/
├── app.json
└── README.md
```

## Cài đặt và chạy

```bash
npm install
npm run start
```

Mở app bằng:

- `Expo Go` trên điện thoại
- `npm run android`
- `npm run ios`
- `npm run web`

## Build

APK Android voi EAS Build:

```bash
npx eas build -p android --profile preview
```

iOS build:

```bash
npx eas build -p ios --profile preview
```

Nếu muốn build local native:

```bash
npx expo prebuild
```

## Ghi chú asset

- Ảnh demo đang dùng URL từ `Unsplash` với tham số crop/quality để tải ảnh kích thước hợp lý cho card.
- Trong bài nộp thực tế, nên thay bằng asset nội bộ đã được nén `WebP` hoặc `AVIF` theo đúng guideline của team.

## Demo nhanh

- Bản repo này chạy trực tiếp bằng `Expo Go`.
- Chưa đính kèm APK/Expo Snack trong workspace local này, vì việc publish/build cần tài khoản và quy trình bên ngoài môi trường sandbox.
