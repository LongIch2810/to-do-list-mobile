# SOLID Rules — Todo Mobile (React Native / TypeScript)

Áp dụng SOLID để code dễ bảo trì, dễ mở rộng và dễ kiểm thử, **không** phải để sinh ra quá nhiều tầng trừu tượng không cần thiết. [PRD](../PRD.md) quyết định hành vi; [Architecture](../ARCHITECTURE.md) quyết định layer và ranh giới dependency; [Naming rules](naming.md) quyết định cách đặt tên; [Clean Code rules](clean-code.md) quyết định cấu trúc code rõ ràng.

## S — Single Responsibility Principle (Đơn trách nhiệm)

Một module/hàm/component chỉ có **một lý do duy nhất để thay đổi**:

- **Screen / Component (View):** `TaskDetailScreen` chỉ hiển thị giao diện, áp dụng theme, và bắt thao tác của người dùng; không tự viết SQL, không gọi trực tiếp database driver hay thư viện notification.
- **Custom Hook (ViewModel):** `useTaskDetailViewModel` quản lý UI state (loading, error, form state) và gọi Repository; không chứa mã JSX, không tự dựng chuỗi SQL.
- **Repository:** `TaskRepository` quản lý CRUD nghiệp vụ, điều phối transaction đa bảng và gọi `NotificationService`; không trực tiếp định dạng chuỗi ngày để render lên màn hình.
- **DAO:** `TaskDao` chỉ chịu trách nhiệm thực thi các câu lệnh SQL cụ thể trên SQLite connection.
- **NotificationService:** Chỉ bọc các native API của `expo-notifications`.
- **Validation:** Hàm validate Title hoặc Due Date nằm ở `domain/rules/`; được tái sử dụng cho cả tạo và sửa task, không sao chép lại ở hai màn hình khác nhau.

## O — Open/Closed Principle (Mở để mở rộng, Đóng để sửa đổi)

Cho phép mở rộng hành vi tại điểm mở rộng **đã có nhu cầu thực tế**, không sửa lan truyền qua nhiều feature:

- Today, Upcoming, Search và Completed đều truy xuất dữ liệu qua `TaskRepository`. Khi thay đổi cấu trúc bảng hoặc câu lệnh SQLite nội bộ, các Screen/Hook không phải viết lại logic lấy dữ liệu.
- `NotificationService` là adapter duy nhất tương tác với hệ điều hành. Nếu nâng cấp thư viện notification native, chỉ cần cập nhật bên trong `NotificationService` mà không ảnh hưởng tới các ViewModel hay Repository.
- Với các giá trị hữu hạn của MVP (`TaskStatus: 'PENDING' | 'COMPLETED'`), sử dụng `switch/case` rõ ràng thay vì cố gắng thiết kế Strategy pattern hay Plugin registry phức tạp.
- Tuyệt đối không thiết kế trước các hook hoặc service rỗng cho Cloud Sync, Auth hay Recurring tasks khi chưa có yêu cầu.

## L — Liskov Substitution Principle (Thay thế Liskov)

Nếu sử dụng Mock hoặc Fake implementation để test, phải đảm bảo tuân thủ đúng **contract quan sát được**:

- Trong unit test, fake repository phải trả về cùng cấu trúc dữ liệu, reject promise cùng loại lỗi có ý nghĩa như repository thật; không được âm thầm trả mảng rỗng giả khi có lỗi.
- Ưu tiên Composition của React Components và Custom Hooks; không dùng kế thừa (inheritance) Class chỉ để chia sẻ vài hàm tiện ích UI.

## I — Interface Segregation Principle (Phân tách Interface)

Consumer chỉ phụ thuộc vào những gì nó thực sự sử dụng:

- `useTodayViewModel` chỉ gọi các hàm lấy danh sách Today và `completeTask`; không nhận cả instance database SQLite hay notification service thô.
- Component chỉ nhận các props tối thiểu cần thiết để render (ví dụ: `TaskCard` chỉ nhận `task`, `onToggleComplete`, `onPress`); không truyền nguyên cả ViewModel vào component con.
- Tách Repository theo domain rõ ràng (`TaskRepository`, `TaskListRepository`), không gom tất cả vào một `MegaAppRepository` khổng lồ.

## D — Dependency Inversion Principle (Đảo ngược phụ thuộc)

Business logic và Presentation không phụ thuộc trực tiếp vào database driver cụ thể hay native plugins:

```text
Screen (View) ──> Custom Hook (ViewModel) ──> TaskRepository ──> TaskDao ──> SQLite
                                                      └──> NotificationService ──> Native Plugin
```

- Screen không import trực tiếp DAO, SQLite hay NotificationService.
- Repository nhận SQLite database instance và NotificationService thông qua tham số khởi tạo hoặc factory; giúp dễ dàng truyền in-memory database hoặc mock notification service khi chạy Jest tests.
- Domain models (`domain/models/task.ts`) hoàn toàn độc lập, không import React, React Native hay `expo-sqlite`.
- Tuân thủ hướng import một chiều: `data` không import `features`, feature này không import code riêng tư của feature khác; tránh circular dependencies.
