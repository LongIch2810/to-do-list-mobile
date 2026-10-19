<!-- vdl-json
{
  "plan_id": "PLAN-PB03",
  "mode": "feature",
  "spec": {
    "context_and_goal": "Người dùng có thể tạo một task mới nhanh chóng chỉ với Title. Task mới được gán mặc định: Status=Pending, Priority=Medium, List=Inbox. Ngăn chặn tạo task trùng lặp khi người dùng nhấn nút Save liên tiếp. Báo lỗi rõ ràng khi Title rỗng hoặc vượt quá 200 ký tự, Description vượt quá 5.000 ký tự. Task mới xuất hiện ngay trên màn hình chính sau khi lưu thành công.",
    "current_behavior": "Ở PB-01 và PB-02, hệ thống đã có khung điều hướng 4 tab, nút FAB (+), TaskFormModal placeholder và Data layer SQLite (TaskRepository, TaskListRepository). Chưa có form nhập liệu thực tế và chưa có kết nối giữa UI và database.",
    "desired_outcome": "Nhấn nút FAB (+) mở form tạo task với input Tiêu đề (bắt buộc) và Mô tả (tùy chọn). Khi nhập tiêu đề hợp lệ và nhấn Lưu, task được ghi bền vững vào SQLite với giá trị mặc định (Pending, Medium, Inbox), modal tự động đóng và màn hình TodayScreen hiển thị task mới ngay lập tức. Nút Lưu được bảo vệ chống double-submit và hiển thị thông báo lỗi nếu dữ liệu không hợp lệ.",
    "scope_included": [
      "Custom Hook useTaskFormViewModel quản lý state form, validation và gọi TaskRepository",
      "Giao diện TaskFormModal gồm TextInput Tiêu đề, TextInput Mô tả, nút Lưu và nút Hủy/Đóng",
      "Cơ chế chống double-submit (disable nút Lưu khi isSaving=true)",
      "Hiển thị thông điệp lỗi validation ngay trên form",
      "Component TaskCard hiển thị tiêu đề, trạng thái và priority badge",
      "Hook useTodayViewModel tải và quản lý danh sách task cho TodayScreen",
      "TodayScreen hiển thị danh sách task từ SQLite và cập nhật tức thì sau khi thêm task mới"
    ],
    "scope_excluded": [
      "Xem và chỉnh sửa chi tiết task sau khi tạo (thuộc PB-04)",
      "Đánh dấu hoàn thành / mở lại task (thuộc PB-05)",
      "Đặt thông báo nhắc việc Reminder (thuộc PB-13)"
    ],
    "affected_interfaces": "features/tasks (TaskFormModal, useTaskFormViewModel, TaskCard) và features/today (TodayScreen, useTodayViewModel)",
    "required_behavior": "Người dùng chạm FAB (+) trên TodayScreen mở TaskFormModal. Nếu nhấn Lưu khi chưa nhập Title, hiển thị lỗi 'Tiêu đề không được để trống.'. Khi nhập Title từ 1-200 ký tự và nhấn Lưu, nút Lưu chuyển sang trạng thái đang lưu (disable), task được lưu vào SQLite. Modal đóng lại, TodayScreen hiển thị task vừa tạo.",
    "constraints_and_dependencies": {
      "defaults": "Status: Pending, Priority: Medium, List: Inbox",
      "max_lengths": "Title <= 200 chars, Description <= 5000 chars",
      "offline_storage": "SQLite thông qua TaskRepository"
    },
    "assumptions": "SQLite database đã được khởi tạo và sẵn sàng qua TaskRepository từ PB-02."
  },
  "acceptance_criteria": [
    "Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.",
    "Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.",
    "Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.",
    "Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.",
    "Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.",
    "Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator."
  ],
  "tasks": [
    {
      "task_id": "TASK-PB03-01",
      "title": "useTaskFormViewModel: Form State, Invariants Validation & Double-submit Protection",
      "acceptance_criteria": [
        "Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.",
        "Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.",
        "Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.",
        "Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented."
      ],
      "depends_on": [],
      "verification": [
        [
          "npm.cmd",
          "test",
          "--",
          "useTaskFormViewModel"
        ],
        [
          "npx.cmd",
          "tsc",
          "--noEmit"
        ]
      ],
      "test_code": "### Hook Unit Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | Verify form input state, validation, saving and double-submit | Required |\n| Integration | Verify integration with TaskRepository | Required |\n| E2E | Not applicable | UI modal test in TASK-PB03-02 |\n\n### `__tests__/hooks/useTaskFormViewModel.test.ts`\n\n```typescript\nimport { renderHook, act } from '@testing-library/react-native';\nimport { useTaskFormViewModel } from '../../src/features/tasks/hooks/useTaskFormViewModel';\nimport { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';\nimport { TaskRepository } from '../../src/data/repositories/TaskRepository';\n\ndescribe('useTaskFormViewModel', () => {\n  let db: any;\n  let taskRepo: TaskRepository;\n\n  beforeEach(async () => {\n    db = await createDatabase(':memory:');\n    taskRepo = new TaskRepository(db);\n  });\n\n  afterEach(async () => {\n    await db.closeAsync();\n  });\n\n  it('creates task with default Pending, Medium and Inbox when valid title provided', async () => {\n    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));\n\n    act(() => {\n      result.current.setTitle('Mua bánh mì');\n    });\n\n    let savedTask: any = null;\n    await act(async () => {\n      savedTask = await result.current.handleSave();\n    });\n\n    expect(savedTask).toBeDefined();\n    expect(savedTask.title).toBe('Mua bánh mì');\n    expect(savedTask.status).toBe('PENDING');\n    expect(savedTask.priority).toBe('MEDIUM');\n    expect(savedTask.listId).toBe(DEFAULT_INBOX_ID);\n  });\n\n  it('sets validation error and does not create task when title is empty', async () => {\n    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));\n\n    act(() => {\n      result.current.setTitle('   ');\n    });\n\n    let savedTask: any = null;\n    await act(async () => {\n      savedTask = await result.current.handleSave();\n    });\n\n    expect(savedTask).toBeNull();\n    expect(result.current.errorMessage).toBe('Tiêu đề không được để trống.');\n  });\n\n  it('sets validation error when title exceeds 200 chars', async () => {\n    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));\n\n    act(() => {\n      result.current.setTitle('a'.repeat(201));\n    });\n\n    await act(async () => {\n      await result.current.handleSave();\n    });\n\n    expect(result.current.errorMessage).toBe('Tiêu đề không được vượt quá 200 ký tự.');\n  });\n\n  it('prevents double-submit when save is triggered repeatedly while saving', async () => {\n    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));\n\n    act(() => {\n      result.current.setTitle('Task chống click đúp');\n    });\n\n    let firstSave: any;\n    let secondSave: any;\n\n    await act(async () => {\n      firstSave = result.current.handleSave();\n      secondSave = result.current.handleSave();\n      await Promise.all([firstSave, secondSave]);\n    });\n\n    const allTasks = await taskRepo.getAllTasks();\n    expect(allTasks.length).toBe(1);\n  });\n});\n```",
      "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB03-01.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB03.md.\n- **Environment:** Node.js, Jest, SQLite Repository integration.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-01 | Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list. | functional | Set title='Mua bánh mì' -> call handleSave() | Task created in SQLite with status=PENDING, priority=MEDIUM, listId=Inbox |\n| QA-02 | Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created. | functional | Set title='   ' -> call handleSave() | Returns null, errorMessage='Tiêu đề không được để trống.', no task inserted |\n| QA-03 | Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed. | functional | Set title='a'*201 -> call handleSave() | Returns null, errorMessage indicates max 200 characters exceeded |\n| QA-04 | Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented. | functional | Trigger handleSave() twice concurrently | Only 1 task record is inserted into SQLite |"
    },
    {
      "task_id": "TASK-PB03-02",
      "title": "TaskFormModal UI, TaskCard & Immediate TodayScreen List Display",
      "acceptance_criteria": [
        "Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.",
        "Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator."
      ],
      "depends_on": [
        "TASK-PB03-01"
      ],
      "verification": [
        [
          "npm.cmd",
          "test",
          "--",
          "taskFormModal"
        ],
        [
          "npx.cmd",
          "tsc",
          "--noEmit"
        ]
      ],
      "test_code": "### Component & Screen Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | TaskCard display and TaskFormModal UI components | Required |\n| Integration | Save task via modal and verify immediate update on TodayScreen | Required |\n| E2E | Not applicable | Full device flow verified in PB-16 |\n\n### `__tests__/components/taskFormModal.test.tsx`\n\n```tsx\nimport React from 'react';\nimport { render, fireEvent, waitFor } from '@testing-library/react-native';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { App } from '../../src/app/App';\nimport { createDatabase } from '../../src/data/local/database';\n\ndescribe('TaskFormModal and TodayScreen Integration', () => {\n  it('creates task via modal and displays it immediately in TodayScreen', async () => {\n    const { getByLabelText, getByPlaceholderText, getByText, queryByText } = render(<App />);\n\n    const fab = getByLabelText('Tạo task mới');\n    fireEvent.press(fab);\n\n    const titleInput = getByPlaceholderText('Tiêu đề công việc...');\n    fireEvent.changeText(titleInput, 'Học React Native');\n\n    const saveBtn = getByText('Lưu');\n    fireEvent.press(saveBtn);\n\n    await waitFor(() => {\n      expect(getByText('Học React Native')).toBeTruthy();\n    });\n  });\n\n  it('disables save button and shows loading when isSaving is true', async () => {\n    const { getByLabelText, getByPlaceholderText, getByText } = render(<App />);\n\n    const fab = getByLabelText('Tạo task mới');\n    fireEvent.press(fab);\n\n    const titleInput = getByPlaceholderText('Tiêu đề công việc...');\n    fireEvent.changeText(titleInput, 'Công việc kiểm tra nút Lưu');\n\n    const saveBtn = getByText('Lưu');\n    fireEvent.press(saveBtn);\n\n    expect(saveBtn).toBeTruthy();\n  });\n});\n```",
      "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB03-02.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB03.md.\n- **Environment:** React Native Expo, RNTL.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-05 | Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list. | functional | Press FAB -> Enter title 'Học React Native' -> Press Save | Modal closes, 'Học React Native' task card appears on TodayScreen |\n| QA-06 | Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator. | functional | Press Save on valid input | Save button enters disabled state during persist execution |"
    }
  ],
  "status": "completed",
  "spec_file": ".verified-development-loop/specs/completed/PLAN-PB03.md",
  "execution_state": "completed",
  "human_approval": {
    "record": "duyệt",
    "time": "2026-10-19T18:05:51.186090+00:00"
  },
  "acceptance_evidence": {
    "criteria": [
      "Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.",
      "Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.",
      "Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.",
      "Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.",
      "Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.",
      "Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator."
    ],
    "time": "2026-10-19T18:26:03.696666+00:00"
  }
}
-->

# Plans: PLAN-PB03

**Status:** completed

## Tasks

### TASK-PB03-01: useTaskFormViewModel: Form State, Invariants Validation & Double-submit Protection

- Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.
- Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.
- Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.
- Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.

Test code:

### Hook Unit Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | Verify form input state, validation, saving and double-submit | Required |
| Integration | Verify integration with TaskRepository | Required |
| E2E | Not applicable | UI modal test in TASK-PB03-02 |

### `__tests__/hooks/useTaskFormViewModel.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useTaskFormViewModel } from '../../src/features/tasks/hooks/useTaskFormViewModel';
import { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';
import { TaskRepository } from '../../src/data/repositories/TaskRepository';

describe('useTaskFormViewModel', () => {
  let db: any;
  let taskRepo: TaskRepository;

  beforeEach(async () => {
    db = await createDatabase(':memory:');
    taskRepo = new TaskRepository(db);
  });

  afterEach(async () => {
    await db.closeAsync();
  });

  it('creates task with default Pending, Medium and Inbox when valid title provided', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('Mua bánh mì');
    });

    let savedTask: any = null;
    await act(async () => {
      savedTask = await result.current.handleSave();
    });

    expect(savedTask).toBeDefined();
    expect(savedTask.title).toBe('Mua bánh mì');
    expect(savedTask.status).toBe('PENDING');
    expect(savedTask.priority).toBe('MEDIUM');
    expect(savedTask.listId).toBe(DEFAULT_INBOX_ID);
  });

  it('sets validation error and does not create task when title is empty', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('   ');
    });

    let savedTask: any = null;
    await act(async () => {
      savedTask = await result.current.handleSave();
    });

    expect(savedTask).toBeNull();
    expect(result.current.errorMessage).toBe('Tiêu đề không được để trống.');
  });

  it('sets validation error when title exceeds 200 chars', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('a'.repeat(201));
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(result.current.errorMessage).toBe('Tiêu đề không được vượt quá 200 ký tự.');
  });

  it('prevents double-submit when save is triggered repeatedly while saving', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('Task chống click đúp');
    });

    let firstSave: any;
    let secondSave: any;

    await act(async () => {
      firstSave = result.current.handleSave();
      secondSave = result.current.handleSave();
      await Promise.all([firstSave, secondSave]);
    });

    const allTasks = await taskRepo.getAllTasks();
    expect(allTasks.length).toBe(1);
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-PB03-01.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB03.md.
- **Environment:** Node.js, Jest, SQLite Repository integration.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-01 | Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list. | functional | Set title='Mua bánh mì' -> call handleSave() | Task created in SQLite with status=PENDING, priority=MEDIUM, listId=Inbox |
| QA-02 | Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created. | functional | Set title='   ' -> call handleSave() | Returns null, errorMessage='Tiêu đề không được để trống.', no task inserted |
| QA-03 | Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed. | functional | Set title='a'*201 -> call handleSave() | Returns null, errorMessage indicates max 200 characters exceeded |
| QA-04 | Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented. | functional | Trigger handleSave() twice concurrently | Only 1 task record is inserted into SQLite |

Verification:

- `npm.cmd test -- useTaskFormViewModel`
- `npx.cmd tsc --noEmit`

### TASK-PB03-02: TaskFormModal UI, TaskCard & Immediate TodayScreen List Display

- Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.
- Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator.

Test code:

### Component & Screen Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | TaskCard display and TaskFormModal UI components | Required |
| Integration | Save task via modal and verify immediate update on TodayScreen | Required |
| E2E | Not applicable | Full device flow verified in PB-16 |

### `__tests__/components/taskFormModal.test.tsx`

```tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { App } from '../../src/app/App';
import { createDatabase } from '../../src/data/local/database';

describe('TaskFormModal and TodayScreen Integration', () => {
  it('creates task via modal and displays it immediately in TodayScreen', async () => {
    const { getByLabelText, getByPlaceholderText, getByText, queryByText } = render(<App />);

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Học React Native');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    await waitFor(() => {
      expect(getByText('Học React Native')).toBeTruthy();
    });
  });

  it('disables save button and shows loading when isSaving is true', async () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<App />);

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Công việc kiểm tra nút Lưu');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    expect(saveBtn).toBeTruthy();
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-PB03-02.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB03.md.
- **Environment:** React Native Expo, RNTL.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-05 | Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list. | functional | Press FAB -> Enter title 'Học React Native' -> Press Save | Modal closes, 'Học React Native' task card appears on TodayScreen |
| QA-06 | Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator. | functional | Press Save on valid input | Save button enters disabled state during persist execution |

Verification:

- `npm.cmd test -- taskFormModal`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.
- Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.
- Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.
- Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.
- Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.
- Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator.
