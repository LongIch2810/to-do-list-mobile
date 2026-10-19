# Sprint 01 — Ghi việc nhanh

**Thời lượng dự kiến:** 2 tuần · **PB:** PB-01, PB-02 (phần nền tảng), PB-03 · **Người dùng thử:** nội bộ

## Sprint Goal

Người dùng mở app trên Android/iOS, tạo task chỉ với Title và thấy task còn đó sau khi mở lại app. Đo thời gian tạo task cơ bản.

## Công việc dự kiến

### PB-01 — Nền tảng và điều hướng

- [x] Chốt phiên bản Android/iOS tối thiểu và hướng thiết kế cần cho giao diện sprint này.
- [x] Thiết lập app chạy được trên Android/iOS; tạo điều hướng Today, Upcoming, Lists, Settings và nút tạo nhanh ở màn hình quản lý task.
- [x] Xử lý safe area, bàn phím ảo, vùng chạm, cỡ chữ hệ thống và nhãn hỗ trợ tiếp cận cho phần giao diện đã có.

### PB-02 — Mô hình và lưu trữ cục bộ

- [x] Tạo cấu trúc Task/List theo PRD §7, Inbox mặc định và ràng buộc Task thuộc một List hợp lệ.
- [x] Lưu/đọc task cục bộ; kiểm tra dữ liệu còn sau khi đóng/mở app và thao tác tạo task khi offline.
- [x] Kiểm tra lỗi ghi và tính nhất quán khi app bị đóng giữa thao tác lưu.

### PB-03 — Tạo task nhanh

- [x] Tạo form chỉ cần Title, với mặc định Pending, Medium, Inbox; chỉ đưa lên form các trường tùy chọn đã triển khai trong sprint. Chưa cho đặt Reminder trước Sprint 05.
- [x] Kiểm tra Title rỗng/quá 200 ký tự và Description quá 5.000 ký tự; báo lỗi lưu dễ hiểu.
- [x] Hiển thị task ngay sau lưu; ngăn tạo bản sao khi nhấn Save liên tục.

## Demo và phản hồi

- [ ] Demo tạo task chỉ có Title, đóng/mở app, tạo khi offline và kiểm tra task vẫn có mặt trên cả hai nền tảng.
- [ ] Quan sát người thử nội bộ tìm nút tạo và đo thời gian tạo task; ghi điểm vướng vào Product Backlog.
- [ ] Sprint Review và Retrospective; chọn một cải tiến cách làm cho Sprint 02.

**Lưu ý:** PB-02 chỉ được đánh dấu Done sau khi kiểm chứng toàn bộ CRUD offline ở Sprint 02. Chưa mời người dùng ngoài nhóm vì chưa có sửa/xóa task.
