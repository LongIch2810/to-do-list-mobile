<!-- vdl-json
{
  "task_id": "TASK-DEMO-S01-01",
  "title": "Automated E2E Demo Suite: Quick Task Creation, Offline Persistence Across App Restart & Time Measurement",
  "acceptance_criteria": [
    "Given the app is launched, when creating a task with only a title, then the task is persisted offline with default Pending, Medium, and Inbox, and immediately displayed.",
    "Given a task is created offline, when the app is closed and reopened, then the task remains intact in the SQLite database and is retrieved successfully.",
    "Given a task creation operation, when measured during execution, then the end-to-end task creation completes well under the 10-second threshold defined in PRD Section 10."
  ],
  "depends_on": [],
  "verification": [
    [
      "npm.cmd",
      "test",
      "--",
      "sprint01Demo"
    ],
    [
      "npx.cmd",
      "tsc",
      "--noEmit"
    ]
  ],
  "test_code": "### E2E Demo & Benchmark Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | Task creation defaults & schema verification | Covered in PB-02 & PB-03 |\n| Integration / E2E | Create task with only title, persist offline, restart app/db, measure time <= 10s | Required in __tests__/demo/sprint01Demo.test.tsx |\n\n### `__tests__/demo/sprint01Demo.test.tsx`\n\n```tsx\nimport React from 'react';\nimport { render, fireEvent, waitFor } from '@testing-library/react-native';\nimport fs from 'fs';\nimport path from 'path';\nimport { App } from '../../src/app/App';\nimport { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';\nimport { TaskRepository } from '../../src/data/repositories/TaskRepository';\nimport { TaskListRepository } from '../../src/data/repositories/TaskListRepository';\n\ndescribe('Sprint 01 Demo: Quick Task Creation, Offline Persistence & Timing', () => {\n  const testDbFile = path.join(__dirname, 'test_demo_sprint01.db');\n\n  beforeEach(() => {\n    if (fs.existsSync(testDbFile)) {\n      fs.unlinkSync(testDbFile);\n    }\n  });\n\n  afterEach(() => {\n    if (fs.existsSync(testDbFile)) {\n      fs.unlinkSync(testDbFile);\n    }\n  });\n\n  it('demo: creates task with only title, verifies default values, and displays immediately', async () => {\n    const db = await createDatabase(':memory:');\n    const taskRepo = new TaskRepository(db);\n    const listRepo = new TaskListRepository(db);\n\n    const { getByLabelText, getByPlaceholderText, getByText } = render(\n      <App db={db} taskRepository={taskRepo} taskListRepository={listRepo} />\n    );\n\n    const fab = getByLabelText('Tạo task mới');\n    fireEvent.press(fab);\n\n    const titleInput = getByPlaceholderText('Tiêu đề công việc...');\n    fireEvent.changeText(titleInput, 'Mua sữa tươi');\n\n    const saveBtn = getByText('Lưu');\n    fireEvent.press(saveBtn);\n\n    await waitFor(() => {\n      expect(getByText('Mua sữa tươi')).toBeTruthy();\n    });\n\n    const allTasks = await taskRepo.getAllTasks();\n    expect(allTasks.length).toBe(1);\n    expect(allTasks[0].title).toBe('Mua sữa tươi');\n    expect(allTasks[0].status).toBe('PENDING');\n    expect(allTasks[0].priority).toBe('MEDIUM');\n    expect(allTasks[0].listId).toBe(DEFAULT_INBOX_ID);\n\n    await db.closeAsync();\n  });\n\n  it('demo: offline persistence across app restart (close and reopen database)', async () => {\n    const db1 = await createDatabase(testDbFile);\n    const taskRepo1 = new TaskRepository(db1);\n    await taskRepo1.createTask({ title: 'Task tồn tại qua khởi động lại' });\n    await db1.closeAsync();\n\n    const db2 = await createDatabase(testDbFile);\n    const taskRepo2 = new TaskRepository(db2);\n    const listRepo2 = new TaskListRepository(db2);\n\n    const { getByText } = render(\n      <App db={db2} taskRepository={taskRepo2} taskListRepository={listRepo2} />\n    );\n\n    await waitFor(() => {\n      expect(getByText('Task tồn tại qua khởi động lại')).toBeTruthy();\n    });\n\n    const persistedTasks = await taskRepo2.getAllTasks();\n    expect(persistedTasks.length).toBe(1);\n    expect(persistedTasks[0].title).toBe('Task tồn tại qua khởi động lại');\n    expect(persistedTasks[0].status).toBe('PENDING');\n\n    await db2.closeAsync();\n  });\n\n  it('demo: measures task creation time well within 10-second threshold (PRD §10)', async () => {\n    const db = await createDatabase(':memory:');\n    const taskRepo = new TaskRepository(db);\n    const listRepo = new TaskListRepository(db);\n\n    const startTime = performance.now();\n    const { getByLabelText, getByPlaceholderText, getByText } = render(\n      <App db={db} taskRepository={taskRepo} taskListRepository={listRepo} />\n    );\n\n    const fab = getByLabelText('Tạo task mới');\n    fireEvent.press(fab);\n\n    const titleInput = getByPlaceholderText('Tiêu đề công việc...');\n    fireEvent.changeText(titleInput, 'Task đo thời gian');\n\n    const saveBtn = getByText('Lưu');\n    fireEvent.press(saveBtn);\n\n    await waitFor(() => {\n      expect(getByText('Task đo thời gian')).toBeTruthy();\n    });\n    const endTime = performance.now();\n    const durationMs = endTime - startTime;\n\n    expect(durationMs).toBeLessThan(10000);\n    console.log(`[Demo Benchmark] Thời gian tạo task hoàn tất: ${durationMs.toFixed(2)} ms (Mục tiêu: <= 10.000 ms)`);\n\n    await db.closeAsync();\n  });\n});\n```",
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-DEMO-S01-01.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-DEMO-S01.md.\n- **Environment:** Jest, React Native Testing Library, SQLite file database.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-01 | Given the app is launched, when creating a task with only a title, then the task is persisted offline with default Pending, Medium, and Inbox, and immediately displayed. | functional | Launch app -> Click FAB -> Enter title 'Demo Sprint 01' -> Click Save | Task displayed on TodayScreen with status PENDING, priority MEDIUM, inbox list |\n| QA-02 | Given a task is created offline, when the app is closed and reopened, then the task remains intact in the SQLite database and is retrieved successfully. | functional | Save task to sqlite file db -> Close db connection -> Reopen db from same file -> Query tasks | Task remains intact with identical id, title, timestamps, listId and status |\n| QA-03 | Given a task creation operation, when measured during execution, then the end-to-end task creation completes well under the 10-second threshold defined in PRD Section 10. | performance | Measure elapsed execution time during task creation and persist flow | Total time is strictly <= 10,000ms (typically < 100ms on test runner) |",
  "plan_id": "PLAN-DEMO-S01",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-DEMO-S01-01/verification-2189a67b70054a5ebeaaf7b8ed4838af.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-DEMO-S01-01/review-5ae28be46d6d40e5a0f00375a80a1c11.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-DEMO-S01-01/qa-b94ad494c68f4d6dab056a63ca7ed262.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-DEMO-S01-01/acceptance-10645e5056624ffeadfc58a25c3913d8.md",
  "latest_report": ".verified-development-loop/reports/TASK-DEMO-S01-01-completed-20261019-1849.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-DEMO-S01

**Status:** completed

**Plan:** PLAN-DEMO-S01

Automated E2E Demo Suite: Quick Task Creation, Offline Persistence Across App Restart & Time Measurement

**Latest report:** .verified-development-loop/reports/TASK-DEMO-S01-01-completed-20261019-1849.md

## Test code

### E2E Demo & Benchmark Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | Task creation defaults & schema verification | Covered in PB-02 & PB-03 |
| Integration / E2E | Create task with only title, persist offline, restart app/db, measure time <= 10s | Required in __tests__/demo/sprint01Demo.test.tsx |

### `__tests__/demo/sprint01Demo.test.tsx`

```tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import fs from 'fs';
import path from 'path';
import { App } from '../../src/app/App';
import { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';
import { TaskRepository } from '../../src/data/repositories/TaskRepository';
import { TaskListRepository } from '../../src/data/repositories/TaskListRepository';

describe('Sprint 01 Demo: Quick Task Creation, Offline Persistence & Timing', () => {
  const testDbFile = path.join(__dirname, 'test_demo_sprint01.db');

  beforeEach(() => {
    if (fs.existsSync(testDbFile)) {
      fs.unlinkSync(testDbFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDbFile)) {
      fs.unlinkSync(testDbFile);
    }
  });

  it('demo: creates task with only title, verifies default values, and displays immediately', async () => {
    const db = await createDatabase(':memory:');
    const taskRepo = new TaskRepository(db);
    const listRepo = new TaskListRepository(db);

    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <App db={db} taskRepository={taskRepo} taskListRepository={listRepo} />
    );

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Mua sữa tươi');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    await waitFor(() => {
      expect(getByText('Mua sữa tươi')).toBeTruthy();
    });

    const allTasks = await taskRepo.getAllTasks();
    expect(allTasks.length).toBe(1);
    expect(allTasks[0].title).toBe('Mua sữa tươi');
    expect(allTasks[0].status).toBe('PENDING');
    expect(allTasks[0].priority).toBe('MEDIUM');
    expect(allTasks[0].listId).toBe(DEFAULT_INBOX_ID);

    await db.closeAsync();
  });

  it('demo: offline persistence across app restart (close and reopen database)', async () => {
    const db1 = await createDatabase(testDbFile);
    const taskRepo1 = new TaskRepository(db1);
    await taskRepo1.createTask({ title: 'Task tồn tại qua khởi động lại' });
    await db1.closeAsync();

    const db2 = await createDatabase(testDbFile);
    const taskRepo2 = new TaskRepository(db2);
    const listRepo2 = new TaskListRepository(db2);

    const { getByText } = render(
      <App db={db2} taskRepository={taskRepo2} taskListRepository={listRepo2} />
    );

    await waitFor(() => {
      expect(getByText('Task tồn tại qua khởi động lại')).toBeTruthy();
    });

    const persistedTasks = await taskRepo2.getAllTasks();
    expect(persistedTasks.length).toBe(1);
    expect(persistedTasks[0].title).toBe('Task tồn tại qua khởi động lại');
    expect(persistedTasks[0].status).toBe('PENDING');

    await db2.closeAsync();
  });

  it('demo: measures task creation time well within 10-second threshold (PRD §10)', async () => {
    const db = await createDatabase(':memory:');
    const taskRepo = new TaskRepository(db);
    const listRepo = new TaskListRepository(db);

    const startTime = performance.now();
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <App db={db} taskRepository={taskRepo} taskListRepository={listRepo} />
    );

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Task đo thời gian');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    await waitFor(() => {
      expect(getByText('Task đo thời gian')).toBeTruthy();
    });
    const endTime = performance.now();
    const durationMs = endTime - startTime;

    expect(durationMs).toBeLessThan(10000);
    console.log(`[Demo Benchmark] Thời gian tạo task hoàn tất: ${durationMs.toFixed(2)} ms (Mục tiêu: <= 10.000 ms)`);

    await db.closeAsync();
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-DEMO-S01-01.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-DEMO-S01.md.
- **Environment:** Jest, React Native Testing Library, SQLite file database.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-01 | Given the app is launched, when creating a task with only a title, then the task is persisted offline with default Pending, Medium, and Inbox, and immediately displayed. | functional | Launch app -> Click FAB -> Enter title 'Demo Sprint 01' -> Click Save | Task displayed on TodayScreen with status PENDING, priority MEDIUM, inbox list |
| QA-02 | Given a task is created offline, when the app is closed and reopened, then the task remains intact in the SQLite database and is retrieved successfully. | functional | Save task to sqlite file db -> Close db connection -> Reopen db from same file -> Query tasks | Task remains intact with identical id, title, timestamps, listId and status |
| QA-03 | Given a task creation operation, when measured during execution, then the end-to-end task creation completes well under the 10-second threshold defined in PRD Section 10. | performance | Measure elapsed execution time during task creation and persist flow | Total time is strictly <= 10,000ms (typically < 100ms on test runner) |

## Verification

- `npm.cmd test -- sprint01Demo`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given the app is launched, when creating a task with only a title, then the task is persisted offline with default Pending, Medium, and Inbox, and immediately displayed.
- Given a task is created offline, when the app is closed and reopened, then the task remains intact in the SQLite database and is retrieved successfully.
- Given a task creation operation, when measured during execution, then the end-to-end task creation completes well under the 10-second threshold defined in PRD Section 10.
