# Clean Code Rules — Todo Mobile (React Native / TypeScript)

Áp dụng khi coding agent tạo hoặc sửa code. [Naming rules](naming.md) quy định cách đặt tên; tài liệu này quy định cách **tổ chức và viết code**. [Architecture](../ARCHITECTURE.md) quy định layer và dependency; [PRD](../PRD.md) quy định hành vi cần đạt. Khi có xung đột, ưu tiên PRD về sản phẩm và Architecture về ranh giới code. Không thêm boilerplate chỉ để “đúng mẫu”.

## 1. Viết theo một trách nhiệm rõ ràng

- Một file/class/function nên có một nhiệm vụ có thể diễn đạt bằng một câu. Tách khi có **lý do thay đổi khác nhau**, logic lặp thực sự hoặc test khó vì quá nhiều trách nhiệm; không tách theo giới hạn dòng tùy ý.
- View (Screen/Component) chỉ render JSX và nhận tương tác; Custom Hook (ViewModel) quản lý UI state, validation để phản hồi sớm và gọi repository; Repository điều phối dữ liệu và side-effect; DAO truy vấn SQLite. Không để Screen tự ghi SQLite hay thực thi câu lệnh SQL trực tiếp.
- Đặt code ở nơi sở hữu theo feature và shared layer trong Architecture. Today, Upcoming, Search và Completed dùng chung Task/TaskRepository; không tạo bản sao model hay repository cho từng màn hình.
- Không tạo `Base*`, `I*`, use-case layer, DTO, mapper, service hoặc wrapper mới khi một function/type hiện có giải quyết được việc. Thêm abstraction khi có ranh giới cần thay thế, test hoặc nhiều implementation thật.

## 2. Function và Hook dễ đọc

- Dùng tên theo [Naming rules](naming.md): động từ cho hành động (`completeTask`), tên điều kiện cho boolean (`isOverdue`). Tên phải giải thích việc làm; không dùng comment để cứu một tên mơ hồ.
- Một function/hook giữ các bước ở cùng mức trừu tượng. Nếu `handleSave` vừa validate input, dựng SQL, hiển thị Toast và điều hướng, chuyển từng việc về đúng layer.
- Ưu tiên guard clause cho input sai/trường hợp biên; tránh nhiều tầng `if` lồng nhau.
- Tuân thủ Rules of Hooks: Chỉ gọi Hooks ở cấp cao nhất của Functional Component hoặc Custom Hook, không gọi bên trong vòng lặp hay điều kiện `if`.

## 3. State và Bất đồng bộ

- SQLite là nguồn sự thật duy nhất của Task/TaskList. UI Component quan sát state từ Custom Hook; không giữ một danh sách task độc lập trong state toàn cục rồi tự đồng bộ thủ công sau mỗi thao tác.
- Biểu diễn riêng biệt `isLoading`, dữ liệu rỗng (`data.length === 0`), dữ liệu có kết quả và `error`. Empty là kết quả hợp lệ, không biến lỗi đọc DB thành danh sách rỗng. Khi mutation đang chạy, chặn double-submit (`isSubmitting`) nhưng vẫn giữ form để người dùng thử lại nếu thất bại.
- Luôn `await` các thao tác ghi database. Không để Promise chạy ngầm mà không bắt lỗi (`unhandled promise rejection`).
- Cleanup effect đúng cách trong `useEffect` (ví dụ hủy listener khi component unmount) để tránh rò rỉ bộ nhớ hoặc gọi `setState` trên unmounted component.

## 4. Validation, Lỗi và Dữ liệu

- Validate input tại UI (qua Custom Hook) để phản hồi nhanh, và bảo vệ invariant quan trọng tại repository/DB: Title bắt buộc/tối đa 200 ký tự, Description tối đa 5.000, Due Time đòi Due Date, List ID phải tồn tại, Reminder ở tương lai, Inbox không được xóa.
- Các thao tác nhiều bước trên DB cần transaction, ví dụ chuyển task về Inbox rồi xóa List. Không xóa dữ liệu để “khắc phục” lỗi migration hoặc lỗi ghi. Khi DB đầy/lỗi I/O, giữ dữ liệu/form hiện có và báo thất bại.
- DB và OS notification không có transaction chung. Sau DB commit, đồng bộ lịch nhắc; nếu thất bại, giữ Task và báo rõ reminder chưa hoạt động. Không `catch` rồi im lặng hoặc trả success giả. Log mã thao tác/ID và nguyên nhân cần thiết, không log Title/Description hay nội dung task cá nhân.
- Chỉ xin quyền hệ điều hành khi cần cho chức năng. Người dùng từ chối quyền thông báo vẫn tạo task được; UI phải cho biết reminder không thể phát.

## 5. Tránh code dư và trùng lặp

- Trước khi thêm file/function/package, tìm cách đã có trong repository và dùng theo pattern hiện tại. Không thêm tính năng P1/P2, option, config hoặc lớp “để sau” khi sprint chỉ cần P0.
- Chỉ trích xuất code dùng chung khi có lặp lại **cùng hành vi**; hai đoạn nhìn giống nhau nhưng thay đổi vì hai yêu cầu khác nhau có thể ở riêng. Dữ liệu chung Task/List luôn thuộc shared model/repository theo Architecture.
- Xóa code, import và nhánh không còn dùng sau khi sửa. Không để commented-out code, `TODO` mơ hồ hoặc fallback giả làm thành công.
- Comment chỉ giải thích **vì sao** một quyết định khó thấy từ code, như giới hạn của notification OS hoặc dữ liệu migration; không lặp lại điều tên function đã nói.

## 6. Test và hoàn tất thay đổi

- Logic có branch, validation, transaction, đồng bộ reminder hoặc xử lý lỗi phải có test đúng hành vi và trường hợp biên.
- Dùng fake repository/mock notification khi test Custom Hook; dùng in-memory SQLite khi test Repository, constraint và migration. RNTL cho UI interaction; reminder và quyền native cần kiểm tra thiết bị thật Android/iOS.
- Khi sửa public API hoặc schema, cập nhật caller, migration, test và fixture liên quan. Chạy `npx tsc --noEmit`, `npm run lint`, `npm test` khi project React Native tồn tại; báo rõ thứ chưa chạy hoặc chưa thể kiểm chứng.
- Một PB chỉ Done khi đạt acceptance criteria và Definition of Done của PRD; không giảm validation, error handling, accessibility hoặc an toàn dữ liệu để rút ngắn diff.

## Checklist ngắn trước khi giao code

1. Tên file/type/function/biến theo [Naming rules](naming.md)?
2. Mỗi phần ở đúng layer, không import ngược hoặc nhân đôi model/repository?
3. Thành công chỉ sau commit, lỗi được xử lý và không có đường mất dữ liệu?
4. Code mới có thật sự cần cho PB đang làm; test chứng minh hành vi quan trọng?
