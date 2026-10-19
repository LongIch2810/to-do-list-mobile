<!-- vdl-json
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
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB03-01.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB03.md.\n- **Environment:** Node.js, Jest, SQLite Repository integration.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-01 | Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list. | functional | Set title='Mua bánh mì' -> call handleSave() | Task created in SQLite with status=PENDING, priority=MEDIUM, listId=Inbox |\n| QA-02 | Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created. | functional | Set title='   ' -> call handleSave() | Returns null, errorMessage='Tiêu đề không được để trống.', no task inserted |\n| QA-03 | Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed. | functional | Set title='a'*201 -> call handleSave() | Returns null, errorMessage indicates max 200 characters exceeded |\n| QA-04 | Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented. | functional | Trigger handleSave() twice concurrently | Only 1 task record is inserted into SQLite |",
  "plan_id": "PLAN-PB03",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-PB03-01/verification-f6bfc6b91fd9464c9ba489ef7fc275be.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-PB03-01/review-c3dcafade6134daea3cc9dc3d4a1daf6.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-PB03-01/qa-aa68a760164a470a9a0336dd1c39492b.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-PB03-01/acceptance-594be7ff0fca48ec9f0e9edd87cfc625.md",
  "latest_report": ".verified-development-loop/reports/TASK-PB03-01-completed-20261019-1808.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-PB03

**Status:** completed

**Plan:** PLAN-PB03

useTaskFormViewModel: Form State, Invariants Validation & Double-submit Protection

**Latest report:** .verified-development-loop/reports/TASK-PB03-01-completed-20261019-1808.md

## Test code

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

## Verification

- `npm.cmd test -- useTaskFormViewModel`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given a valid title, when saving task via useTaskFormViewModel, then a new task is created with default Pending, Medium, and Inbox list.
- Given an empty or whitespace-only title, when attempting to save, then a validation error is returned and no task is created.
- Given a title exceeding 200 characters or description exceeding 5000 characters, when attempting to save, then a validation error is displayed.
- Given a save operation is in progress, when save is pressed repeatedly, then duplicate task creation is prevented.
