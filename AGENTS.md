# Hướng dẫn cho coding agent — Todo Mobile

## Nguồn tham chiếu

- **Sản phẩm:** [PRD](docs/PRD.md) là nguồn cho hành vi, phạm vi MVP và Definition of Done; [Product Backlog](docs/PRODUCT-BACKLOG.md) nêu PB, phụ thuộc và tiêu chí nghiệm thu.
- **Việc cần làm:** sprint backlog [01](sprints/SPRINT_01.md) · [02](sprints/SPRINT_02.md) · [03](sprints/SPRINT_03.md) · [04](sprints/SPRINT_04.md) · [05](sprints/SPRINT_05.md) · [06](sprints/SPRINT_06.md).
- **Thiết kế đề xuất:** [Architecture](docs/ARCHITECTURE.md) quy định feature, MVVM, layer và dependency; [Tech Stack](docs/TECH-STACK.md) nêu công nghệ, package và điều kiện kiểm tra tương thích. Đây là thiết kế tham chiếu, không phải bằng chứng code hoặc dependency đã tồn tại.
- **Quy tắc coding:** [Naming](docs/rules/naming.md), [Clean Code](docs/rules/clean-code.md), [SOLID](docs/rules/solid.md), [Security](docs/rules/security.md), [Database](docs/rules/database.md).

Chỉ dẫn trực tiếp của người dùng quyết định việc được giao. Nếu tài liệu mâu thuẫn, ưu tiên PRD cho hành vi sản phẩm; đối chiếu Architecture/Tech Stack cho cách triển khai và báo điểm chưa rõ trước khi chọn giải pháp làm đổi phạm vi. Không tự xem hạng mục P1/P2 hoặc cả sáu sprint là việc đã được giao.

## Khi triển khai code

1. Xác định sprint/PB người dùng giao. Nếu họ nói “sprint tiếp theo”, đối chiếu checklist **và code thực tế** để tìm sprint chưa hoàn tất đầu tiên; hỏi khi vẫn không rõ. Đọc Sprint Goal, PB, mục PRD tương ứng, Architecture và phần Tech Stack liên quan trước khi sửa.
2. Kiểm tra repository hiện có (đặc biệt `package.json`, source, test và cấu hình native) trước khi giả định React Native/Expo project hoặc package đã được cài. Không khởi tạo project, thêm dependency hay chọn version chỉ vì Tech Stack nêu một đề xuất; thực hiện khi việc được giao cần đến và kiểm tra tương thích.
3. Áp dụng Naming, Clean Code, SOLID và Security cho mọi code mới/sửa; đọc Database rules khi đụng schema, query, repository, transaction, migration hoặc dữ liệu task. Giữ hướng `View (Screen) → ViewModel (Custom Hook) → Repository → SQLite`; không tạo use-case/interface/DTO/mapper khi không có lý do kỹ thuật cụ thể.
4. Hoàn tất phần việc đã nhận gồm caller, dữ liệu, UI, xử lý lỗi và test liên quan. Bảo vệ dữ liệu offline; không gửi nội dung task ra máy chủ. Ưu tiên lỗi gây mất dữ liệu hoặc chặn luồng cốt lõi. Không đánh dấu checklist/PB Done khi chưa đạt acceptance criteria và Definition of Done.
5. Chạy kiểm chứng phù hợp với thay đổi (`npx tsc --noEmit`, `npm run lint`, `npm test`, build/thiết bị Android và iOS khi có môi trường); chỉ báo kết quả đã chạy thật, nêu rõ phần chưa kiểm chứng. Sau increment, báo thay đổi, bằng chứng, giới hạn và điều cần người dùng thử phản hồi.

Mỗi sprint dự kiến dài 2 tuần và được chốt lại ở Sprint Planning theo năng lực thực tế. Sprint 1 dùng thử nội bộ; từ Sprint 2 mới mời nhóm nhỏ khi luồng dữ liệu/offline ổn định. Phản hồi mới vào Product Backlog để ưu tiên lại, không ngầm mở rộng sprint đang làm. Chỉ phát hành MVP khi đủ P0 và điều kiện PRD §11, gồm kiểm tra chính sách sao lưu trên Android/iOS; mục tiêu đo ở PRD §10 không tự động là điều kiện phát hành, chỉ số chưa đo được là **chưa xác minh**.

<!-- codebase-memory-mcp:start -->
# Codebase Knowledge Graph (codebase-memory-mcp)

ALWAYS prefer MCP graph tools over grep/glob/file-search for code discovery.

1. `search_graph` — find functions, classes, routes, variables by pattern
2. `trace_path` — trace who calls a function or what it calls
3. `get_code_snippet` — read specific function/class source code
4. `query_graph` — run Cypher queries for complex patterns
5. `get_architecture` — high-level project summary

Use grep/glob for string literals, error messages, config values, non-code files, or when graph tools return insufficient results. Run `index_repository` first if the project is not indexed.
<!-- codebase-memory-mcp:end -->
