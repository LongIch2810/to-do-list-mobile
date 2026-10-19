# Sprint 02 — Quản lý trọn vòng đời task

**Thời lượng dự kiến:** 2 tuần · **PB:** PB-04, PB-05, PB-06; hoàn tất PB-02 · **Người dùng thử:** nhóm nhỏ đầu tiên

## Sprint Goal

Người dùng tự quản lý task từ tạo đến sửa, hoàn thành, mở lại và xóa; toàn bộ luồng hoạt động offline và lưu bền vững.

## Công việc dự kiến

### PB-04 — Chi tiết và chỉnh sửa

- [ ] Mở màn hình chi tiết và hiển thị đầy đủ trường của task; mở form sửa từ chi tiết.
- [ ] Sửa Title, Description, Due Date/Time, Priority và List; chỉ cho đặt Due Time khi có Due Date. Chưa cho đặt/sửa Reminder; thao tác này thuộc PB-13 ở Sprint 05.
- [ ] Lưu thay đổi bền vững, giữ Created At, cập nhật Updated At và không cho chuyển sang List không tồn tại.
- [ ] Kiểm tra lỗi lưu không làm mất bản ghi trước đó.

### PB-05 — Hoàn thành/mở lại

- [ ] Hoàn thành task bằng một lần chạm từ danh sách; lưu Completed At gần nhất và cập nhật danh sách ngay.
- [ ] Mở lại task về Pending, xóa Completed At, giữ List gốc; kiểm tra sau khi khởi động lại app.

### PB-06 — Xóa an toàn

- [ ] Hiện xác nhận trước khi xóa vĩnh viễn; hủy xác nhận giữ nguyên task.
- [ ] Xóa task khỏi dữ liệu cục bộ; khi PB-13 bổ sung reminder, xóa task phải hủy lịch nhắc liên quan.

### PB-02 — Hoàn tất tiêu chí còn lại

- [ ] Chạy chuỗi tạo → xem → sửa → hoàn thành/mở lại → xóa khi offline trên Android/iOS.
- [ ] Kiểm tra dữ liệu không rơi vào trạng thái không nhất quán sau khi app đóng đột ngột.

## Bản dùng thử và phản hồi

- [ ] Gửi bản cài đặt cùng hướng dẫn ngắn và kênh báo lỗi cho nhóm thử; nói rõ app lưu task cục bộ và dữ liệu có thể mất khi gỡ app/xóa dữ liệu. Chưa khẳng định dữ liệu không rời thiết bị khi chính sách sao lưu OS chưa được kiểm tra.
- [ ] Cho người dùng thử chuỗi CRUD thực tế; ghi bước chậm/khó hiểu, lỗi mất hoặc nhân đôi task, mức độ rõ của xác nhận xóa.
- [ ] Nêu rõ bản này chưa có reminder hoạt động và chưa tổ chức task theo Today/Upcoming; Sprint Review, cập nhật backlog và Retrospective.

**Điều kiện mở rộng nhóm thử:** không còn lỗi nghiêm trọng làm mất dữ liệu trong luồng CRUD offline.
