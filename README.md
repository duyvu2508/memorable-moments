# Memorable Moments

Ứng dụng Expo/React Native dựng lại section "Khoảnh khắc đáng nhớ" với carousel ngang, motion nhẹ và hỗ trợ OTA qua EAS Update.

## Tech stack

- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript
- `expo-updates` cho OTA

## Giải pháp đã chọn

Project được triển khai bằng Expo + React Native và `Animated` native API.

Lý do lựa chọn:

- Expo giúp chạy thử nhanh trên thiết bị, simulator và thuận tiện cho luồng build `preview` / `production`
- `Animated` với `useNativeDriver` phù hợp với yêu cầu motion mượt, hạn chế jank và tránh block main thread
- section được tách thành `MemorableSection`, `StoryCarousel`, `StoryCard` và các hook riêng để dễ kiểm soát state, hiệu ứng và responsive behavior
- carousel được thiết kế theo hướng snap theo card, có hover/focus state, parallax nhẹ, overlay reveal và reduced motion để cân bằng giữa cảm giác hiện đại và accessibility

## Cấu trúc chính

```text
memorable-moments/
├── App.tsx
├── app.json
├── eas.json
├── src/
│   ├── components/
│   │   └── MemorableSection/
│   │       ├── index.tsx
│   │       ├── StoryCarousel.tsx
│   │       ├── StoryCard.tsx
│   │       └── styles.ts
│   ├── constants/
│   │   └── stories.ts
│   └── hooks/
│       ├── useMemorableCarousel.ts
│       └── useReducedMotion.ts
└── assets/
```

## Chạy local

```bash
npm install
npm run start
```

Shortcut có sẵn:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
```

## EAS build profiles

Repo hiện có 3 profile trong [eas.json](/Users/vuminhduy/memorable-moments/eas.json:1):

- `preview`: internal distribution, channel `preview`
- `ios-simulator`: internal distribution cho iOS Simulator, channel `preview`
- `production`: production build, channel `production`

Lệnh thường dùng:

```bash
npx eas build -p android --profile preview
npx eas build -p ios --profile preview
npx eas build -p ios --profile ios-simulator
npx eas build -p android --profile production
npx eas build -p ios --profile production
```

## OTA update

App đã cấu hình OTA trong [app.json](/Users/vuminhduy/memorable-moments/app.json:1):

- `updates.url` đã trỏ tới EAS project
- `runtimeVersion.policy = appVersion`

Publish OTA theo đúng channel của binary đang cài:

```bash
npx eas update --channel preview --message "fix memorable section"
npx eas update --channel production --message "hotfix production"
```

Lưu ý:

- `preview` build chỉ nhận update từ channel `preview`
- `production` build chỉ nhận update từ channel `production`
- vì đang dùng `runtimeVersion` theo `appVersion`, các OTA chỉ áp dụng cho binary có cùng version `1.0.0`
- thay đổi native hoặc đổi config cần build mới, không chỉ OTA

Để kiểm tra OTA trên thiết bị:

1. Publish update.
2. Tắt hẳn app.
3. Mở lại lần 1 để app tải update.
4. Tắt hẳn app lần nữa.
5. Mở lại lần 2 để thấy bản mới.

## Internal distribution trên iOS

`preview` trên iOS đang là internal distribution kiểu ad hoc. Điều đó có nghĩa là:

- không phải iPhone nào quét QR cũng cài được ngay
- thiết bị cần được đăng ký UDID trước
- sau khi thêm thiết bị mới, cần build lại hoặc re-sign build

Luồng thêm iPhone mới:

```bash
npx eas device:create
```

Sau khi đăng ký thiết bị:

```bash
npx eas build -p ios --profile preview
```

hoặc dùng:

```bash
npx eas build:resign
```

Lưu ý thêm:

- iOS 16+ cần bật Developer Mode để chạy internal build
- giới hạn ad hoc phụ thuộc Apple Developer provisioning

## Kiến trúc UI

- `MemorableSection`: section tổng, header và animation vào màn
- `StoryCarousel`: danh sách ngang, snap logic, active index
- `StoryCard`: card nội dung, overlay, CTA, motion
- `useMemorableCarousel`: tính kích thước card, snap interval, scroll state
- `useReducedMotion`: tôn trọng reduced motion của hệ điều hành

## Motion và hiệu năng

- dùng `Animated` với `useNativeDriver`
- `FlatList` có `getItemLayout`, `windowSize`, `initialNumToRender`
- `StoryCard` được `memo`
- animation ưu tiên `transform` và `opacity`
- carousel hiện snap theo kích thước card thay vì full page để tránh khoảng trắng khi vuốt

## Ghi chú phát triển

- ảnh story hiện lấy từ remote URL trong `stories.ts`
- nếu thay dependencies native, sửa config Expo, đổi icon/splash, hoặc nâng SDK thì cần build binary mới
- nếu chỉ sửa UI, text, style, logic JS/TS hoặc asset JS bundle dùng được OTA

## Kiểm tra type

```bash
npx tsc --noEmit
```
