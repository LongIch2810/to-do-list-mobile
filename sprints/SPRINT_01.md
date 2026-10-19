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

- [x] Demo tạo task chỉ có Title, đóng/mở app, tạo khi offline và kiểm tra task vẫn có mặt trên cả hai nền tảng.
- [x] Quan sát người thử nội bộ tìm nút tạo và đo thời gian tạo task; ghi điểm vướng vào Product Backlog.
- [x] Sprint Review và Retrospective; chọn một cải tiến cách làm cho Sprint 02.

### Biên bản Sprint 01 Review & Retrospective

- **Sprint Goal:** "Người dùng mở app trên Android/iOS, tạo task chỉ với Title và thấy task còn đó sau khi mở lại app. Đo thời gian tạo task cơ bản." -> **ĐẠT (Sprint Goal Met)**.
- **Kết quả nghiệm thu:**
  - **PB-01:** Chạy đa nền tảng (Android/iOS Expo), điều hướng 4 tab (Today, Upcoming, Lists, Settings), nút tạo nhanh FAB (+), xử lý safe area, kích thước vùng chạm và nhãn hỗ trợ tiếp cận accessibility.
  - **PB-02 (phần nền tảng):** Mô hình SQLite Task/List theo PRD §7, khởi tạo Inbox mặc định không thể xóa, lưu trữ task cục bộ bền vững qua các chu kỳ đóng/mở app khi offline, kiểm tra tính nhất quán dữ liệu khi đóng app giữa thao tác lưu.
  - **PB-03:** Form tạo task nhanh chỉ cần Title, gán mặc định Pending, Medium, Inbox, validation rỗng/quá 200 ký tự Title và quá 5.000 ký tự Description, chống tạo task trùng lặp khi nhấn Save liên tiếp, task mới hiển thị ngay lập tức trên TodayScreen.
  - **Demo E2E:** Bộ kiểm thử `__tests__/demo/sprint01Demo.test.tsx` pass 100%. Đo thời gian tạo task: execution latency < 100ms trên test runner và ~3-4 giây ở người dùng thực tế (đáp ứng tiêu chuẩn PRD §10: ≤ 10 giây).
- **Retrospective (Đánh giá quy trình):**
  - *Điểm làm tốt:* Quy trình VDL kiểm soát chặt chẽ từng chặng (Spec, Plan, TDD, Verify, Code Review, QA độc lập); 100% test suites pass, TypeScript sạch lỗi và không phát sinh hồi quy.
  - *Điểm cần cải tiến:* Cần chuẩn bị sẵn tiện ích mock cử chỉ (touch/swipe) và mock repository từ đầu sprint cho các tương tác phức tạp hơn ở Sprint 02 (sửa/xóa, toggle hoàn thành, cuộn danh sách).
- **Cải tiến cách làm cho Sprint 02 (Action Item):**
  - *Chuẩn hóa quy trình kiểm thử trước cho interaction cử chỉ:* Thiết lập helper tiện ích giả lập touch gestures và render mock repository cho các thao tác CRUD danh sách của Sprint 02 ngay từ đầu sprint để đẩy nhanh vòng phản hồi TDD.

**Lưu ý:** PB-02 chỉ được đánh dấu Done sau khi kiểm chứng toàn bộ CRUD offline ở Sprint 02. Chưa mời người dùng ngoài nhóm vì chưa có sửa/xóa task.
