<!-- vdl-json
{
  "plan_id": "PLAN-DEMO-S01",
  "spec": {
    "context_and_goal": "Sprint 01 đã hoàn tất triển khai mã nguồn cho PB-01, PB-02 (nền tảng) và PB-03. Giai đoạn cuối của Sprint 01 yêu cầu thực hiện 'Demo và phản hồi': (1) Demo tạo task chỉ có Title, đóng/mở app, tạo khi offline và kiểm tra task vẫn có mặt trên cả hai nền tảng; (2) Quan sát người thử nội bộ tìm nút tạo và đo thời gian tạo task, ghi điểm vướng vào Product Backlog; (3) Thực hiện Sprint Review & Retrospective và chọn một cải tiến cách làm cho Sprint 02.",
    "current_behavior": "Toàn bộ chức năng tạo task nhanh, lưu trữ cục bộ SQLite và điều hướng đã được xây dựng và pass toàn bộ unit tests, nhưng chưa có test suite demo E2E tự động bao quát kịch bản đóng/mở app offline và đo thời gian tạo task; chưa có tài liệu ghi nhận phản hồi người dùng nội bộ, review & retrospective trong backlog và tài liệu sprint.",
    "desired_outcome": "Xây dựng test suite tự động kiểm chứng trọn vẹn luồng demo: tạo task chỉ với Title, kiểm tra các giá trị mặc định (Pending, Medium, Inbox), kiểm tra tính toàn vẹn khi đóng/mở app với lưu trữ offline, và đo đạc thời gian tạo task theo chuẩn PRD §10 (≤ 10 giây). Đồng thời cập nhật Product Backlog với các quan sát/điểm vướng người dùng nội bộ, thực hiện Sprint Review & Retrospective cho Sprint 01 với cải tiến cho Sprint 02, và cập nhật trạng thái checklist Sprint 01.",
    "scope_included": [
      "Tạo test suite E2E tự động __tests__/demo/sprint01Demo.test.tsx kiểm chứng luồng demo tạo task chỉ có Title, lưu offline, đóng/mở app và đo thời gian tạo task",
      "Kiểm tra tính bền vững và nhất quán của dữ liệu task qua các vòng đời khởi động lại ứng dụng / kết nối database",
      "Ghi nhận quan sát người dùng nội bộ tìm nút tạo (+), đo thời gian hoàn tất tạo task và ghi nhận điểm vướng vào docs/PRODUCT-BACKLOG.md",
      "Biên soạn nội dung Sprint Review, Sprint Retrospective và chốt 1 cải tiến cụ thể cho Sprint 02 trong tài liệu sprint",
      "Cập nhật checklist Sprint 01 tại sprints/SPRINT_01.md sau khi hoàn tất"
    ],
    "scope_excluded": [
      "Sửa/xóa task (thuộc PB-04, PB-06 tại Sprint 02)",
      "Đánh dấu hoàn thành / mở lại task (thuộc PB-05 tại Sprint 02)",
      "Mời người dùng bên ngoài nhóm (chưa có sửa/xóa task theo ghi chú Sprint 01)"
    ],
    "affected_interfaces": "sprints/SPRINT_01.md, docs/PRODUCT-BACKLOG.md, __tests__/demo/sprint01Demo.test.tsx",
    "required_behavior": "Kịch bản demo chạy trơn tru, chứng minh task tạo mới chỉ cần Title hiển thị ngay trên TodayScreen; đóng app và mở lại app dữ liệu vẫn nguyên vẹn; thời gian tạo task đạt chuẩn PRD §10 (≤ 10s); phản hồi người dùng nội bộ và cải tiến quy trình được lưu vào backlog và sprint document.",
    "constraints_and_dependencies": {
      "offline_storage": "SQLite thông qua TaskRepository & createDatabase",
      "time_target": "PRD §10: Tạo task chỉ có Title trong <= 10 giây",
      "platform": "Android & iOS Expo React Native cross-platform"
    },
    "assumptions": "Mã nguồn ứng dụng từ PB-01, PB-02, PB-03 đã sẵn sàng và test suite hiện tại pass 100%."
  },
  "acceptance_criteria": [
    "Given the app is launched, when creating a task with only a title, then the task is persisted offline with default Pending, Medium, and Inbox, and immediately displayed.",
    "Given a task is created offline, when the app is closed and reopened, then the task remains intact in the SQLite database and is retrieved successfully.",
    "Given a task creation operation, when measured during execution, then the end-to-end task creation completes well under the 10-second threshold defined in PRD Section 10.",
    "Given the internal user trial observation, when recording usability feedback and button discoverability, then findings and friction points are documented in the Product Backlog.",
    "Given the completion of Sprint 01, when conducting Sprint Review and Retrospective, then Sprint Goal achievement is evaluated, one concrete process improvement for Sprint 02 is selected, and Sprint 01 checklist is updated."
  ],
  "status": "completed",
  "human_approval": {
    "record": "Phê duyệt kế hoạch PLAN-DEMO-S01 để tiến hành triển khai Demo và phản hồi Sprint 01",
    "time": "2026-10-19T18:44:47.240534+00:00"
  }
}
-->

# Specs: PLAN-DEMO-S01

**Status:** completed

## Spec

### Context And Goal

Sprint 01 đã hoàn tất triển khai mã nguồn cho PB-01, PB-02 (nền tảng) và PB-03. Giai đoạn cuối của Sprint 01 yêu cầu thực hiện 'Demo và phản hồi': (1) Demo tạo task chỉ có Title, đóng/mở app, tạo khi offline và kiểm tra task vẫn có mặt trên cả hai nền tảng; (2) Quan sát người thử nội bộ tìm nút tạo và đo thời gian tạo task, ghi điểm vướng vào Product Backlog; (3) Thực hiện Sprint Review & Retrospective và chọn một cải tiến cách làm cho Sprint 02.

### Current Behavior

Toàn bộ chức năng tạo task nhanh, lưu trữ cục bộ SQLite và điều hướng đã được xây dựng và pass toàn bộ unit tests, nhưng chưa có test suite demo E2E tự động bao quát kịch bản đóng/mở app offline và đo thời gian tạo task; chưa có tài liệu ghi nhận phản hồi người dùng nội bộ, review & retrospective trong backlog và tài liệu sprint.

### Desired Outcome

Xây dựng test suite tự động kiểm chứng trọn vẹn luồng demo: tạo task chỉ với Title, kiểm tra các giá trị mặc định (Pending, Medium, Inbox), kiểm tra tính toàn vẹn khi đóng/mở app với lưu trữ offline, và đo đạc thời gian tạo task theo chuẩn PRD §10 (≤ 10 giây). Đồng thời cập nhật Product Backlog với các quan sát/điểm vướng người dùng nội bộ, thực hiện Sprint Review & Retrospective cho Sprint 01 với cải tiến cho Sprint 02, và cập nhật trạng thái checklist Sprint 01.

### Scope Included

- Tạo test suite E2E tự động __tests__/demo/sprint01Demo.test.tsx kiểm chứng luồng demo tạo task chỉ có Title, lưu offline, đóng/mở app và đo thời gian tạo task
- Kiểm tra tính bền vững và nhất quán của dữ liệu task qua các vòng đời khởi động lại ứng dụng / kết nối database
- Ghi nhận quan sát người dùng nội bộ tìm nút tạo (+), đo thời gian hoàn tất tạo task và ghi nhận điểm vướng vào docs/PRODUCT-BACKLOG.md
- Biên soạn nội dung Sprint Review, Sprint Retrospective và chốt 1 cải tiến cụ thể cho Sprint 02 trong tài liệu sprint
- Cập nhật checklist Sprint 01 tại sprints/SPRINT_01.md sau khi hoàn tất

### Scope Excluded

- Sửa/xóa task (thuộc PB-04, PB-06 tại Sprint 02)
- Đánh dấu hoàn thành / mở lại task (thuộc PB-05 tại Sprint 02)
- Mời người dùng bên ngoài nhóm (chưa có sửa/xóa task theo ghi chú Sprint 01)

### Affected Interfaces

sprints/SPRINT_01.md, docs/PRODUCT-BACKLOG.md, __tests__/demo/sprint01Demo.test.tsx

### Required Behavior

Kịch bản demo chạy trơn tru, chứng minh task tạo mới chỉ cần Title hiển thị ngay trên TodayScreen; đóng app và mở lại app dữ liệu vẫn nguyên vẹn; thời gian tạo task đạt chuẩn PRD §10 (≤ 10s); phản hồi người dùng nội bộ và cải tiến quy trình được lưu vào backlog và sprint document.

### Constraints And Dependencies

{'offline_storage': 'SQLite thông qua TaskRepository & createDatabase', 'time_target': 'PRD §10: Tạo task chỉ có Title trong <= 10 giây', 'platform': 'Android & iOS Expo React Native cross-platform'}

### Assumptions

Mã nguồn ứng dụng từ PB-01, PB-02, PB-03 đã sẵn sàng và test suite hiện tại pass 100%.

## Acceptance criteria

- Given the app is launched, when creating a task with only a title, then the task is persisted offline with default Pending, Medium, and Inbox, and immediately displayed.
- Given a task is created offline, when the app is closed and reopened, then the task remains intact in the SQLite database and is retrieved successfully.
- Given a task creation operation, when measured during execution, then the end-to-end task creation completes well under the 10-second threshold defined in PRD Section 10.
- Given the internal user trial observation, when recording usability feedback and button discoverability, then findings and friction points are documented in the Product Backlog.
- Given the completion of Sprint 01, when conducting Sprint Review and Retrospective, then Sprint Goal achievement is evaluated, one concrete process improvement for Sprint 02 is selected, and Sprint 01 checklist is updated.
