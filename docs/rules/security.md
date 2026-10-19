# Security & Privacy Rules — Todo Mobile MVP (React Native)

Áp dụng khi coding agent viết React Native/TypeScript và cấu hình Android/iOS. [PRD §8 NFR-04](../PRD.md) là nguồn yêu cầu bảo mật/quyền riêng tư; [Architecture](../ARCHITECTURE.md) định nghĩa ranh giới dữ liệu. Quy tắc đặt tên file, function, biến vẫn ở [Naming rules](naming.md): dùng tên mô tả hành vi thật như `requestNotificationPermission`, `validateTaskInput`, `cancelReminder`; không đặt tên `secure*` khi chưa chứng minh được thuộc tính bảo mật.

## 1. Phạm vi dữ liệu và quyền

- MVP lưu Task/TaskList cục bộ bằng SQLite (`expo-sqlite`), không có tài khoản, backend, analytics hay cloud sync của ứng dụng. Không gửi Title, Description, Due Date hoặc dữ liệu task đến server bên ngoài. Không thêm network SDK, telemetry hay crash reporter gửi dữ liệu nếu chưa có yêu cầu và đánh giá riêng.
- Chỉ yêu cầu quyền notification khi người dùng bắt đầu dùng reminder. Không xin quyền danh bạ, vị trí, camera hoặc quyền storage rộng cho MVP. Quyền bị từ chối **không** chặn tạo/sửa task; hiển thị rõ reminder không thể phát. Kiểm tra lại trạng thái quyền khi app resume vì người dùng có thể đổi trong Settings. [Android notification permission](https://developer.android.com/develop/ui/views/notifications/notification-permission), [Apple notification authorization](https://developer.apple.com/documentation/UserNotifications/asking-permission-to-use-notifications).
- Không giả định “lưu local” đồng nghĩa “không rời thiết bị”: kiểm tra chính sách Android Auto Backup/iOS device backup và cấu hình app trước phát hành. Nếu backup hệ điều hành có thể sao chép database, đối chiếu với cam kết PRD “không gửi nội dung công việc đến máy chủ bên ngoài”; chốt chính sách và thông báo người dùng phù hợp, không âm thầm bật/tắt backup. Người dùng phải biết dữ liệu có thể mất khi gỡ app/xóa dữ liệu nếu không có cách khôi phục.

## 2. Lưu trữ và toàn vẹn dữ liệu

- DB chỉ nằm trong vùng dữ liệu riêng (sandbox) của app; không ghi task vào file công khai, clipboard, AsyncStorage hay log. Không coi sandbox là mã hóa: nếu sau này yêu cầu bảo vệ trước thiết bị bị chiếm quyền hoặc backup không tin cậy, đánh giá mã hóa/key management riêng trước khi thêm package.
- Bật foreign keys và constraints theo Architecture (`PRAGMA foreign_keys = ON;`). Mutation nhiều bước phải dùng transaction; khi lỗi ghi, thiếu dung lượng, crash hoặc migration thất bại, rollback/báo lỗi, không xóa DB hoặc reset dữ liệu để app “chạy lại”. Chỉ báo Save thành công sau commit.
- Xóa task cần xác nhận trước hard delete. Xóa List có task phải chuyển task về Inbox trong cùng transaction hoặc hủy. Hủy notification liên quan sau thay đổi dữ liệu; lỗi hủy/schedule phải được báo và đối soát, không che lỗi hay khôi phục task ngầm.
- Migration phải bảo toàn dữ liệu cũ, có test nâng cấp và kiểm tra integrity. Không lưu cùng Task ở một nguồn sự thật khác để tránh trạng thái trái ngược.

## 3. Input, query và route

- Mọi input từ form, route, notification payload hoặc dữ liệu DB cũ đều có thể sai. Validate Title, Description, Due Time/Due Date, List ID và thời điểm Reminder theo PRD; validate lại ở repository/DB, không chỉ trong Component.
- **Bắt buộc dùng Parameterized Queries (tham số hóa `?`):**
  ```typescript
  // ĐÚNG:
  await db.runAsync('INSERT INTO tasks (id, title) VALUES (?, ?)', [id, title]);
  // SAI TUYỆT ĐỐI (nguy cơ SQL Injection):
  await db.execAsync(`INSERT INTO tasks (id, title) VALUES ('${id}', '${title}')`);
  ```
- `taskId` từ route/notification phải được parse/kiểm tra định dạng và tra DB; task không tồn tại dẫn tới màn hình/trạng thái hợp lệ, không crash. Notification payload chỉ chứa ID tối thiểu, không chứa Title/Description. Không xem deep link hoặc payload là chứng cứ task tồn tại.
- Tìm kiếm/hiển thị nội dung người dùng bằng Component `<Text>` bình thường; không biến text thành HTML, command hay đường dẫn file. Không mở URL ngoài app từ nội dung task nếu chưa có yêu cầu và kiểm tra đích.

## 4. Notification và thông tin trên màn hình khóa

- Nội dung notification có thể hiển thị trên lock screen hoặc trong lịch sử thông báo. Mặc định dùng thông điệp chung không chứa Title/Description nhạy cảm; nếu sản phẩm muốn hiện tên task, cần quyết định UX/privacy rõ và kiểm tra hành vi trên Android/iOS. Payload vẫn chỉ có task ID.
- Chỉ schedule cho task Pending với reminder tương lai và quyền phù hợp; Complete/Delete phải hủy lịch chưa phát, sửa reminder phải thay lịch cũ. Xử lý race khi thao tác sát giờ phát và giới hạn OS; không cam kết thông báo đến đúng giây tuyệt đối.
- Chỉ khai báo Android permissions/receivers cần cho cách schedule thực sự dùng; exact alarm permission có điều kiện/chính sách riêng, không xin “cho chắc”. Test cấp/từ chối/thu hồi quyền, khởi động lại thiết bị, đổi múi giờ và tap mở task trên thiết bị thật.

## 5. Log, lỗi, dependency và build

- Không `console.log` Title, Description, full Task object, text tìm kiếm, notification body hoặc đường dẫn DB có dữ liệu người dùng. Log tên thao tác, loại lỗi và ID khi cần chẩn đoán. Lỗi hiển thị cho người dùng không lộ stack trace/SQL/schema/path nội bộ.
- Không `catch` rồi bỏ qua. Phân biệt validation error, database failure và notification failure; Task đã commit vẫn tồn tại nếu schedule thất bại và UI báo tình trạng nhắc riêng. Không biến lỗi đọc thành danh sách rỗng giả.
- Không commit API key, signing key, mật khẩu hoặc file cấu hình chứa secret. MVP không cần secret/backend; nếu một plugin yêu cầu secret, dừng và đánh giá lý do trước khi thêm. Giữ dependency tối thiểu; kiểm tra changelog, quyền native và compatibility trước nâng version.
- Trước release, kiểm tra cấu hình debug/release, permissions trong Android manifest/iOS entitlements, backup policy, notification preview, dependency lockfile và build hai nền tảng. Không đưa dữ liệu task thật của người dùng vào test fixture hoặc ảnh chụp lỗi.

## Checklist bảo mật cho mỗi thay đổi

1. Dữ liệu nào được đọc/ghi/hiển thị và có rời thiết bị qua log, notification, backup hoặc network không?
2. Input từ UI/route/payload đã validate ở boundary, query đã parameterize, lỗi đã xử lý rõ?
3. Ghi/xóa/migration có thể làm mất dữ liệu khi app dừng hoặc thiếu dung lượng không?
4. Quyền OS chỉ được xin lúc cần và bị từ chối vẫn giữ được luồng task cốt lõi?
5. Test có bao gồm input xấu, lỗi DB/notification và quyền bị từ chối; các điều kiện native cần thiết đã kiểm tra trên thiết bị thật?
