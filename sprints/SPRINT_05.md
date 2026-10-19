# Sprint 05 — Nhắc đúng lúc

**Thời lượng dự kiến:** 2 tuần · **PB:** PB-13, PB-14 · **Người dùng thử:** nhóm beta trên thiết bị thật

## Sprint Goal

Task Pending có thể nhắc một lần đúng thời điểm trên thiết bị, còn người dùng hiểu trạng thái quyền thông báo và nơi lưu dữ liệu.

## Công việc dự kiến

### PB-13 — Reminder và thông báo cục bộ

- [ ] Bổ sung thao tác đặt/sửa/xóa Reminder trong form; chỉ cho đặt thời điểm nhắc trong tương lai và lập lịch nhắc một lần cho task Pending.
- [ ] Chạm thông báo mở đúng task; sửa reminder thay lịch cũ.
- [ ] Hoàn thành hoặc xóa task thì hủy nhắc chưa phát; task Completed không phát reminder.
- [ ] Nếu từ chối quyền, vẫn lưu task và báo rõ reminder không thể phát; chỉ xin quyền khi cần.
- [ ] Kiểm tra thực tế trên Android/iOS, gồm app đóng/mở lại và thay đổi lịch.

### PB-14 — Settings và thông tin dữ liệu

- [ ] Hiển thị trạng thái quyền thông báo, thông tin phiên bản và dữ liệu đang lưu cục bộ.
- [ ] Giải thích nguy cơ mất dữ liệu khi gỡ app/xóa dữ liệu ứng dụng; chưa khẳng định dữ liệu không rời thiết bị trước khi kiểm tra sao lưu OS ở PB-16.
- [ ] Xác nhận app không xin quyền danh bạ, vị trí, camera và không gửi nội dung task ra máy chủ.

## Bản beta và phản hồi

- [ ] Giao bản beta cùng hướng dẫn thử: cấp/từ chối quyền, sửa giờ nhắc, hoàn thành/xóa trước giờ nhắc, chạm thông báo.
- [ ] Ghi thiết bị, phiên bản OS, thời gian dự kiến/thực tế và trường hợp thông báo sai hoặc không đến; hỏi người dùng có hiểu trạng thái quyền không.
- [ ] Sprint Review, ưu tiên lỗi ảnh hưởng đến nhắc hoặc dữ liệu cho Sprint 06, rồi Retrospective.

**Phụ thuộc:** PB-04/PB-05/PB-06 đã hoàn tất; PB-14 được nghiệm thu sau PB-13 vì hiển thị trạng thái notification.
