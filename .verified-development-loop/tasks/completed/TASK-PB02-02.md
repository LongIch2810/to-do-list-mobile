<!-- vdl-json
{
  "task_id": "TASK-PB02-02",
  "title": "Task & TaskList Repositories (CRUD, Foreign Keys & Transactions)",
  "acceptance_criteria": [
    "Given a valid task input and an existing list, when createTask is called, then the task is persisted with valid UUID and timestamps.",
    "Given a task input referencing a non-existent list_id, when createTask is called, then the operation fails due to foreign key violation.",
    "Given persisted tasks in the database, when the database is closed and reopened, then all task and list records remain completely intact.",
    "Given an operation with multiple changes, when a failure occurs during execution, then the transaction is rolled back leaving no partial state."
  ],
  "depends_on": [
    "TASK-PB02-01"
  ],
  "verification": [
    [
      "npm.cmd",
      "test",
      "--",
      "taskRepository"
    ],
    [
      "npx.cmd",
      "tsc",
      "--noEmit"
    ]
  ],
  "test_code": "### Repository CRUD & Transaction Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | Verify TaskRepository CRUD operations | Required |\n| Integration | Verify foreign keys, persistence across reopen, and transaction rollback | Required |\n| E2E | Not applicable | UI integration in PB-03 |\n\n### `__tests__/data/taskRepository.test.ts`\n\n```typescript\nimport { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';\nimport { TaskRepository } from '../../src/data/repositories/TaskRepository';\nimport { TaskListRepository } from '../../src/data/repositories/TaskListRepository';\n\ndescribe('TaskRepository and TaskListRepository', () => {\n  let db: any;\n  let taskRepo: TaskRepository;\n  let listRepo: TaskListRepository;\n\n  beforeEach(async () => {\n    db = await createDatabase(':memory:');\n    taskRepo = new TaskRepository(db);\n    listRepo = new TaskListRepository(db);\n  });\n\n  afterEach(async () => {\n    await db.closeAsync();\n  });\n\n  it('creates task with valid UUID and timestamps', async () => {\n    const task = await taskRepo.createTask({\n      title: 'Mua sữa tươi',\n      listId: DEFAULT_INBOX_ID,\n    });\n\n    expect(task.id).toBeDefined();\n    expect(task.title).toBe('Mua sữa tươi');\n    expect(task.status).toBe('PENDING');\n    expect(task.priority).toBe('MEDIUM');\n    expect(task.listId).toBe(DEFAULT_INBOX_ID);\n    expect(task.createdAtMs).toBeGreaterThan(0);\n  });\n\n  it('fails with foreign key error when listId does not exist', async () => {\n    await expect(async () => {\n      await taskRepo.createTask({\n        title: 'Task lỗi',\n        listId: 'invalid-non-existent-list',\n      });\n    }).rejects.toThrow();\n  });\n\n  it('persists data across closing and reopening database', async () => {\n    await taskRepo.createTask({\n      title: 'Task bền vững',\n      listId: DEFAULT_INBOX_ID,\n    });\n\n    const tasksBefore = await taskRepo.getTasksByListId(DEFAULT_INBOX_ID);\n    expect(tasksBefore.length).toBe(1);\n  });\n\n  it('rolls back transaction on failure leaving no partial records', async () => {\n    await expect(async () => {\n      await db.withTransactionAsync(async () => {\n        await taskRepo.createTask({\n          title: 'Task 1 in transaction',\n          listId: DEFAULT_INBOX_ID,\n        });\n        throw new Error('Simulated failure');\n      });\n    }).rejects.toThrow('Simulated failure');\n\n    const tasksAfter = await taskRepo.getTasksByListId(DEFAULT_INBOX_ID);\n    expect(tasksAfter.length).toBe(0);\n  });\n});\n```",
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB02-02.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB02.md.\n- **Environment:** Node.js, Jest, SQLite Repository Integration.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-04 | Given a valid task input and an existing list, when createTask is called, then the task is persisted with valid UUID and timestamps. | functional | Call createTask with Title and valid listId -> query task by ID | Task record returned with exact title, PENDING status, MEDIUM priority, and valid created_at_ms |\n| QA-05 | Given a task input referencing a non-existent list_id, when createTask is called, then the operation fails due to foreign key violation. | functional | Call createTask with invalid list_id \"non-existent-id\" | Operation throws Foreign Key constraint error and no record is created |\n| QA-06 | Given persisted tasks in the database, when the database is closed and reopened, then all task and list records remain completely intact. | functional | Insert tasks -> close database connection -> reopen database -> query tasks | All inserted tasks and list associations are retrieved without data loss |\n| QA-07 | Given an operation with multiple changes, when a failure occurs during execution, then the transaction is rolled back leaving no partial state. | functional | Execute transaction with task creation followed by intentional error | Error is thrown and database rolls back completely to pre-transaction state |",
  "plan_id": "PLAN-PB02",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-PB02-02/verification-8cc92f8f78e749f098530b3ea14e1b9b.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-PB02-02/review-fec04f835c4643c68a1f9381dad51e81.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-PB02-02/qa-119ae7015e724beb9b489e0772eb0533.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-PB02-02/acceptance-0db9a236d9ed4c9592c5d809fbc8eb35.md",
  "latest_report": ".verified-development-loop/reports/TASK-PB02-02-completed-20261019-1800.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-PB02

**Status:** completed

**Plan:** PLAN-PB02

Task & TaskList Repositories (CRUD, Foreign Keys & Transactions)

**Latest report:** .verified-development-loop/reports/TASK-PB02-02-completed-20261019-1800.md

## Test code

### Repository CRUD & Transaction Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | Verify TaskRepository CRUD operations | Required |
| Integration | Verify foreign keys, persistence across reopen, and transaction rollback | Required |
| E2E | Not applicable | UI integration in PB-03 |

### `__tests__/data/taskRepository.test.ts`

```typescript
import { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';
import { TaskRepository } from '../../src/data/repositories/TaskRepository';
import { TaskListRepository } from '../../src/data/repositories/TaskListRepository';

describe('TaskRepository and TaskListRepository', () => {
  let db: any;
  let taskRepo: TaskRepository;
  let listRepo: TaskListRepository;

  beforeEach(async () => {
    db = await createDatabase(':memory:');
    taskRepo = new TaskRepository(db);
    listRepo = new TaskListRepository(db);
  });

  afterEach(async () => {
    await db.closeAsync();
  });

  it('creates task with valid UUID and timestamps', async () => {
    const task = await taskRepo.createTask({
      title: 'Mua sữa tươi',
      listId: DEFAULT_INBOX_ID,
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Mua sữa tươi');
    expect(task.status).toBe('PENDING');
    expect(task.priority).toBe('MEDIUM');
    expect(task.listId).toBe(DEFAULT_INBOX_ID);
    expect(task.createdAtMs).toBeGreaterThan(0);
  });

  it('fails with foreign key error when listId does not exist', async () => {
    await expect(async () => {
      await taskRepo.createTask({
        title: 'Task lỗi',
        listId: 'invalid-non-existent-list',
      });
    }).rejects.toThrow();
  });

  it('persists data across closing and reopening database', async () => {
    await taskRepo.createTask({
      title: 'Task bền vững',
      listId: DEFAULT_INBOX_ID,
    });

    const tasksBefore = await taskRepo.getTasksByListId(DEFAULT_INBOX_ID);
    expect(tasksBefore.length).toBe(1);
  });

  it('rolls back transaction on failure leaving no partial records', async () => {
    await expect(async () => {
      await db.withTransactionAsync(async () => {
        await taskRepo.createTask({
          title: 'Task 1 in transaction',
          listId: DEFAULT_INBOX_ID,
        });
        throw new Error('Simulated failure');
      });
    }).rejects.toThrow('Simulated failure');

    const tasksAfter = await taskRepo.getTasksByListId(DEFAULT_INBOX_ID);
    expect(tasksAfter.length).toBe(0);
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-PB02-02.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB02.md.
- **Environment:** Node.js, Jest, SQLite Repository Integration.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-04 | Given a valid task input and an existing list, when createTask is called, then the task is persisted with valid UUID and timestamps. | functional | Call createTask with Title and valid listId -> query task by ID | Task record returned with exact title, PENDING status, MEDIUM priority, and valid created_at_ms |
| QA-05 | Given a task input referencing a non-existent list_id, when createTask is called, then the operation fails due to foreign key violation. | functional | Call createTask with invalid list_id "non-existent-id" | Operation throws Foreign Key constraint error and no record is created |
| QA-06 | Given persisted tasks in the database, when the database is closed and reopened, then all task and list records remain completely intact. | functional | Insert tasks -> close database connection -> reopen database -> query tasks | All inserted tasks and list associations are retrieved without data loss |
| QA-07 | Given an operation with multiple changes, when a failure occurs during execution, then the transaction is rolled back leaving no partial state. | functional | Execute transaction with task creation followed by intentional error | Error is thrown and database rolls back completely to pre-transaction state |

## Verification

- `npm.cmd test -- taskRepository`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given a valid task input and an existing list, when createTask is called, then the task is persisted with valid UUID and timestamps.
- Given a task input referencing a non-existent list_id, when createTask is called, then the operation fails due to foreign key violation.
- Given persisted tasks in the database, when the database is closed and reopened, then all task and list records remain completely intact.
- Given an operation with multiple changes, when a failure occurs during execution, then the transaction is rolled back leaving no partial state.
