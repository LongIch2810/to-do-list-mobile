# Naming Rules — Todo Mobile (React Native / TypeScript)

Áp dụng khi tạo hoặc sửa code ứng dụng, test và schema. Ưu tiên quy tắc chuẩn của TypeScript/React Native và các quy định dưới đây cho Todo Mobile. Giữ tên đang dùng nhất quán trong module; chỉ đổi tên code cũ khi việc đó cần cho thay đổi được giao. Xem [Architecture](../ARCHITECTURE.md) để biết file thuộc layer nào.

## 1. Quy tắc chung

- Tên dùng **tiếng Anh**, diễn đạt ý nghĩa nghiệp vụ, không viết tắt tùy tiện. Dùng `task`, `taskList`, `dueDate`, `reminderAt`, `completedAt` nhất quán với PRD.
- Tên đủ rõ trong phạm vi gần nhất: `task` trong vòng lặp ngắn là đủ; ở API công khai dùng `taskId`, `listId`, `completedAt`. Không lặp nghĩa như `taskTask`, `listListName`, `getTaskDataInfo`.
- Không đặt tên theo chi tiết công nghệ ở layer khác: ViewModel/Hook gọi `loadTodayTasks`, không gọi `querySqliteTodayRows`. Đặt tên theo **trách nhiệm và kết quả**, không theo ý định tương lai.
- Hạn chế `data`, `info`, `item`, `manager`, `helper`, `utils`, `common` nếu không nói rõ đối tượng. Không thêm hậu tố `Impl`, `Base`, `Abstract` hoặc `I` chỉ để tạo cặp class/interface không cần thiết.

## 2. File và thư mục

| Thành phần | Quy tắc | Ví dụ |
| --- | --- | --- |
| Component / Screen | `PascalCase.tsx`, tên theo vai trò giao diện | `TodayScreen.tsx`, `TaskCard.tsx`, `TaskFormModal.tsx` |
| Custom Hook (ViewModel) | `camelCase.ts`, bắt đầu bằng tiền tố `use` | `useTodayViewModel.ts`, `useTaskFormViewModel.ts` |
| Repository / Service / DAO | `PascalCase.ts` hoặc `camelCase.ts` theo module | `TaskRepository.ts`, `taskDao.ts`, `NotificationService.ts` |
| Utility / Model / Types | `camelCase.ts` | `date.ts`, `task.ts`, `taskList.ts`, `schema.ts` |
| Feature directory | `camelCase` ngắn gọn theo domain | `features/tasks/`, `features/today/`, `features/completed/` |
| Unit / Component Test | Tên file nguồn + `.test.ts` hoặc `.test.tsx` | `useTodayViewModel.test.ts`, `TaskCard.test.tsx` |

Không tạo file `models.ts`, `helpers.ts`, `components.ts` gom nhiều trách nhiệm không liên quan. Một màn hình có thể giữ sub-component nhỏ trong cùng file; tách khi có lý do đọc, tái sử dụng hoặc kiểm thử.

## 3. Type, Interface và Enum

- `PascalCase` cho interface, type alias, class và enum: `Task`, `TaskList`, `TaskPriority`, `TaskStatus`, `TaskRepository`, `TodayViewModelResult`.
- Suffix phản ánh vai trò: `Screen` cho màn hình navigation, `Modal` cho form nổi, `Card` cho thẻ hiển thị, `Repository` cho tầng dữ liệu phối hợp, `Dao` cho truy vấn database, `Service` cho adapter tích hợp ngoài DB.
- Type cho Union / Enum:
  ```typescript
  export type TaskStatus = 'PENDING' | 'COMPLETED';
  export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
  ```
- Props của Component đặt tên theo cú pháp `[ComponentName]Props`: `TaskCardProps`, `ButtonProps`.
- State đặt theo màn hình/luồng: `TaskFormState`, `TodayState`. Lỗi chuyên biệt kế thừa `Error` có hậu tố `Error`: `DatabaseError`, `ValidationError`.

## 4. Function, Method và Parameter

- `camelCase`; tên bắt đầu bằng **động từ** cho hành động: `createTask`, `updateTask`, `completeTask`, `reopenTask`, `deleteTask`, `moveTasksToInbox`.
- Tên truy vấn nói rõ cách nhận kết quả: `getTodayTasks()`, `getTaskById()`, `searchTasks()`.
- Tên kiểm tra điều kiện (Predicate) trả `boolean`: `isOverdue`, `hasDueDate`, `canSave`, `isDefaultList`.
- Event Handler UI nêu rõ hành động hoặc sự kiện: `handleSave`, `handleToggleComplete`, `handleDelete`, `onPressItem`. Tránh đặt chung chung như `handleClick` hay `doAction`.
- Parameter chứa ID dùng `taskId`, `listId`; thời điểm dùng `reminderAtMs`, `completedAtMs`; ngày lịch dùng `dueDate` (ISO `YYYY-MM-DD`).

## 5. Biến, State và Constant

- Biến, field, local state dùng `camelCase`: `selectedListId`, `pendingTasks`, `reminderAtMs`.
- Boolean bắt đầu bằng `is`, `has`, `can`, `should`: `isSaving`, `isLoading`, `hasReminder`, `canDeleteList`. Tránh phủ định kép như `isNotIncomplete`.
- Constant toàn cục hoặc cấu hình cố định dùng `SCREAMING_SNAKE_CASE` hoặc `camelCase` có định danh rõ: `DEFAULT_INBOX_ID`, `MAX_TASK_TITLE_LENGTH`.
- State cục bộ trong React dùng cặp `[value, setValue]`: `const [title, setTitle] = useState('')`.

## 6. Database và Route

- SQLite table/column dùng `snake_case`; bảng số nhiều: `tasks`, `task_lists`; cột `list_id`, `due_date`, `reminder_at_ms`. TypeScript domain giữ `listId`, `dueDate`, `reminderAtMs`. Mapping giữa hai kiểu tên thuộc về data/DAO layer.
- Route name trong React Navigation dùng `PascalCase`: `Today`, `Upcoming`, `TaskDetail`, `TaskFormModal`.
- Test case mô tả hành vi và kết quả:
  ```typescript
  it('should assign Inbox when listId is omitted', async () => { ... });
  it('should cancel pending notification when task is completed', async () => { ... });
  ```

## 7. Kiểm tra trước khi thêm tên mới

1. Tìm type/function hiện có cùng trách nhiệm để tái sử dụng, nhất là Task, TaskList và repository chung.
2. Tên có cho biết đối tượng, hành động/kết quả và layer sở hữu không?
3. Có nhất quán với thuật ngữ PRD, Architecture và tên ở caller/test không?
4. Nếu đổi tên public API, cập nhật mọi caller, test và route liên quan trong cùng thay đổi.
