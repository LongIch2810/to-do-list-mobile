# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Todo Mobile — Personal Task Management App

| Thông tin      | Chi tiết                      |
| -------------- | ----------------------------- |
| Product Name   | Todo Mobile                   |
| Document Type  | Product Requirements Document |
| Version        | 1.0                           |
| Date           | 19/10/2026                    |
| Platforms      | Android, iOS                  |
| Product Type   | Personal Productivity         |
| Target Release | MVP                           |
| Status         | Draft                         |

---

## 1. Product Overview

### 1.1. Giới thiệu sản phẩm

Todo Mobile là ứng dụng quản lý công việc cá nhân trên điện thoại, giúp người dùng tổ chức công việc hằng ngày, quản lý thời hạn, thiết lập mức độ ưu tiên và theo dõi tiến độ hoàn thành.

Ứng dụng tập trung vào trải nghiệm đơn giản, trực quan, thao tác nhanh và hạn chế những tính năng không cần thiết.

### 1.2. Problem Statement

Người dùng thường gặp những vấn đề sau:

- Dễ quên công việc hoặc thời hạn quan trọng.
- Khó xác định công việc nào cần ưu tiên.
- Danh sách công việc thiếu tổ chức khi số lượng task tăng lên.
- Không có cái nhìn tổng quan về tiến độ công việc.
- Các ứng dụng quản lý công việc phức tạp, cần nhiều thao tác để tạo một task đơn giản.

### 1.3. Product Vision

Xây dựng một ứng dụng giúp người dùng ghi lại, tổ chức và hoàn thành công việc hằng ngày một cách nhanh chóng, với trải nghiệm mobile-first, tối giản và dễ tiếp cận.

### 1.4. Product Goals

1. Người dùng có thể tạo một task cơ bản trong vòng 10 giây.
2. Người dùng dễ dàng biết hôm nay cần làm gì.
3. Cho phép phân loại và ưu tiên các công việc quan trọng.
4. Nhắc nhở những công việc có thời hạn.
5. Giúp người dùng theo dõi tiến độ hoàn thành.
6. Có thể sử dụng các chức năng cốt lõi khi không có Internet.

---

## 2. Target Users

### 2.1. Primary Users

**Students**

- Quản lý bài tập và lịch học.
- Theo dõi deadline.
- Lập kế hoạch học tập cá nhân.

**Office Workers**

- Quản lý công việc hằng ngày.
- Sắp xếp thứ tự ưu tiên.
- Theo dõi những đầu việc chưa hoàn thành.

**Freelancers**

- Tổ chức công việc theo dự án.
- Theo dõi deadline của nhiều đầu việc.
- Quản lý năng suất làm việc cá nhân.

### 2.2. User Needs

Người dùng cần:

- Thêm và chỉnh sửa công việc nhanh chóng.
- Biết những công việc cần hoàn thành hôm nay.
- Dễ dàng đánh dấu công việc hoàn thành.
- Nhận thông báo nhắc nhở đúng thời điểm.
- Tìm kiếm và lọc công việc.
- Theo dõi những công việc đã hoàn thành.

---

## 3. Product Scope

### 3.1. MVP Scope — Must Have (P0)

Các chức năng bắt buộc trong phiên bản đầu tiên:

- Tạo, xem, chỉnh sửa, xóa task.
- Đánh dấu hoàn thành hoặc chưa hoàn thành.
- Thiết lập ngày và giờ đến hạn.
- Thiết lập mức độ ưu tiên.
- Quản lý danh sách công việc (List).
- Màn hình Today.
- Màn hình Upcoming.
- Xem lịch sử công việc hoàn thành.
- Tìm kiếm và lọc task.
- Thông báo nhắc nhở trên thiết bị.
- Lưu dữ liệu cục bộ, hoạt động offline.

### 3.2. Should Have (P1)

- Dark Mode.
- Subtasks.
- Thống kê tiến độ.
- Sắp xếp công việc thủ công.
- Tùy chỉnh màu sắc cho danh sách.
- Hoàn tác khi xóa task.

### 3.3. Future Scope (P2)

- Đăng nhập, đăng ký tài khoản.
- Đồng bộ dữ liệu giữa nhiều thiết bị.
- Recurring Tasks.
- Calendar View.
- Widget màn hình chính.
- AI Task Assistant.
- Đồng bộ Google Calendar.
- Chia sẻ task và cộng tác nhóm.

### 3.4. Out of Scope for MVP

Phiên bản MVP không bao gồm:

- Team Workspace.
- Phân quyền người dùng.
- Chat trong ứng dụng.
- File Attachment.
- Thanh toán hoặc Subscription.
- Đồng bộ dữ liệu Cloud.
- AI Recommendation.

---

## 4. Functional Requirements

### FR-01: Task Management

**Description:** Người dùng có thể tạo và quản lý các công việc cá nhân.

**Task Attributes**

| Field       | Description         | Required |
| ----------- | ------------------- | -------- |
| Title       | Tên công việc       | Yes      |
| Description | Mô tả chi tiết      | No       |
| Due Date    | Ngày đến hạn        | No       |
| Due Time    | Giờ đến hạn         | No       |
| Priority    | Low / Medium / High | No       |
| List        | Danh sách chứa task | Yes      |
| Status      | Pending / Completed | Yes      |
| Reminder    | Thời điểm nhắc nhở  | No       |

**Business Rules**

- Title không được để trống.
- Title có độ dài tối đa 200 ký tự.
- Description tối đa 5.000 ký tự.
- Nếu không chọn Priority, mặc định là Medium.
- Task mới mặc định có trạng thái Pending.
- Nếu không chọn List, task thuộc danh sách Inbox.
- Due Time chỉ được thiết lập khi có Due Date.
- Một task chỉ thuộc một List tại một thời điểm.

**Acceptance Criteria**

- Người dùng tạo được task chỉ bằng cách nhập Title.
- Task mới xuất hiện ngay sau khi lưu thành công.
- Người dùng có thể chỉnh sửa các trường của task.
- Người dùng có thể đánh dấu Complete hoặc Reopen task.
- Người dùng phải xác nhận trước khi xóa vĩnh viễn task.
- Dữ liệu task vẫn tồn tại khi đóng và mở lại ứng dụng.

### FR-02: Task Lists

**Description:** Cho phép người dùng tổ chức task theo từng danh sách.

**Features**

- Tạo List.
- Đổi tên List.
- Chọn màu đại diện.
- Xem toàn bộ task trong List.
- Xóa List.

**Business Rules**

- Hệ thống tạo sẵn List mặc định tên Inbox.
- Không được xóa Inbox.
- Tên List không được để trống.
- Khi xóa List có task, người dùng phải chọn chuyển các task về Inbox hoặc hủy thao tác.
- Tên List tối đa 50 ký tự.

### FR-03: Today View

**Description:** Hiển thị những công việc cần quan tâm trong ngày.

**Features**

- Hiển thị task có Due Date là hôm nay.
- Hiển thị task quá hạn chưa hoàn thành.
- Đánh dấu task hoàn thành ngay trên danh sách.
- Hiển thị số task hoàn thành và chưa hoàn thành.
- Sắp xếp theo thời gian và Priority.

**Business Rules**

- Chỉ hiển thị task chưa hoàn thành trong danh sách công việc đang xử lý.
- Task quá hạn được phân biệt bằng nhãn Overdue.
- Task không có Due Date không tự động xuất hiện trong Today.
- Ngày hiện tại được xác định theo múi giờ của thiết bị.
- Số chưa hoàn thành gồm task Pending đến hạn hôm nay và quá hạn. Số hoàn thành trong ngày gồm task có Completed At rơi vào ngày hiện tại theo múi giờ thiết bị, bất kể Due Date; các task này không xuất hiện trong danh sách Pending của Today.

### FR-04: Upcoming View

**Description:** Hiển thị những công việc sắp đến hạn.

**Features**

- Nhóm task theo ngày.
- Hiển thị task trong tương lai.
- Cho phép xem danh sách công việc theo từng ngày.
- Điều hướng đến màn hình chi tiết task.

**Business Rules**

- Task đã hoàn thành không xuất hiện trong danh sách Upcoming mặc định.
- Task không có Due Date không xuất hiện trong Upcoming.
- Task được sắp xếp theo Due Date tăng dần.

### FR-05: Priority Management

**Description:** Cho phép người dùng xác định mức độ quan trọng của task.

| Priority | Meaning                             |
| -------- | ----------------------------------- |
| High     | Công việc quan trọng, cần ưu tiên   |
| Medium   | Công việc có mức ưu tiên trung bình |
| Low      | Công việc ít ưu tiên                |

**Acceptance Criteria**

- Người dùng có thể thay đổi mức Priority.
- Priority được hiển thị rõ ràng trong chi tiết task.
- Người dùng có thể lọc theo Priority.
- Khi sắp xếp theo Priority: High → Medium → Low.

### FR-06: Reminder & Notifications

**Description:** Ứng dụng nhắc nhở người dùng về những công việc cần thực hiện.

**Features**

- Thiết lập một thời điểm nhắc nhở cụ thể.
- Nhận thông báo Local Notification.
- Nhấn vào thông báo để mở chi tiết task.
- Hủy thông báo khi task hoàn thành hoặc bị xóa.

**Business Rules**

- Reminder chỉ được đặt ở thời điểm trong tương lai.
- Chỉ task Pending mới phát thông báo nhắc nhở.
- Nếu quyền thông báo bị từ chối, người dùng vẫn tạo được task.
- Ứng dụng phải thông báo rõ khi không có quyền gửi notification.
- Khi chỉnh sửa Reminder, lịch nhắc cũ được thay thế.
- Reminder trong MVP chỉ hỗ trợ nhắc một lần.

### FR-07: Search & Filter

**Description:** Giúp người dùng tìm kiếm và lọc công việc.

**Search**

- Tìm theo Title.
- Tìm theo Description.
- Không phân biệt chữ hoa và chữ thường.

**Filters**

- Status.
- Priority.
- List.
- Due Date.

**Acceptance Criteria**

- Có thể kết hợp nhiều bộ lọc.
- Kết quả được cập nhật khi người dùng nhập tìm kiếm.
- Hiển thị Empty State nếu không tìm thấy task.
- Có thể xóa toàn bộ bộ lọc để quay về danh sách ban đầu.

### FR-08: Completed Tasks

**Description:** Cho phép xem lại những công việc đã hoàn thành.

**Features**

- Xem danh sách task Completed.
- Hiển thị thời điểm hoàn thành.
- Khôi phục task về Pending.
- Xóa task đã hoàn thành.

**Business Rules**

- Mỗi task lưu thời điểm hoàn thành gần nhất.
- Khi Reopen, trường Completed At được xóa.
- Task được giữ nguyên trong danh sách gốc sau khi hoàn thành.

---

## 5. User Experience & Navigation

### 5.1. Navigation Structure

Ứng dụng sử dụng Bottom Navigation gồm bốn mục:

| Tab      | Purpose                      |
| -------- | ---------------------------- |
| Today    | Công việc hôm nay và quá hạn |
| Upcoming | Công việc trong tương lai    |
| Lists    | Quản lý các danh sách        |
| Settings | Cấu hình ứng dụng            |

Nút Floating Action Button (FAB) được dùng để tạo task nhanh trên những màn hình quản lý công việc chính.

### 5.2. Screen Requirements

**SCR-01: Today Screen**

- Header hiển thị ngày hiện tại.
- Thống kê số task hoàn thành trong ngày.
- Nhóm Overdue và Today.
- Task Card.
- Quick Complete Checkbox.
- Floating Add Button.
- Empty State khi không có task.

**SCR-02: Upcoming Screen**

- Danh sách các ngày có công việc.
- Task được nhóm theo ngày.
- Hiển thị thời gian và Priority.
- Nhấn task để mở chi tiết.

**SCR-03: Lists Screen**

- Danh sách các List.
- Số lượng task chưa hoàn thành của mỗi List.
- Tạo List mới.
- Đổi tên và xóa List.
- Chọn List để xem các task.

**SCR-04: Create / Edit Task Screen**

- Input Title.
- Input Description.
- Date Picker.
- Time Picker.
- Priority Selector.
- List Selector.
- Reminder Selector.
- Save Button.

**SCR-05: Task Detail Screen**

- Hiển thị toàn bộ thông tin task.
- Đánh dấu hoàn thành.
- Chỉnh sửa.
- Xóa task.
- Quay về màn hình trước.

**SCR-06: Search Screen**

- Search Bar.
- Filter Controls.
- Search Results.
- Empty State.

**SCR-07: Completed Tasks Screen**

- Danh sách task đã hoàn thành.
- Thời điểm hoàn thành.
- Khôi phục trạng thái.
- Xóa task.

**SCR-08: Settings Screen**

- Cài đặt giao diện.
- Cài đặt thông báo.
- Quyền riêng tư và thông tin lưu trữ.
- Thông tin phiên bản ứng dụng.

### 5.3. UI/UX Principles

- **Minimalist:** Giao diện rõ ràng, hạn chế chi tiết không cần thiết.
- **Mobile First:** Tối ưu thao tác chạm trên điện thoại.
- **Consistent:** Thống nhất màu sắc, typography, spacing và icon.
- **Fast Interaction:** Các thao tác thường dùng cần ít bước.
- **Clear Feedback:** Mọi hành động phải có trạng thái phản hồi.
- **Accessible:** Hỗ trợ kích thước chữ hệ thống, độ tương phản và vùng chạm phù hợp.

---

## 6. Main User Flows

### Flow 01: Create Task

1. Người dùng mở ứng dụng.
2. Nhấn nút Add Task.
3. Nhập Title.
4. Tùy chọn Description, Due Date, Priority, List và Reminder.
5. Nhấn Save.
6. Hệ thống kiểm tra dữ liệu.
7. Lưu task vào cơ sở dữ liệu cục bộ.
8. Hiển thị task trong danh sách phù hợp.
9. Lên lịch Reminder nếu có cấu hình hợp lệ.

**Expected Result:** Task được tạo và lưu thành công.

### Flow 02: Complete Task

1. Người dùng mở Today hoặc List.
2. Nhấn checkbox trên Task Card.
3. Hệ thống cập nhật Status thành Completed.
4. Ghi nhận Completed At.
5. Hủy reminder chưa phát của task.
6. Cập nhật danh sách và thống kê tiến độ.

**Expected Result:** Task được đánh dấu hoàn thành và xuất hiện trong lịch sử.

### Flow 03: Edit Task

1. Người dùng chọn một task.
2. Mở Task Detail.
3. Nhấn Edit.
4. Thay đổi thông tin.
5. Nhấn Save.
6. Hệ thống kiểm tra và lưu thay đổi.
7. Đồng bộ lại lịch reminder nếu cần.

**Expected Result:** Thông tin mới được hiển thị và lưu bền vững.

### Flow 04: Delete Task

1. Người dùng mở Task Detail.
2. Nhấn Delete.
3. Hệ thống hiển thị hộp thoại xác nhận.
4. Người dùng xác nhận.
5. Hệ thống hủy reminder và xóa task.
6. Quay về màn hình trước.

**Expected Result:** Task không còn tồn tại trong dữ liệu ứng dụng.

---

## 7. Data Requirements

### 7.1. Task Entity

```text
Task
├── id: UUID
├── title: String
├── description: String?
├── status: PENDING | COMPLETED
├── priority: LOW | MEDIUM | HIGH
├── listId: UUID
├── dueDate: Date?
├── dueTime: Time?
├── reminderAt: DateTime?
├── completedAt: DateTime?
├── createdAt: DateTime
└── updatedAt: DateTime
```

### 7.2. List Entity

```text
TaskList
├── id: UUID
├── name: String
├── color: String
├── isDefault: Boolean
├── createdAt: DateTime
└── updatedAt: DateTime
```

### 7.3. Entity Relationships

- Một TaskList chứa nhiều Task.
- Một Task chỉ thuộc một TaskList.
- Mỗi Task có ID duy nhất.
- Mỗi TaskList có ID duy nhất.
- Không có User Entity trong MVP vì ứng dụng chưa hỗ trợ tài khoản.

### 7.4. Data Integrity

- Không được tạo task có List ID không tồn tại.
- Xóa task phải xóa hoặc hủy lịch notification liên quan.
- Chuyển task sang List khác phải cập nhật quan hệ.
- Thời điểm Created At không bị thay đổi khi chỉnh sửa.
- Updated At thay đổi khi nội dung hoặc trạng thái task thay đổi.
- Dữ liệu phải nhất quán sau khi ứng dụng bị đóng đột ngột.

---

## 8. Non-Functional Requirements

### NFR-01: Performance

- Thời gian mở ứng dụng mục tiêu dưới 3 giây trên thiết bị thử nghiệm tầm trung.
- Tạo, sửa và hoàn thành task phải cho phản hồi nhanh.
- Cuộn danh sách mượt mà với tối thiểu 1.000 task được lưu.
- Tìm kiếm và lọc không làm khóa giao diện.

### NFR-02: Offline Support

- Người dùng sử dụng mọi tính năng quản lý task cơ bản không cần kết nối Internet.
- Dữ liệu được lưu trên thiết bị.
- Không yêu cầu đăng nhập.
- App phải giữ dữ liệu sau khi đóng hoặc khởi động lại.

### NFR-03: Reliability

- Không mất dữ liệu khi ứng dụng bị đóng ngoài ý muốn.
- Các thao tác ghi dữ liệu phải xử lý lỗi.
- Tránh tạo task trùng do nhấn Save liên tục.
- Có cơ chế xử lý khi thiết bị thiếu dung lượng lưu trữ.

### NFR-04: Security & Privacy

- Không thu thập dữ liệu cá nhân không cần thiết.
- Không yêu cầu quyền truy cập danh bạ, vị trí hoặc camera.
- Chỉ yêu cầu quyền thông báo khi cần thiết.
- Dữ liệu task của MVP được lưu cục bộ.
- Người dùng phải được thông báo rằng dữ liệu có thể mất nếu gỡ cài đặt hoặc xóa dữ liệu ứng dụng.
- Không gửi nội dung công việc đến máy chủ bên ngoài trong MVP.

### NFR-05: Compatibility

- Hỗ trợ Android và iOS.
- Giao diện thích ứng với nhiều kích thước màn hình.
- Hỗ trợ Safe Area và bàn phím ảo.
- Hỗ trợ Light Mode; Dark Mode thuộc P1.
- Xác định phiên bản hệ điều hành tối thiểu trong tài liệu kỹ thuật trước khi triển khai.

### NFR-06: Accessibility

- Vùng chạm phù hợp với hướng dẫn của từng nền tảng.
- Nội dung có độ tương phản dễ đọc.
- Không chỉ dùng màu sắc để biểu thị Priority hoặc Status.
- Các thành phần quan trọng có nhãn cho công nghệ hỗ trợ.

---

## 9. Error Handling & Edge Cases

| Scenario                            | Expected Behavior                                            |
| ----------------------------------- | ------------------------------------------------------------ |
| Title rỗng                          | Hiển thị validation error                                    |
| Tạo task không có Due Date          | Cho phép lưu bình thường                                     |
| Due Date trong quá khứ              | Cho phép lưu, task được đánh dấu Overdue nếu chưa hoàn thành |
| Reminder trong quá khứ              | Không cho lưu reminder đó                                    |
| Không cấp quyền thông báo           | Vẫn lưu task, cảnh báo reminder không thể phát               |
| Nhấn Save liên tục                  | Không tạo các task trùng do cùng một thao tác                |
| Task đã hoàn thành đến giờ nhắc     | Không phát reminder                                          |
| Xóa List chứa task                  | Yêu cầu chuyển task về Inbox hoặc hủy                        |
| Không có task                       | Hiển thị Empty State                                         |
| Không có kết quả tìm kiếm           | Hiển thị thông báo phù hợp                                   |
| Ứng dụng bị đóng khi đang lưu       | Không để dữ liệu rơi vào trạng thái không nhất quán          |
| Thay đổi ngày hoặc múi giờ thiết bị | Làm mới Today, Upcoming và kiểm tra lại lịch reminder        |

---

## 10. Success Metrics

Các chỉ số mục tiêu ban đầu, cần kiểm chứng qua thử nghiệm thực tế:

| Metric                        | Initial Target                               |
| ----------------------------- | -------------------------------------------- |
| Task Creation Time            | ≤ 10 giây với task chỉ có Title              |
| Task Save Success Rate        | ≥ 99,9%                                      |
| Crash-Free Sessions           | ≥ 99,5%                                      |
| Core Offline Functionality    | 100% luồng CRUD hoạt động không cần Internet |
| Task Completion Flow          | Hoàn thành bằng một lần chạm từ danh sách    |
| MVP Acceptance Test Pass Rate | 100% test P0 đạt                             |

Chỉ số về retention và mức độ sử dụng sẽ được xác định sau khi có dữ liệu từ người dùng thử nghiệm.

Các ngưỡng ở mục này là mục tiêu đo lường, không tự động là điều kiện phát hành. Ghi phương pháp, cỡ mẫu và kết quả đạt/chưa đạt/chưa xác minh; đưa kết quả chưa đạt vào quyết định ưu tiên lỗi và cải tiến. Điều kiện phát hành bắt buộc nằm ở §11.

---

## 11. MVP Release Criteria

Ứng dụng chỉ sẵn sàng phát hành MVP khi:

- Hoàn thành toàn bộ yêu cầu P0.
- Tạo, sửa, xóa và hoàn thành task hoạt động đúng.
- Dữ liệu tồn tại sau khi khởi động lại ứng dụng.
- Today và Upcoming phân loại đúng task.
- Reminder được kiểm thử trên thiết bị thật của cả hai nền tảng.
- Không có lỗi nghiêm trọng làm mất dữ liệu.
- Các luồng chính có kiểm thử chức năng.
- UI hoạt động ổn định trên Android và iOS.
- Các trạng thái loading, empty và error được xử lý.
- Kiểm thử các trường hợp biên tại mục 9.
- Đã kiểm tra chính sách sao lưu dữ liệu task của Android/iOS, đối chiếu với cam kết dữ liệu cục bộ và thông báo cho người dùng; không phát hành khi hành vi thực tế trái cam kết hoặc chưa được xác minh.

---

## 12. Development Phases

### Phase 1 — MVP Foundation

- Thiết lập cấu trúc dự án.
- Xây dựng Design System.
- Tạo cơ sở dữ liệu cục bộ.
- Xây dựng Task CRUD.
- Xây dựng List Management.

### Phase 2 — Task Organization

- Today Screen.
- Upcoming Screen.
- Priority Management.
- Search & Filter.
- Completed Tasks.

### Phase 3 — Notifications & Polish

- Local Notifications.
- Reminder Management.
- Validation & Error Handling.
- Tối ưu UI/UX.
- Kiểm thử trên thiết bị thật.

### Phase 4 — Future Enhancements

- Dark Mode.
- Subtasks.
- Recurring Tasks.
- Statistics Dashboard.
- Cloud Sync.
- Account System.

---

## 13. Assumptions & Dependencies

**Assumptions**

- Ứng dụng phục vụ một người dùng trên một thiết bị trong MVP.
- Không cần tài khoản để sử dụng.
- Dữ liệu được lưu cục bộ.
- Người dùng chịu trách nhiệm quản lý dữ liệu thiết bị trước khi có tính năng sao lưu.
- Các tính năng cộng tác được triển khai ở phiên bản sau.

**Dependencies**

- Cơ chế lưu trữ cục bộ.
- Hệ thống Local Notification của Android và iOS.
- Quyền thông báo của hệ điều hành.
- Các thành phần chọn ngày và giờ theo nền tảng.

## 14. Open Decisions

Các quyết định cần được xác định trước khi chốt đặc tả kỹ thuật:

1. Phiên bản Android và iOS tối thiểu được hỗ trợ.
2. Có cần chức năng sao lưu và khôi phục dữ liệu thủ công trong MVP không? Quyết định này tách biệt với việc kiểm tra chính sách sao lưu của hệ điều hành trước phát hành (§11).
3. Có hỗ trợ đa ngôn ngữ ngay từ MVP không?
4. Có đưa Dark Mode vào MVP nếu chi phí triển khai thấp không?
5. Thiết kế giao diện sẽ theo Material Design, Cupertino hay Design System riêng?

---

## 15. Definition of Done

Một tính năng chỉ được xem là hoàn thành khi:

- Đáp ứng đầy đủ Functional Requirements tương ứng.
- Thỏa mãn Acceptance Criteria.
- Xử lý các validation và edge cases.
- Dữ liệu lưu trữ đúng và nhất quán.
- Có kiểm thử phù hợp với mức độ rủi ro.
- Không có lỗi nghiêm trọng chưa được xử lý.
- UI đúng thiết kế được phê duyệt.
- Được kiểm chứng trên nền tảng mục tiêu.

**End of PRD — Version 1.0**
