# Sprint 03 — Biết việc cần làm hôm nay

**Thời lượng dự kiến:** 2 tuần · **PB:** PB-07, PB-08, PB-10 · **Người dùng thử:** nhóm thử hiện có

## Sprint Goal

Người dùng tổ chức task theo List và thấy rõ việc đến hạn hôm nay hoặc quá hạn, cùng mức ưu tiên.

## Công việc dự kiến

### PB-07 — Quản lý List

- [ ] Tạo, đổi tên, xem task trong List; tên bắt buộc và tối đa 50 ký tự.
- [ ] Hiển thị số task Pending của mỗi List; Inbox luôn có sẵn và không xóa được.
- [ ] Khi xóa List có task, yêu cầu chọn chuyển toàn bộ task về Inbox hoặc hủy; kiểm tra không mất task.

### PB-08 — Today

- [ ] Phân nhóm task Pending thành Overdue và Today theo ngày/múi giờ thiết bị; bỏ task không có Due Date.
- [ ] Gắn nhãn Overdue, sắp theo thời gian và Priority; số chưa hoàn thành gồm task Pending trong Today/Overdue, số hoàn thành trong ngày dựa trên Completed At theo múi giờ thiết bị, bất kể Due Date.
- [ ] Hoàn thành ngay trên danh sách và cập nhật số liệu; có empty state khi không có việc.

### PB-10 — Priority

- [ ] Chọn và đổi Low/Medium/High; hiển thị bằng nhãn dễ hiểu, không chỉ bằng màu.
- [ ] Xác minh thứ tự High → Medium → Low ở các danh sách có sắp theo Priority.

## Demo và phản hồi

- [ ] Cho nhóm thử sử dụng task thật vài ngày; kiểm tra task hôm nay, quá hạn, không có Due Date và task đã hoàn thành.
- [ ] Hỏi Today có phản ánh đúng việc cần làm, nhãn Overdue/Priority có dễ hiểu, List có giúp tổ chức việc không.
- [ ] Ghi phát hiện vào backlog; Sprint Review và Retrospective.

**Phụ thuộc:** hoàn tất PB-04/PB-05 trước Today; PB-07 cần lưu trữ List từ PB-02.
