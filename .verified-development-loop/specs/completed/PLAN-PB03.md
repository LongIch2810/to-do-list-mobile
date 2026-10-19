<!-- vdl-json
{
  "plan_id": "PLAN-PB03",
  "spec": {
    "context_and_goal": "Người dùng có thể tạo một task mới nhanh chóng chỉ với Title. Task mới được gán mặc định: Status=Pending, Priority=Medium, List=Inbox. Ngăn chặn tạo task trùng lặp khi người dùng nhấn nút Save liên tiếp. Báo lỗi rõ ràng khi Title rỗng hoặc vượt quá 200 ký tự, Description vượt quá 5.000 ký tự. Task mới xuất hiện ngay trên màn hình chính sau khi lưu thành công.",
    "current_behavior": "Ở PB-01 và PB-02, hệ thống đã có khung điều hướng 4 tab, nút FAB (+), TaskFormModal placeholder và Data layer SQLite (TaskRepository, TaskListRepository). Chưa có form nhập liệu thực tế và chưa có kết nối giữa UI và database.",
    "desired_outcome": "Nhấn nút FAB (+) mở form tạo task với input Tiêu đề (bắt buộc) và Mô tả (tùy chọn). Khi nhập tiêu đề hợp lệ và nhấn Lưu, task được ghi bền vững vào SQLite với giá trị mặc định (Pending, Medium, Inbox), modal tự động đóng và màn hình TodayScreen hiển thị task mới ngay lập tức. Nút Lưu được bảo vệ chống double-submit và hiển thị thông báo lỗi nếu dữ liệu không hợp lệ.",
    "scope_included": [
      "Custom Hook useTaskFormViewModel quản lý state form, validation và gọi TaskRepository",
      "Giao diện TaskFormModal gồm TextInput Tiêu đề, TextInput Mô tả, nút Lưu và nút Hủy/Đóng",
      "Cơ chế chống double-submit (disable nút Lưu khi isSaving=true)",
      "Hiển thị thông điệp lỗi validation ngay trên form",
      "Component TaskCard hiển thị tiêu đề, trạng thái và priority badge",
      "Hook useTodayViewModel tải và quản lý danh sách task cho TodayScreen",
      "TodayScreen hiển thị danh sách task từ SQLite và cập nhật tức thì sau khi thêm task mới"
    ],
    "scope_excluded": [
      "Xem và chỉnh sửa chi tiết task sau khi tạo (thuộc PB-04)",
      "Đánh dấu hoàn thành / mở lại task (thuộc PB-05)",
      "Đặt thông báo nhắc việc Reminder (thuộc PB-13)"
    ],
    "affected_interfaces": "features/tasks (TaskFormModal, useTaskFormViewModel, TaskCard) và features/today (TodayScreen, useTodayViewModel)",
    "required_behavior": "Người dùng chạm FAB (+) trên TodayScreen mở TaskFormModal. Nếu nhấn Lưu khi chưa nhập Title, hiển thị lỗi 'Tiêu đề không được để trống.'. Khi nhập Title từ 1-200 ký tự và nhấn Lưu, nút Lưu chuyển sang trạng thái đang lưu (disable), task được lưu vào SQLite. Modal đóng lại, TodayScreen hiển thị task vừa tạo.",
    "constraints_and_dependencies": {
      "defaults": "Status: Pending, Priority: Medium, List: Inbox",
      "max_lengths": "Title <= 200 chars, Description <= 5000 chars",
      "offline_storage": "SQLite thông qua TaskRepository"
    },
    "assumptions": "SQLite database đã được khởi tạo và sẵn sàng qua TaskRepository từ PB-02."
  },
  "acceptance_criteria": [
    "Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.",
    "Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.",
    "Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.",
    "Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.",
    "Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.",
    "Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator."
  ],
  "status": "completed",
  "human_approval": {
    "record": "duyệt",
    "time": "2026-10-19T18:05:51.186090+00:00"
  }
}
-->

# Specs: PLAN-PB03

**Status:** completed

## Spec

### Context And Goal

Người dùng có thể tạo một task mới nhanh chóng chỉ với Title. Task mới được gán mặc định: Status=Pending, Priority=Medium, List=Inbox. Ngăn chặn tạo task trùng lặp khi người dùng nhấn nút Save liên tiếp. Báo lỗi rõ ràng khi Title rỗng hoặc vượt quá 200 ký tự, Description vượt quá 5.000 ký tự. Task mới xuất hiện ngay trên màn hình chính sau khi lưu thành công.

### Current Behavior

Ở PB-01 và PB-02, hệ thống đã có khung điều hướng 4 tab, nút FAB (+), TaskFormModal placeholder và Data layer SQLite (TaskRepository, TaskListRepository). Chưa có form nhập liệu thực tế và chưa có kết nối giữa UI và database.

### Desired Outcome

Nhấn nút FAB (+) mở form tạo task với input Tiêu đề (bắt buộc) và Mô tả (tùy chọn). Khi nhập tiêu đề hợp lệ và nhấn Lưu, task được ghi bền vững vào SQLite với giá trị mặc định (Pending, Medium, Inbox), modal tự động đóng và màn hình TodayScreen hiển thị task mới ngay lập tức. Nút Lưu được bảo vệ chống double-submit và hiển thị thông báo lỗi nếu dữ liệu không hợp lệ.

### Scope Included

- Custom Hook useTaskFormViewModel quản lý state form, validation và gọi TaskRepository
- Giao diện TaskFormModal gồm TextInput Tiêu đề, TextInput Mô tả, nút Lưu và nút Hủy/Đóng
- Cơ chế chống double-submit (disable nút Lưu khi isSaving=true)
- Hiển thị thông điệp lỗi validation ngay trên form
- Component TaskCard hiển thị tiêu đề, trạng thái và priority badge
- Hook useTodayViewModel tải và quản lý danh sách task cho TodayScreen
- TodayScreen hiển thị danh sách task từ SQLite và cập nhật tức thì sau khi thêm task mới

### Scope Excluded

- Xem và chỉnh sửa chi tiết task sau khi tạo (thuộc PB-04)
- Đánh dấu hoàn thành / mở lại task (thuộc PB-05)
- Đặt thông báo nhắc việc Reminder (thuộc PB-13)

### Affected Interfaces

features/tasks (TaskFormModal, useTaskFormViewModel, TaskCard) và features/today (TodayScreen, useTodayViewModel)

### Required Behavior

Người dùng chạm FAB (+) trên TodayScreen mở TaskFormModal. Nếu nhấn Lưu khi chưa nhập Title, hiển thị lỗi 'Tiêu đề không được để trống.'. Khi nhập Title từ 1-200 ký tự và nhấn Lưu, nút Lưu chuyển sang trạng thái đang lưu (disable), task được lưu vào SQLite. Modal đóng lại, TodayScreen hiển thị task vừa tạo.

### Constraints And Dependencies

{'defaults': 'Status: Pending, Priority: Medium, List: Inbox', 'max_lengths': 'Title <= 200 chars, Description <= 5000 chars', 'offline_storage': 'SQLite thông qua TaskRepository'}

### Assumptions

SQLite database đã được khởi tạo và sẵn sàng qua TaskRepository từ PB-02.

## Acceptance criteria

- Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.
- Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.
- Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.
- Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.
- Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.
- Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator.
