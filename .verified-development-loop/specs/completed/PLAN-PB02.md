<!-- vdl-json
{
  "plan_id": "PLAN-PB02",
  "spec": {
    "context_and_goal": "Người dùng cần mô hình Task/List và hệ thống lưu trữ SQLite cục bộ bền vững trên thiết bị, hoạt động hoàn toàn offline. Có danh mục Inbox mặc định không thể xóa. Mọi Task phải thuộc một List hợp lệ (ràng buộc khóa ngoại). Dữ liệu được bảo toàn khi đóng/mở app và đảm bảo tính nhất quán (ACID transaction) khi xảy ra lỗi gián đoạn.",
    "current_behavior": "Ứng dụng mới có khung điều hướng 4 tab và giao diện tĩnh ở PB-01; chưa có schema cơ sở dữ liệu SQLite, chưa có domain models Task/List và chưa có repositories.",
    "desired_outcome": "Cơ sở dữ liệu SQLite khởi tạo tự động khi mở app, tạo bảng task_lists và tasks với khóa ngoại và index; tự động seed Inbox mặc định ('Hộp thư đến', id cố định '00000000-0000-0000-0000-000000000001'); cung cấp TaskRepository và TaskListRepository thực thi CRUD an toàn, transaction rollback và ràng buộc toàn vẹn.",
    "scope_included": [
      "TypeScript interfaces cho Task, TaskList, CreateTaskInput, CreateTaskListInput",
      "Hàm kiểm tra domain rules và invariants (validateTaskTitle, validateDueDateTime, validateTaskList)",
      "SQLite DDL schema cho task_lists và tasks kèm CHECK constraints, foreign keys và indexes theo ARCHITECTURE.md §6",
      "Migration runner theo dõi schema version qua PRAGMA user_version và seed Inbox mặc định với UUID cố định",
      "TaskDao và TaskListDao thực thi câu lệnh SQL với parameter binding an toàn",
      "TaskRepository và TaskListRepository quản lý CRUD, transaction, và chống xóa Inbox mặc định",
      "Unit & Integration test suite kiểm thử schema, seed Inbox, foreign keys, rollback transaction và persistence"
    ],
    "scope_excluded": [
      "Giao diện form nhập liệu tạo task nhanh (thuộc PB-03)",
      "Giao diện xem và sửa chi tiết task (thuộc PB-04)",
      "Đồng bộ local reminder với hệ điều hành (thuộc PB-13)"
    ],
    "affected_interfaces": "Data Layer (src/data/local/*, src/data/repositories/*) và Domain Layer (src/domain/models/*, src/domain/rules/*)",
    "required_behavior": "Khi khởi tạo database, mở SQLite với PRAGMA foreign_keys = ON. Tự động chạy migration tạo 2 bảng task_lists và tasks nếu chưa có. Nếu chưa có Inbox, tự động tạo Inbox có id='00000000-0000-0000-0000-000000000001', name='Hộp thư đến', is_default=1. Cấm xóa hoặc đổi cờ is_default của Inbox. Thêm Task phải trỏ tới list_id tồn tại; thêm task với list_id sai phải bị từ chối. Thao tác ghi nhiều bước trong transaction phải rollback sạch khi có lỗi. Đóng và mở lại database dữ liệu vẫn còn nguyên vẹn.",
    "constraints_and_dependencies": {
      "database": "SQLite cục bộ offline-first",
      "inbox_uuid": "00000000-0000-0000-0000-000000000001",
      "inbox_name": "Hộp thư đến",
      "dependencies": "expo-sqlite, expo-crypto / uuid"
    },
    "assumptions": "Môi trường test chạy in-memory SQLite database độc lập cho từng test suite để kiểm thử nhanh và không để lại dữ liệu rác."
  },
  "acceptance_criteria": [
    "Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON.",
    "Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1.",
    "Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected.",
    "Given a valid task input and an existing list, when createTask is called, then the task is persisted with valid UUID and timestamps.",
    "Given a task input referencing a non-existent list_id, when createTask is called, then the operation fails due to foreign key violation.",
    "Given persisted tasks in the database, when the database is closed and reopened, then all task and list records remain completely intact.",
    "Given an operation with multiple changes, when a failure occurs during execution, then the transaction is rolled back leaving no partial state."
  ],
  "status": "completed",
  "human_approval": {
    "record": "duyệt",
    "time": "2026-10-19T17:52:12.884321+00:00"
  }
}
-->

# Specs: PLAN-PB02

**Status:** completed

## Spec

### Context And Goal

Người dùng cần mô hình Task/List và hệ thống lưu trữ SQLite cục bộ bền vững trên thiết bị, hoạt động hoàn toàn offline. Có danh mục Inbox mặc định không thể xóa. Mọi Task phải thuộc một List hợp lệ (ràng buộc khóa ngoại). Dữ liệu được bảo toàn khi đóng/mở app và đảm bảo tính nhất quán (ACID transaction) khi xảy ra lỗi gián đoạn.

### Current Behavior

Ứng dụng mới có khung điều hướng 4 tab và giao diện tĩnh ở PB-01; chưa có schema cơ sở dữ liệu SQLite, chưa có domain models Task/List và chưa có repositories.

### Desired Outcome

Cơ sở dữ liệu SQLite khởi tạo tự động khi mở app, tạo bảng task_lists và tasks với khóa ngoại và index; tự động seed Inbox mặc định ('Hộp thư đến', id cố định '00000000-0000-0000-0000-000000000001'); cung cấp TaskRepository và TaskListRepository thực thi CRUD an toàn, transaction rollback và ràng buộc toàn vẹn.

### Scope Included

- TypeScript interfaces cho Task, TaskList, CreateTaskInput, CreateTaskListInput
- Hàm kiểm tra domain rules và invariants (validateTaskTitle, validateDueDateTime, validateTaskList)
- SQLite DDL schema cho task_lists và tasks kèm CHECK constraints, foreign keys và indexes theo ARCHITECTURE.md §6
- Migration runner theo dõi schema version qua PRAGMA user_version và seed Inbox mặc định với UUID cố định
- TaskDao và TaskListDao thực thi câu lệnh SQL với parameter binding an toàn
- TaskRepository và TaskListRepository quản lý CRUD, transaction, và chống xóa Inbox mặc định
- Unit & Integration test suite kiểm thử schema, seed Inbox, foreign keys, rollback transaction và persistence

### Scope Excluded

- Giao diện form nhập liệu tạo task nhanh (thuộc PB-03)
- Giao diện xem và sửa chi tiết task (thuộc PB-04)
- Đồng bộ local reminder với hệ điều hành (thuộc PB-13)

### Affected Interfaces

Data Layer (src/data/local/*, src/data/repositories/*) và Domain Layer (src/domain/models/*, src/domain/rules/*)

### Required Behavior

Khi khởi tạo database, mở SQLite với PRAGMA foreign_keys = ON. Tự động chạy migration tạo 2 bảng task_lists và tasks nếu chưa có. Nếu chưa có Inbox, tự động tạo Inbox có id='00000000-0000-0000-0000-000000000001', name='Hộp thư đến', is_default=1. Cấm xóa hoặc đổi cờ is_default của Inbox. Thêm Task phải trỏ tới list_id tồn tại; thêm task với list_id sai phải bị từ chối. Thao tác ghi nhiều bước trong transaction phải rollback sạch khi có lỗi. Đóng và mở lại database dữ liệu vẫn còn nguyên vẹn.

### Constraints And Dependencies

{'database': 'SQLite cục bộ offline-first', 'inbox_uuid': '00000000-0000-0000-0000-000000000001', 'inbox_name': 'Hộp thư đến', 'dependencies': 'expo-sqlite, expo-crypto / uuid'}

### Assumptions

Môi trường test chạy in-memory SQLite database độc lập cho từng test suite để kiểm thử nhanh và không để lại dữ liệu rác.

## Acceptance criteria

- Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON.
- Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1.
- Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected.
- Given a valid task input and an existing list, when createTask is called, then the task is persisted with valid UUID and timestamps.
- Given a task input referencing a non-existent list_id, when createTask is called, then the operation fails due to foreign key violation.
- Given persisted tasks in the database, when the database is closed and reopened, then all task and list records remain completely intact.
- Given an operation with multiple changes, when a failure occurs during execution, then the transaction is rolled back leaving no partial state.
