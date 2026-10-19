<!-- vdl-json
{
  "plan_id": "PLAN-PB01",
  "spec": {
    "context_and_goal": "Người dùng mở app trên Android/iOS, có nền tảng điều hướng cơ bản gồm 4 tab (Today, Upcoming, Lists, Settings) và nút tạo nhanh FAB trên các màn hình quản lý task chính. Giao diện tuân thủ safe area, bàn phím ảo, vùng chạm tối thiểu >= 48dp, cỡ chữ hệ thống và nhãn hỗ trợ tiếp cận.",
    "current_behavior": "Repository chưa có source code, package.json hay cấu hình native.",
    "desired_outcome": "Ứng dụng React Native (Expo SDK 52) khởi động mượt mà, hiển thị thanh điều hướng 4 tab, có nút tạo nhanh (+) mở TaskFormModal placeholder, hỗ trợ đầy đủ safe area và accessibility theo thiết kế.",
    "scope_included": [
      "Khởi tạo project Expo SDK 52 với TypeScript và New Architecture",
      "Cấu hình Custom Theme tokens (colors, typography, spacing, minTouchTarget >= 48dp)",
      "ScreenWrapper xử lý SafeAreaView và nền theme chung",
      "React Navigation v7: Bottom Tab Navigator (Today, Upcoming, Lists, Settings) và Native Stack (RootNavigator bọc MainTabs và TaskFormModal)",
      "Floating Action Button (FAB) (+) trên Today, Upcoming, Lists với touch target >= 48x48dp và accessibilityLabel 'Tạo task mới'",
      "Màn hình TaskFormModal placeholder kích hoạt từ FAB chuẩn bị cho PB-03",
      "Unit & Component test suite với Jest và React Native Testing Library"
    ],
    "scope_excluded": [
      "Lưu trữ dữ liệu SQLite cục bộ (thuộc PB-02)",
      "Form nhập liệu tạo task hoàn chỉnh (thuộc PB-03)",
      "Local notifications / reminder (thuộc PB-13)"
    ],
    "affected_interfaces": "Giao diện chính trên thiết bị di động (Android / iOS) và hệ thống điều hướng",
    "required_behavior": "Ứng dụng hiển thị 4 tab điều hướng ở thanh dưới cùng. Chuyển tab mượt mà. Tab Today, Upcoming, Lists có nút FAB (+) cố định góc dưới bên phải. Tab Settings không có FAB. Nhấn FAB mở modal placeholder. Các thành phần có nhãn tiếp cận và vùng chạm tối thiểu 48dp.",
    "constraints_and_dependencies": {
      "min_android_version": "Android 7.0+ (API 24+)",
      "min_ios_version": "iOS 15.1+",
      "design_direction": "Custom Design System trung tính (Clean, Modern Minimalist)",
      "dependencies": "Expo SDK 52, React Navigation v7, TypeScript"
    },
    "assumptions": "Môi trường Node.js và npm có sẵn trên máy để cài đặt dependencies và chạy test."
  },
  "acceptance_criteria": [
    "Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.",
    "Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.",
    "Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.",
    "Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label \"Tạo task mới\".",
    "Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.",
    "Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens."
  ],
  "status": "completed",
  "human_approval": {
    "record": "duyệt",
    "time": "2026-10-19T17:33:40.584622+00:00"
  }
}
-->

# Specs: PLAN-PB01

**Status:** completed

## Spec

### Context And Goal

Người dùng mở app trên Android/iOS, có nền tảng điều hướng cơ bản gồm 4 tab (Today, Upcoming, Lists, Settings) và nút tạo nhanh FAB trên các màn hình quản lý task chính. Giao diện tuân thủ safe area, bàn phím ảo, vùng chạm tối thiểu >= 48dp, cỡ chữ hệ thống và nhãn hỗ trợ tiếp cận.

### Current Behavior

Repository chưa có source code, package.json hay cấu hình native.

### Desired Outcome

Ứng dụng React Native (Expo SDK 52) khởi động mượt mà, hiển thị thanh điều hướng 4 tab, có nút tạo nhanh (+) mở TaskFormModal placeholder, hỗ trợ đầy đủ safe area và accessibility theo thiết kế.

### Scope Included

- Khởi tạo project Expo SDK 52 với TypeScript và New Architecture
- Cấu hình Custom Theme tokens (colors, typography, spacing, minTouchTarget >= 48dp)
- ScreenWrapper xử lý SafeAreaView và nền theme chung
- React Navigation v7: Bottom Tab Navigator (Today, Upcoming, Lists, Settings) và Native Stack (RootNavigator bọc MainTabs và TaskFormModal)
- Floating Action Button (FAB) (+) trên Today, Upcoming, Lists với touch target >= 48x48dp và accessibilityLabel 'Tạo task mới'
- Màn hình TaskFormModal placeholder kích hoạt từ FAB chuẩn bị cho PB-03
- Unit & Component test suite với Jest và React Native Testing Library

### Scope Excluded

- Lưu trữ dữ liệu SQLite cục bộ (thuộc PB-02)
- Form nhập liệu tạo task hoàn chỉnh (thuộc PB-03)
- Local notifications / reminder (thuộc PB-13)

### Affected Interfaces

Giao diện chính trên thiết bị di động (Android / iOS) và hệ thống điều hướng

### Required Behavior

Ứng dụng hiển thị 4 tab điều hướng ở thanh dưới cùng. Chuyển tab mượt mà. Tab Today, Upcoming, Lists có nút FAB (+) cố định góc dưới bên phải. Tab Settings không có FAB. Nhấn FAB mở modal placeholder. Các thành phần có nhãn tiếp cận và vùng chạm tối thiểu 48dp.

### Constraints And Dependencies

{'min_android_version': 'Android 7.0+ (API 24+)', 'min_ios_version': 'iOS 15.1+', 'design_direction': 'Custom Design System trung tính (Clean, Modern Minimalist)', 'dependencies': 'Expo SDK 52, React Navigation v7, TypeScript'}

### Assumptions

Môi trường Node.js và npm có sẵn trên máy để cài đặt dependencies và chạy test.

## Acceptance criteria

- Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.
- Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.
- Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.
- Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label "Tạo task mới".
- Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.
- Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens.
