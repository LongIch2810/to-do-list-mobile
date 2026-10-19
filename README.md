# Todo Mobile App 📱

> **Ứng dụng quản lý công việc cá nhân ngoại tuyến (Offline-First Personal Task Manager) xây dựng trên nền tảng React Native & Expo SDK 52.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.7-61DAFB.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo%20SDK-52.0-black.svg)](https://expo.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-Local%20Storage-003B57.svg)](https://docs.expo.dev/versions/latest/sdk/sqlite/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-success.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Tests](https://img.shields.io/badge/Tests-Passing%20(22%2F22)-brightgreen.svg)]()

---

## 📌 Tổng quan dự án

**Todo Mobile** được thiết kế hướng tới mục tiêu tối ưu hóa tốc độ ghi nhận công việc, hoạt động hoàn toàn độc lập với kết nối mạng (100% offline-first), bảo đảm tuyệt đối tính riêng tư cho người dùng (dữ liệu lưu trữ cục bộ trong thiết bị, không gửi nội dung task ra máy chủ ngoài).

Hệ thống giao diện tuân thủ chặt chẽ tài liệu thiết kế [DESIGN.md](DESIGN.md) với hệ thống **Design Tokens** chuẩn mực, tương thích chuẩn tiếp cận **WCAG 2.2 AA**, kích thước vùng chạm tối thiểu **48x48dp** và tốc độ phản hồi thao tác dưới **100ms**.

---

## ✨ Điểm nổi bật & Tính năng hiện tại

- ⚡ **Ghi việc siêu tốc:** Tạo task mới chỉ với một trường Title bắt buộc; các giá trị mặc định được tự động gán (`Pending`, `Medium`, `Inbox`).
- 🔒 **Offline-First & Bền vững:** Toàn bộ dữ liệu được quản lý qua SQLite; dữ liệu tồn tại vĩnh viễn qua các chu kỳ đóng/mở hoặc khởi động lại thiết bị.
- ⏱️ **Đo đạc hiệu năng chuẩn mực (PRD §10):** Thao tác tạo task hoàn tất trong **< 100ms** (ở tầng code/DB) và chỉ mất **3–4 giây** ở trải nghiệm người dùng thực tế (đáp ứng xuất sắc ngưỡng $\le$ 10 giây).
- 🛡️ **Bảo vệ dữ liệu & Ràng buộc:** Tự động cắt khoảng trắng thừa, giới hạn Title $\le$ 200 ký tự, Description $\le$ 5.000 ký tự; chống tạo task trùng lặp (double-submit) khi người dùng nhấn nút Lưu liên tục.
- 🎨 **Hệ thống Design Token (Facebook Design System):** Nền canvas chuẩn `#f0f2f5`, thẻ raised `#ffffff`, màu hành động chính `#1877F2`, phân cấp màu chữ và tương phản đạt chuẩn WCAG AA.
- 🧭 **Điều hướng 4 Tab:** `Today` (Hôm nay), `Upcoming` (Sắp tới), `Lists` (Danh sách), `Settings` (Cài đặt), tích hợp nút tạo nhanh Floating Action Button (FAB) nổi bật.

---

## 🏗️ Kiến trúc ứng dụng (Architecture)

Ứng dụng áp dụng mô hình **Feature-based MVVM (thông qua Custom Hooks) kết hợp Repository Pattern**:

```text
View (Screen / JSX) ──(User Event)──> ViewModel (Custom Hook) ──(Action)──> Repository ──(SQL)──> SQLite
      ▲                                       │                                                      │
      └──────────(Render State)───────────────┴─────────────────(Reactive Observer)──────────────────┘
```

### Cấu trúc thư mục mã nguồn

```text
to-do-list-mobile-app/
├── src/
│   ├── app/                      # Cấu hình gốc ứng dụng, Provider, Navigation
│   │   ├── navigation/           # RootNavigator, TabNavigator, types
│   │   └── providers/            # DatabaseContext & Provider
│   ├── core/                     # Hạ tầng dùng chung (Themes, UI Components, Utils)
│   │   ├── components/           # ScreenWrapper, FloatingActionButton
│   │   ├── theme/                # Design tokens (Colors, Spacing, Typography, Shadows, Metrics)
│   │   └── utils/                # UUID generator, helpers
│   ├── data/                     # Tầng lưu trữ dữ liệu & SQLite
│   │   ├── local/                # Schema SQL, DAO (TaskDao, TaskListDao), Database Connection
│   │   └── repositories/         # TaskRepository, TaskListRepository (Observable)
│   ├── domain/                   # Tầng nghiệp vụ thuần túy (Pure TypeScript)
│   │   ├── models/               # Interface Task, TaskList, Priority, Status
│   │   └── rules/                # Business validation invariants (Title, Description, Dates)
│   └── features/                 # Kiến trúc module theo chức năng (Feature-based)
│       ├── today/                # Màn hình TodayScreen, useTodayViewModel
│       ├── tasks/                # TaskCard, TaskFormModal, useTaskFormViewModel
│       ├── upcoming/             # Màn hình UpcomingScreen
│       ├── lists/                # Màn hình ListsScreen
│       └── settings/             # Màn hình SettingsScreen
├── __tests__/                    # Bộ kiểm thử Unit, Integration và E2E Demo
│   ├── components/               # Kiểm thử TaskFormModal, TaskCard
│   ├── core/                     # Kiểm thử Design Tokens & ScreenWrapper
│   ├── data/                     # Kiểm thử SQLite schema, TaskRepository
│   ├── demo/                     # Kiểm thử E2E Sprint 01 Demo & Benchmark
│   ├── hooks/                    # Kiểm thử useTaskFormViewModel
│   └── navigation/               # Kiểm thử TabNavigation & FAB
├── docs/                         # Toàn bộ tài liệu yêu cầu, kiến trúc & quy tắc
│   ├── PRD.md                    # Product Requirements Document
│   ├── ARCHITECTURE.md           # Kiến trúc kỹ thuật chi tiết
│   ├── PRODUCT-BACKLOG.md        # Product Backlog & phản hồi người dùng
│   ├── TECH-STACK.md             # Danh mục thư viện & công nghệ
│   └── rules/                    # Quy chuẩn clean code, solid, naming, security, database
└── sprints/                      # Sprint backlog (SPRINT_01 đến SPRINT_06)
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### Yêu cầu môi trường

- **Node.js:** phiên bản `18.x` hoặc `20.x` LTS trở lên
- **npm:** phiên bản `9.x` hoặc `10.x`
- **Thiết bị / Trình giả lập:**
  - Android Studio (Android Emulator) hoặc thiết bị thật qua Expo Go / Dev Build
  - Xcode (iOS Simulator trên macOS) hoặc thiết bị iPhone qua Expo Go

### 1. Cài đặt dependencies

```bash
git clone https://github.com/LongIch2810/to-do-list-mobile.git
cd to-do-list-mobile
npm install
```

### 2. Khởi chạy dev server (Expo)

```bash
npm start
# hoặc
npx expo start
```

Sau khi server khởi chạy:
- Nhấn phím `a` để mở trên Android Emulator.
- Nhấn phím `i` để mở trên iOS Simulator.
- Quét mã QR bằng ứng dụng **Expo Go** trên điện thoại thật để trải nghiệm.

---

## 🧪 Kiểm thử & Xác minh chất lượng (Testing)

Dự án áp dụng quy trình kiểm thử nghiêm ngặt với 100% test coverage cho các luồng nghiệp vụ cốt lõi:

```bash
# Chạy toàn bộ test suites (7 test suites, 22 tests)
npm test

# Chạy riêng bộ kiểm thử E2E Demo và Benchmark thời gian
npm test -- sprint01Demo

# Kiểm tra tĩnh kiểu dữ liệu (TypeScript typecheck)
npm run typecheck
```

---

## 📈 Lộ trình phát triển (Sprints Roadmap)

| Sprint | Mục tiêu chính | Trạng thái |
| :---: | :--- | :---: |
| **Sprint 01** | **Ghi việc nhanh:** Khởi tạo Expo SDK 52, điều hướng 4 tab, SQLite cơ bản, form tạo task nhanh, đo benchmark < 10s. | ✅ **Hoàn thành** |
| **Sprint 02** | **Quản lý danh sách & CRUD offline:** Xem chi tiết, sửa Title/Description/Due Date, hoàn thành/mở lại task, xóa an toàn, quản lý List. | 🔄 Sắp tới |
| **Sprint 03** | **Today, Upcoming & Lọc việc:** Sắp xếp theo hạn chót/priority, lọc theo list/trạng thái, phân loại Overdue. | 📋 Kế hoạch |
| **Sprint 04** | **Tìm kiếm & Tinh gọn:** Tìm kiếm text tức thì không dấu/hoa thường, dọn dẹp task hoàn thành. | 📋 Kế hoạch |
| **Sprint 05** | **Nhắc việc cục bộ (Local Reminder):** Thiết lập thông báo cục bộ với `expo-notifications`, cấp quyền an toàn. | 📋 Kế hoạch |
| **Sprint 06** | **Ổn định & Chốt phát hành MVP:** Xử lý case biên, kiểm thử thiết bị thật đa nền tảng, xuất bản MVP. | 📋 Kế hoạch |

---

## 📚 Tài liệu tham khảo

- [Yêu cầu sản phẩm (PRD)](docs/PRD.md)
- [Kiến trúc hệ thống (Architecture)](docs/ARCHITECTURE.md)
- [Product Backlog & Tiêu chí nghiệm thu](docs/PRODUCT-BACKLOG.md)
- [Quy chuẩn thiết kế giao diện (Design System Tokens)](DESIGN.md)
- [Kế hoạch chi tiết Sprint 01](sprints/SPRINT_01.md)
- [Quy tắc Clean Code](docs/rules/clean-code.md) · [SOLID](docs/rules/solid.md) · [Database Rules](docs/rules/database.md)

---

## 📄 Bản quyền & Giấy phép

Dự án được phát triển dưới bản quyền nội bộ phục vụ sản phẩm **Todo Mobile**. Mọi quyền được bảo lưu.
