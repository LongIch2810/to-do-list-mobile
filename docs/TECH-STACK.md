# Tech Stack — Todo Mobile MVP (React Native)

**Trạng thái:** Đề xuất cho React Native, chưa cài đặt. Khảo sát repository ngày 19/10/2026: chưa có `package.json`, `node_modules`, lockfile hoặc source code. [ARCHITECTURE.md](ARCHITECTURE.md) là nguồn cho ranh giới layer; [PRD](PRD.md) là nguồn cho phạm vi sản phẩm. Các version được nêu dưới đây là **snapshot khuyến nghị ổn định từ npm registry**, cần kiểm tra tương thích khi khởi tạo dự án.

---

## 1. Technology Overview

| Category | Technology | Purpose | Trạng thái |
| --- | --- | --- | --- |
| **Language** | TypeScript (~5.3+) | Type safety cho toàn bộ app, models và query types | Đề xuất |
| **Framework** | React Native (Expo SDK 52+ / RN 0.76+) | Cross-platform Android & iOS với New Architecture | Đề xuất |
| **Architecture** | Feature-based MVVM (qua Custom Hooks) + Repository Pattern | Tách bạch View (JSX), ViewModel (Hooks) và Data persistence | Quyết định thiết kế |
| **State Management** | Custom Hooks + Zustand | Quản lý UI state, form state và global session/filter state | Đề xuất |
| **Database** | SQLite | Local persistence offline-first, hỗ trợ transactions & FK | Đề xuất |
| **SQLite Driver** | `expo-sqlite` (New API) | Mở DB native, type-safe queries, migration và transaction | Đề xuất |
| **Navigation** | React Navigation v7 (`@react-navigation/*`) | Điều hướng Bottom Tabs và Native Stack | Đề xuất |
| **Notifications** | `expo-notifications` | Local reminder một lần, channels trên Android và iOS permissions | Đề xuất |
| **Safe Area & UI** | `react-native-safe-area-context` + Vanilla `StyleSheet` | Đảm bảo hiển thị chuẩn notch, status bar, gesture nav | Đề xuất |
| **Testing** | Jest + `@testing-library/react-native` | Unit test (domain, repository, hooks) và Component test | Đề xuất |

> [!NOTE]
> Không có backend, REST API, authentication hoặc cloud sync trong MVP. Mọi dữ liệu task thuộc về SQLite cục bộ trên thiết bị, không gửi ra ngoài mạng và không dùng key-value preferences (AsyncStorage) để lưu danh sách task.

---

## 2. Technology Selection Rationale

| Công nghệ | Vai trò / Layer | Lý do lựa chọn | Giới hạn / Trade-off |
| --- | --- | --- | --- |
| **TypeScript + React Native (Expo)** | Toàn bộ ứng dụng, app shell và native runner. | Một codebase TypeScript cho Android & iOS; Expo SDK 52 cung cấp New Architecture, tooling đồng bộ, cấu hình native tự động và hỗ trợ chạy trực tiếp trên Windows (Android dev/testing). | Native module ngoài Expo cần cấu hình plugin/prebuild; build iOS native production cần môi trường macOS/Xcode. |
| **MVVM qua Custom Hooks** | `features/*/screens`: View (JSX/Styling); `features/*/hooks`: ViewModel (UI state & orchestration). | Tự nhiên và chuẩn mực với React Native. View chỉ lo render; Custom Hook giữ form state, validation, loading/error và gọi Repository. Dễ test độc lập bằng `renderHook`. | Cần tuân thủ Rules of Hooks; tránh gom quá nhiều logic không liên quan vào một hook duy nhất. |
| **Zustand** | Quản lý App-level UI state (active tab, search filter, theme mode nếu có). | Cực kỳ nhẹ (~1KB), zero-boilerplate, không cần bọc Provider rườm rà, dễ reset và mock trong Jest. Không thay thế SQLite mà chỉ quản lý UI session state. | Không dùng Zustand để lưu bản sao dài hạn của danh sách Task (SQLite là single source of truth). |
| **SQLite + `expo-sqlite`** | `data/local`: lưu trữ Task, TaskList, FK, transactions và migrations. | Hỗ trợ quan hệ Task → List, ràng buộc `CHECK`, `FOREIGN KEY ON DELETE RESTRICT`, ACID transaction và truy vấn phân trang/lọc offline. `expo-sqlite` bản mới cung cấp sync/async API chuẩn. | Cần viết migration script và kiểm thử SQL cẩn thận; không có ORM code-gen phức tạp như Drift nên cần DAO rõ ràng. |
| **React Navigation v7** | `app/navigation`: Bottom Tabs (4 tabs) + Native Stack (Task Form, Detail, Search). | Thư viện điều hướng tiêu chuẩn của hệ sinh thái React Native, hỗ trợ sâu typed navigation params, giữ nguyên stack từng tab, xử lý deep link từ notification tap mượt mà. | Cần định nghĩa TypeScript param list chặt chẽ; tránh truyền toàn bộ object Task qua navigation params (chỉ truyền `taskId`). |
| **`expo-notifications`** | `data/notifications`: xin quyền, lên lịch reminder, hủy lịch và bắt sự kiện tap. | Plugin chuẩn Expo cho Android & iOS local notifications, tự động quản lý notification channels trên Android 8+, tích hợp tốt với lifecycle app. | Giới hạn pending notifications trên iOS (tối đa 64); Android 13+ cần cấp quyền runtime; không cam kết phát đúng từng giây tuyệt đối nếu thiết bị ở chế độ tiết kiệm pin (Doze mode). |
| **`uuid` / `expo-crypto`** | Cấp ID cho Task và TaskList. | Cấp UUID v4 độc lập với auto-increment của database, sẵn sàng cho mở rộng tương lai. | Thêm thư viện nhỏ; cần đảm bảo random byte generator hoạt động đúng trên môi trường React Native. |

---

## 3. Package Dependencies đề xuất

Chỉ cài đặt package khi sprint tương ứng cần đến. Không cài đặt trước các thư viện dự phòng.

| Nhóm | Package | Mục đích sử dụng | Thời điểm |
| --- | --- | --- | --- |
| **Runtime (Core)** | `expo` (~52.x), `react`, `react-native` | Core framework và runtime | Sprint 1 |
| **Runtime (Navigation)** | `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context` | Điều hướng 4 tab và màn hình chi tiết/modal | Sprint 1 |
| **Runtime (Data)** | `expo-sqlite` | Local SQLite database driver | Sprint 1 |
| **Runtime (State)** | `zustand` | Lightweight UI state (filter, session) | Sprint 1 |
| **Runtime (Utils)** | `expo-crypto` hoặc `uuid` | Sinh UUID v4 cho Task và List ID | Sprint 1 |
| **Runtime (Notification)** | `expo-notifications` | Local reminder và notification handler | Sprint 5 |
| **Development** | `typescript`, `@types/react`, `@types/react-native`, `eslint`, `prettier` | Type safety và code linting | Sprint 1 |
| **Testing** | `jest`, `jest-expo`, `@testing-library/react-native`, `@testing-library/jest-native` | Unit test và component integration test | Sprint 1 |

> [!WARNING]
> **Tuyệt đối không cài trong MVP:** Redux Toolkit, MobX, WatermelonDB, Realm, TypeORM, Prisma, Axios, Firebase, Supabase, Google Sign-In, Tailwind/NativeWind (trừ khi người dùng yêu cầu rõ), hoặc các package analytics/crashlytics khi chưa có yêu cầu.

---

## 4. Development Environment

| Môi trường | Yêu cầu |
| --- | --- |
| **Node.js** | Node.js LTS (v20.x hoặc v22.x) và package manager `npm` (hoặc `yarn`). |
| **Chung** | VS Code hoặc Cursor với extensions: TypeScript, ESLint, Prettier, React Native Tools. Expo CLI (đi kèm `npx expo`). |
| **Android** | Android Studio, Android SDK (API 34+ build-tools), thiết bị thật qua USB debugging hoặc Android Emulator. Hỗ trợ test và build APK debug tại chỗ trên Windows. |
| **iOS** | Yêu cầu máy macOS với Xcode và iOS Simulator cho native build/run iOS. Trên máy Windows, có thể phát triển và kiểm chứng phần lớn logic JS/TS qua Expo Go / Android, nhưng kiểm chứng native iOS cần máy macOS. |

**Chưa quyết định:** Minimum Android API level (đề xuất API 24+) và minimum iOS version (đề xuất iOS 15.1+); thiết kế cụ thể cho icon và splash screen. Sẽ chốt khi khởi tạo template Expo.

---

## 5. Coding Standards

- **TypeScript Standards:**
  - Bật `strict: true` trong `tsconfig.json`. Không sử dụng kiểu `any`; nullable type phải thể hiện rõ bằng `T | null` hoặc `T | undefined`.
  - Type/Interface dùng `PascalCase` (ví dụ: `Task`, `TaskList`, `TaskPriority`).
  - Biến và hàm dùng `camelCase` (ví dụ: `formatDueDate`, `createTask`).
  - Custom Hooks dùng tiền tố `use` theo chuẩn React (ví dụ: `useTodayViewModel`, `useTaskForm`).
  - Component files dùng `PascalCase.tsx` (ví dụ: `TodayScreen.tsx`, `TaskCard.tsx`); utility/service files dùng `camelCase.ts` (ví dụ: `taskRepository.ts`, `database.ts`).
- **React Native & UI Standards:**
  - Sử dụng Functional Components và React Hooks.
  - Tách UI rõ ràng: Component chỉ chứa JSX và gọi props/hook; logic tính toán, xử lý form và gọi repository thuộc về Custom Hook (ViewModel).
  - Sử dụng semantic tokens trong theme (`colors.background`, `colors.primary`, v.v.); không hard-code hex màu ngẫu nhiên trong từng component.
  - Đảm bảo tiếp cận (Accessibility): gán `accessible={true}`, `accessibilityLabel`, `accessibilityRole` và diện tích chạm tối thiểu 48x48dp trên Android / 44x44pt trên iOS.
  - Xử lý Safe Area và Keyboard: Dùng `SafeAreaView` từ `react-native-safe-area-context` và `KeyboardAvoidingView` khi có input form.
- **Data & Error Handling:**
  - Mọi thao tác ghi database là `async/await`. Phải `await` database commit thành công trước khi hiển thị kết quả hoặc lên lịch reminder.
  - Không bao giờ dùng `catch (e) {}` trống. Lỗi phải được phân loại và hiển thị thông điệp an toàn cho người dùng; không log Title/Description của Task ra console/log.
- **Import Rules:**
  - `features/*/screens` không import trực tiếp DAO, SQLite driver hay notification plugin.
  - Domain model không import React, React Native hoặc thư viện bên thứ ba.
  - Không tạo import vòng tròn (`circular dependencies`).

---

## 6. Tooling và Lệnh kiểm tra

Các lệnh chuẩn khi project React Native được khởi tạo:

```sh
# Khởi chạy dev server
npx expo start

# Chạy kiểm tra kiểu TypeScript
npx tsc --noEmit

# Chạy lint kiểm tra code quality
npm run lint

# Chạy toàn bộ unit test và integration test
npm test

# Chạy test có coverage
npm test -- --coverage

# Chạy ứng dụng trên Android (cần kết nối thiết bị hoặc emulator)
npx expo run:android

# Chạy ứng dụng trên iOS (chỉ trên macOS)
npx expo run:ios
```

---

## 7. Dependency Management

1. Chốt phiên bản Expo SDK và React Native trước khi bắt đầu Sprint 1.
2. Dùng `npx expo install <package>` cho các package thuộc hệ sinh thái Expo để đảm bảo tự động lấy version tương thích chuẩn với SDK đã chọn.
3. Commit cả `package.json` và `package-lock.json` vào git repository để toàn bộ môi trường và CI chạy cùng một dependency tree.
4. Khi nâng cấp dependency, phải kiểm tra changelog, chạy lại `npx tsc --noEmit` và `npm test` để xác minh không có breaking change.

---

## 8. Technical Constraints và Decisions

| Quyết định | Lý do / Lợi ích | Chi phí & Lưu ý |
| --- | --- | --- |
| **Offline-first SQLite là nguồn sự thật duy nhất** | Toàn bộ CRUD tức thì, không phụ thuộc kết nối mạng; dữ liệu có quan hệ chặt chẽ giữa Task và List. | Cần quản lý migration phiên bản và kiểm thử rollback khi lỗi transaction. |
| **Feature-based MVVM qua Custom Hooks** | Giữ component nhẹ, sạch sẽ; gom toàn bộ state nghiệp vụ vào hook, tái sử dụng và test dễ dàng với Jest. | Đòi hỏi phân chia trách nhiệm rõ: Screen không trực tiếp thực hiện query DB. |
| **React Navigation với 4 Tabs** | Giữ đúng yêu cầu PRD §6; mỗi tab bảo lưu stack riêng; hỗ trợ deep link từ reminder notification. | Cần cấu hình navigation param types chặt chẽ; xử lý trường hợp task ID không tồn tại. |
| **Local Notifications một lần** | Đáp ứng thông báo nhắc việc mà không cần máy chủ hay tài khoản. | Cần quản lý notification channels, xin quyền Android 13+/iOS và đồng bộ hủy lịch khi task Complete/Delete. |
| **`dueDate` là ngày địa phương (`YYYY-MM-DD`); timestamps là UTC epoch ms** | Tránh lỗi lệch ngày khi người dùng đổi múi giờ hoặc lưu giờ 00:00 UTC. | Hiển thị cần convert sang giờ địa phương; so sánh khoảng cách cần dùng ngày địa phương. |
| **Hard delete Task; chuyển task về Inbox khi xóa List** | Đúng yêu cầu PRD, không để lại dữ liệu rác hay foreign key mồ côi. | Xóa là vĩnh viễn trong MVP; cần hộp thoại xác nhận rõ ràng trước khi xóa. |
