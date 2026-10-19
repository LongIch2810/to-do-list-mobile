# Product Backlog — Todo Mobile

Nguồn: [PRD v1.0](PRD.md) (19/10/2026). Backlog này chuyển yêu cầu sản phẩm thành các hạng mục có thể triển khai và nghiệm thu; chưa phải cam kết về lịch phát hành. Mọi hạng mục bắt đầu ở trạng thái **Chưa làm**.

## Quy ước

- **P0:** bắt buộc để phát hành MVP. **P1:** sau MVP. **P2:** định hướng tương lai.
- Thứ tự trong mỗi nhóm là thứ tự triển khai đề xuất. `Phụ thuộc` chỉ nêu hạng mục cần hoàn tất trước.
- Mỗi hạng mục được xem là xong khi đáp ứng tiêu chí bên dưới và Definition of Done tại PRD §15.

## P0 — MVP

| ID | Hạng mục | Phụ thuộc | Tiêu chí nghiệm thu chính | Nguồn PRD |
| --- | --- | --- | --- | --- |
| PB-01 | Nền tảng Android/iOS, điều hướng và giao diện cơ bản | — | Chạy trên hai nền tảng; có 4 tab Today, Upcoming, Lists, Settings; các màn hình quản lý task chính có nút tạo nhanh; hỗ trợ safe area, bàn phím ảo, cỡ chữ hệ thống, nhãn hỗ trợ tiếp cận và vùng chạm phù hợp. | §5, NFR-05/06 |
| PB-02 | Lưu trữ cục bộ và mô hình Task/List | PB-01 | Có Inbox mặc định, không thể xóa; Task chỉ thuộc một List hợp lệ; lưu đủ trường tại §7; dữ liệu còn sau khi đóng/mở app và nhất quán khi app bị đóng đột ngột; CRUD cơ bản dùng được khi offline. | FR-01/02, §7, NFR-02/03 |
| PB-03 | Tạo task nhanh | PB-02 | Chỉ nhập Title vẫn lưu được và task xuất hiện ngay; Title không rỗng, tối đa 200 ký tự; Description tối đa 5.000 ký tự; mặc định Medium, Pending, Inbox; nhấn Save liên tiếp không tạo bản sao do cùng một thao tác; lỗi ghi dữ liệu được báo rõ. | FR-01, Flow 01, §9 |
| PB-04 | Xem và sửa chi tiết task | PB-03 | Mở chi tiết thấy các trường dữ liệu của task; sửa Title, Description, Due Date/Time, Priority, List và lưu bền vững; Due Time chỉ có khi có Due Date; Created At giữ nguyên, Updated At đổi khi nội dung hoặc trạng thái thay đổi; chuyển List cập nhật quan hệ hợp lệ. Chưa cho đặt/sửa Reminder trước PB-13. | FR-01, SCR-04/05, §7 |
| PB-05 | Hoàn thành và mở lại task | PB-03 | Hoàn thành bằng một lần chạm từ danh sách; lưu Completed At gần nhất; task vẫn thuộc List gốc; mở lại chuyển Pending và xóa Completed At; danh sách liên quan cập nhật ngay. | FR-01/08, Flow 02 |
| PB-06 | Xóa task an toàn | PB-03 | Chỉ xóa vĩnh viễn sau xác nhận; hủy thao tác giữ nguyên task; xóa xong không còn task trong dữ liệu và không còn lịch nhắc liên quan. | FR-01, Flow 04, §7 |
| PB-07 | Quản lý List | PB-02 | Tạo, đổi tên, xem task, xóa List; tên bắt buộc và tối đa 50 ký tự; hiển thị số task Pending; không xóa được Inbox; xóa List có task chỉ thực hiện khi người dùng chọn chuyển tất cả task về Inbox, nếu hủy thì dữ liệu giữ nguyên. | FR-02, SCR-03, §9 |
| PB-08 | Today | PB-04, PB-05 | Theo ngày/múi giờ thiết bị, hiển thị task Pending đến hạn hôm nay và quá hạn trong hai nhóm; task quá hạn có nhãn Overdue; task không có Due Date không tự xuất hiện; sắp theo thời gian và Priority; số chưa hoàn thành gồm hai nhóm Pending, số hoàn thành trong ngày dựa trên Completed At bất kể Due Date; có checkbox và empty state. | FR-03, SCR-01 |
| PB-09 | Upcoming | PB-04, PB-05 | Chỉ hiển thị task Pending có Due Date trong tương lai; nhóm theo ngày, sắp Due Date tăng dần; hiển thị thời gian/Priority và mở được chi tiết task. | FR-04, SCR-02 |
| PB-10 | Priority | PB-04 | Chọn/sửa Low, Medium, High; chi tiết task thể hiện bằng chữ hoặc nhãn, không chỉ bằng màu; khi sắp theo Priority dùng High → Medium → Low. | FR-05, NFR-06 |
| PB-11 | Tìm kiếm và lọc | PB-04, PB-07 | Tìm Title/Description không phân biệt hoa thường, cập nhật theo nội dung nhập; lọc kết hợp Status, Priority, List, Due Date; có trạng thái không kết quả và thao tác xóa toàn bộ bộ lọc. | FR-07, SCR-06 |
| PB-12 | Lịch sử Completed | PB-05 | Xem task đã hoàn thành cùng Completed At; mở lại về Pending hoặc xóa task sau xác nhận. | FR-08, SCR-07 |
| PB-13 | Reminder và thông báo cục bộ | PB-04, PB-05, PB-06 | Bổ sung thao tác đặt/sửa/xóa Reminder trong form; chỉ đặt reminder tương lai và nhắc một lần cho task Pending; chạm thông báo mở đúng task; sửa reminder thay lịch cũ; hoàn thành/xóa task hủy lịch nhắc; từ chối quyền vẫn lưu được task và có thông báo rõ về việc không thể nhắc. | FR-06, Flows 01–04, §9 |
| PB-14 | Settings tối thiểu và thông tin dữ liệu | PB-01, PB-13 | Hiển thị trạng thái/quyền thông báo, thông tin lưu trữ cục bộ và phiên bản; giải thích dữ liệu có thể mất khi gỡ app hoặc xóa dữ liệu ứng dụng; không khẳng định dữ liệu không rời thiết bị trước khi kiểm tra sao lưu OS ở PB-16; không yêu cầu quyền danh bạ, vị trí hay camera và không gửi nội dung task ra máy chủ của ứng dụng. | SCR-08, NFR-04 |
| PB-15 | Hoàn thiện trạng thái và trường hợp biên | PB-08 đến PB-14 | Các màn hình chính xử lý loading, empty, error; Due Date quá khứ được lưu và phân loại Overdue nếu Pending; đổi ngày/múi giờ thiết bị làm mới Today, Upcoming và lịch nhắc; lỗi ghi hoặc thiếu dung lượng không tạo dữ liệu nửa chừng. | §9, §11, NFR-03 |
| PB-16 | Kiểm thử và chốt phát hành MVP | PB-01 đến PB-15 | Luồng tạo/sửa/xóa/hoàn thành, List, Today, Upcoming, tìm kiếm và các trường hợp biên P0 đạt trên Android/iOS; thử reminder trên thiết bị thật ở cả hai nền tảng; xác nhận dữ liệu tồn tại sau khởi động lại, không có lỗi nghiêm trọng gây mất dữ liệu; kiểm tra chính sách sao lưu Android/iOS và thông báo cho người dùng khớp hành vi thực tế. | §10–11, §15 |

### Chỉ số chấp nhận MVP

Các mục tiêu PRD §10 cần đo trên thiết bị thử nghiệm: tạo task chỉ có Title trong **≤ 10 giây**; tỷ lệ lưu task thành công **≥ 99,9%**; phiên sử dụng không crash **≥ 99,5%**; **100%** luồng CRUD cốt lõi hoạt động offline; hoàn thành task từ danh sách bằng **một lần chạm**; **100%** kiểm thử chấp nhận P0 đạt. Mục tiêu mở app dưới **3 giây** trên thiết bị tầm trung và cuộn mượt với ít nhất **1.000 task** thuộc PRD §8. Ghi phương pháp, cỡ mẫu và kết quả; các ngưỡng đo không tự động là điều kiện phát hành. Áp dụng PRD §11 để quyết định phát hành.

## P1 — Sau MVP

| ID | Hạng mục | Kết quả cần đạt | Nguồn PRD |
| --- | --- | --- | --- |
| PB-17 | Dark Mode | Giao diện tối nhất quán và vẫn dễ đọc, dễ chạm. | §3.2, NFR-05 |
| PB-18 | Subtasks | Tạo và theo dõi các bước nhỏ trong một task. | §3.2 |
| PB-19 | Thống kê tiến độ | Xem tiến độ hoàn thành theo thiết kế được chốt sau MVP. | §3.2 |
| PB-20 | Sắp xếp task thủ công | Người dùng đổi thứ tự task và thứ tự được lưu lại. | §3.2 |
| PB-21 | Tùy chỉnh màu List | Chọn và lưu màu đại diện cho List. | §3.2, FR-02 |
| PB-22 | Hoàn tác xóa task | Có thể khôi phục task vừa xóa trong khoảng thời gian được xác định khi thiết kế tính năng. | §3.2 |

## P2 — Định hướng tương lai

| ID | Hạng mục | Nguồn PRD |
| --- | --- | --- |
| PB-23 | Tài khoản: đăng ký, đăng nhập | §3.3 |
| PB-24 | Đồng bộ dữ liệu nhiều thiết bị | §3.3 |
| PB-25 | Task lặp lại | §3.3 |
| PB-26 | Calendar View | §3.3 |
| PB-27 | Widget màn hình chính | §3.3 |
| PB-28 | AI Task Assistant | §3.3 |
| PB-29 | Đồng bộ Google Calendar | §3.3 |
| PB-30 | Chia sẻ task và cộng tác nhóm | §3.3 |

Các hạng mục P2 cần đặc tả và tiêu chí nghiệm thu riêng trước khi lên kế hoạch. Team Workspace, phân quyền, chat, tệp đính kèm, thanh toán/subscription, cloud sync và AI recommendation **không thuộc MVP** (PRD §3.4).

## Phản hồi từ thử nghiệm nội bộ (Sprint 01 Demo)

- **Thời gian tìm nút tạo nhanh (+):** Trung bình dưới 1,5 giây. Nút FAB nổi bật ở góc dưới bên phải, nhận diện tốt trên cả giao diện Android và iOS, có nhãn accessibility `Tạo task mới`.
- **Thời gian tạo task cơ bản:** Đo đạc thực tế người dùng nội bộ hoàn thành thao tác tạo task chỉ có Title trong 3–4 giây (kết quả kiểm thử tự động benchmark hoàn tất trong < 100 ms), đạt mục tiêu PRD §10 (≤ 10 giây).
- **Điểm vướng (Friction points) ghi nhận:**
  1. *Focus con trỏ tự động:* Khi mở TaskFormModal, bàn phím chưa tự động focus vào trường Title; người dùng phải chạm thêm 1 lần vào ô input. -> *Đề xuất ghi nhận vào cải tiến UX cho form nhập liệu.*
  2. *Lưu nhanh bằng bàn phím:* Cần hỗ trợ nhấn phím "Done" / "Enter" trên bàn phím mềm để submit form nhanh thay vì phải chạm nút Lưu. -> *Đề xuất ưu tiên bổ sung trong các sprint hoàn thiện form.*
  3. *Chưa có sửa/xóa:* Người dùng tạo nhầm task nhưng chưa thể sửa hay xóa trên giao diện -> *Xác nhận phù hợp với kế hoạch Sprint 02 (PB-04, PB-05, PB-06).*

## Quyết định còn mở

Các điểm này được giữ nguyên là quyết định cần chốt, không ngầm coi là yêu cầu P0:

1. Phiên bản Android/iOS tối thiểu trước khi triển khai và kiểm thử tương thích.
2. Có thêm sao lưu/khôi phục thủ công trong MVP hay không.
3. Có hỗ trợ đa ngôn ngữ ngay trong MVP hay không.
4. Có đưa Dark Mode từ P1 vào MVP hay không.
5. Hướng thiết kế: Material Design, Cupertino hay Design System riêng.

**Lưu ý về phạm vi:** FR-02 liệt kê chọn màu List nhưng PRD §3.2 xếp tùy chỉnh màu vào P1; backlog theo mức ưu tiên P1. SCR-08 nêu cài đặt giao diện, nhưng Dark Mode vẫn ở P1; PB-14 chỉ gồm thông tin/cài đặt cần cho MVP. Nếu quyết định sản phẩm thay đổi, cập nhật PRD và backlog cùng lúc.
