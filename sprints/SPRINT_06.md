# Sprint 06 — Ổn định và đánh giá phát hành

**Thời lượng dự kiến:** 2 tuần · **PB:** PB-15, PB-16 · **Người dùng thử:** nhóm beta, sau đó release candidate

## Sprint Goal

Đưa toàn bộ luồng P0 đến trạng thái có thể phát hành MVP bằng kiểm thử và bằng chứng đo được trên Android/iOS.

## Công việc dự kiến

### PB-15 — Trạng thái và trường hợp biên

- [ ] Rà soát loading, empty, error ở các màn hình chính và xử lý lỗi ghi/thiếu dung lượng mà không tạo dữ liệu nửa chừng.
- [ ] Kiểm tra Due Date quá khứ được lưu; task Pending quá hạn xuất hiện đúng nhãn Overdue.
- [ ] Kiểm tra khi đổi ngày/múi giờ thiết bị: Today, Upcoming và lịch reminder được làm mới đúng.
- [ ] Sửa các lỗi P0 được ưu tiên từ các vòng dùng thử trước; kiểm tra lại luồng liên quan.

### PB-16 — Kiểm thử chấp nhận MVP

- [ ] Chạy các luồng tạo/sửa/xóa/hoàn thành, List, Today, Upcoming, tìm kiếm, Completed và trường hợp biên trên Android/iOS.
- [ ] Thử reminder trên thiết bị thật của cả hai nền tảng; kiểm tra dữ liệu sau khởi động lại và khi offline.
- [ ] Đo tạo task chỉ có Title ≤ 10 giây, hoàn thành từ danh sách một chạm, mở app mục tiêu < 3 giây và cuộn với ít nhất 1.000 task.
- [ ] Đo các mục tiêu PRD §10: lưu thành công ≥ 99,9%, phiên không crash ≥ 99,5%, 100% CRUD cốt lõi offline và 100% kiểm thử chấp nhận P0 đạt; ghi rõ phương pháp, cỡ mẫu và kết quả đạt/chưa đạt/chưa xác minh. Các ngưỡng đo không tự động là điều kiện phát hành; đối chiếu PRD §11.
- [ ] Kiểm tra chính sách sao lưu dữ liệu task của Android/iOS và nội dung thông báo người dùng có khớp hành vi thực tế; rà soát toàn bộ điều kiện phát hành PRD §11 và Definition of Done §15; không phát hành khi còn lỗi nghiêm trọng gây mất dữ liệu.

## Sprint Review và quyết định phát hành

- [ ] Demo release candidate cho người dùng thử; ghi lỗi còn lại, tác động và mức ưu tiên.
- [ ] Product Owner đối chiếu bằng chứng với từng điều kiện phát hành; tiêu chí thiếu dữ liệu được ghi **chưa xác minh**, không đánh dấu đạt.
- [ ] Nếu chưa đủ điều kiện, đưa phần chưa Done/lỗi vào Product Backlog và lập sprint tiếp theo; Retrospective chọn cải tiến cho chu kỳ sau MVP.

**Sau MVP:** chọn PB-17–PB-22 theo phản hồi thực tế; PB-23–PB-30 cần đặc tả riêng trước khi lập sprint.
