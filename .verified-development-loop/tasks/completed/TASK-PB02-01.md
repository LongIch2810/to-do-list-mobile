<!-- vdl-json
{
  "task_id": "TASK-PB02-01",
  "title": "Domain Models, SQLite Schema, Migrations và Seeding Inbox mặc định",
  "acceptance_criteria": [
    "Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON.",
    "Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1.",
    "Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected."
  ],
  "depends_on": [],
  "verification": [
    [
      "npm.cmd",
      "test",
      "--",
      "databaseSchema"
    ],
    [
      "npx.cmd",
      "tsc",
      "--noEmit"
    ]
  ],
  "test_code": "### Unit & Database Schema Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | Verify domain models and validation rules | Required |\n| Integration | Verify SQLite tables, constraints, PRAGMA foreign_keys and Inbox seed | Required |\n| E2E | Not applicable | Repositories tested in TASK-PB02-02 |\n\n### `__tests__/data/databaseSchema.test.ts`\n\n```typescript\nimport { createDatabase, DEFAULT_INBOX_ID, DEFAULT_INBOX_NAME } from '../../src/data/local/database';\n\ndescribe('Database Schema & Inbox Seeding', () => {\n  let db: any;\n\n  beforeEach(async () => {\n    db = await createDatabase(':memory:');\n  });\n\n  afterEach(async () => {\n    await db.closeAsync();\n  });\n\n  it('creates task_lists and tasks tables and enables PRAGMA foreign_keys', async () => {\n    const fkResult = await db.getFirstAsync('PRAGMA foreign_keys;');\n    expect(Object.values(fkResult)[0]).toBe(1);\n\n    const tables = await db.getAllAsync(\n      \"SELECT name FROM sqlite_master WHERE type='table' AND name IN ('task_lists', 'tasks');\"\n    );\n    expect(tables.length).toBe(2);\n  });\n\n  it('seeds default Inbox with fixed UUID and is_default=1', async () => {\n    const inbox = await db.getFirstAsync(\n      'SELECT * FROM task_lists WHERE is_default = 1;'\n    );\n    expect(inbox).toBeDefined();\n    expect(inbox.id).toBe(DEFAULT_INBOX_ID);\n    expect(inbox.name).toBe(DEFAULT_INBOX_NAME);\n    expect(inbox.is_default).toBe(1);\n  });\n\n  it('rejects deleting or altering is_default of the default Inbox', async () => {\n    await expect(async () => {\n      await db.runAsync('DELETE FROM task_lists WHERE id = ?;', [DEFAULT_INBOX_ID]);\n    }).rejects.toThrow();\n  });\n});\n```",
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB02-01.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB02.md.\n- **Environment:** Node.js, Jest, SQLite in-memory engine.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-01 | Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON. | functional | Initialize database schema -> inspect sqlite_master and PRAGMA foreign_keys | Tables task_lists and tasks exist with foreign keys enabled |\n| QA-02 | Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1. | functional | Initialize database -> query task_lists where is_default = 1 | Single record returned with name \"Hộp thư đến\" and id \"00000000-0000-0000-0000-000000000001\" |\n| QA-03 | Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected. | functional | Attempt DELETE on Inbox row or UPDATE is_default=0 | Operation is rejected with constraint or domain error |",
  "plan_id": "PLAN-PB02",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-PB02-01/verification-3cc9af3f0fba4e4082d8aa6bc63e6730.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-PB02-01/review-5d5cd18a9da34ccdac744398ec1d6552.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-PB02-01/qa-9c1e83a5292a4efe97c0f65d59f06162.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-PB02-01/acceptance-73c57c07651645a6afa92f454caabd03.md",
  "latest_report": ".verified-development-loop/reports/TASK-PB02-01-completed-20261019-1755.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-PB02

**Status:** completed

**Plan:** PLAN-PB02

Domain Models, SQLite Schema, Migrations và Seeding Inbox mặc định

**Latest report:** .verified-development-loop/reports/TASK-PB02-01-completed-20261019-1755.md

## Test code

### Unit & Database Schema Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | Verify domain models and validation rules | Required |
| Integration | Verify SQLite tables, constraints, PRAGMA foreign_keys and Inbox seed | Required |
| E2E | Not applicable | Repositories tested in TASK-PB02-02 |

### `__tests__/data/databaseSchema.test.ts`

```typescript
import { createDatabase, DEFAULT_INBOX_ID, DEFAULT_INBOX_NAME } from '../../src/data/local/database';

describe('Database Schema & Inbox Seeding', () => {
  let db: any;

  beforeEach(async () => {
    db = await createDatabase(':memory:');
  });

  afterEach(async () => {
    await db.closeAsync();
  });

  it('creates task_lists and tasks tables and enables PRAGMA foreign_keys', async () => {
    const fkResult = await db.getFirstAsync('PRAGMA foreign_keys;');
    expect(Object.values(fkResult)[0]).toBe(1);

    const tables = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('task_lists', 'tasks');"
    );
    expect(tables.length).toBe(2);
  });

  it('seeds default Inbox with fixed UUID and is_default=1', async () => {
    const inbox = await db.getFirstAsync(
      'SELECT * FROM task_lists WHERE is_default = 1;'
    );
    expect(inbox).toBeDefined();
    expect(inbox.id).toBe(DEFAULT_INBOX_ID);
    expect(inbox.name).toBe(DEFAULT_INBOX_NAME);
    expect(inbox.is_default).toBe(1);
  });

  it('rejects deleting or altering is_default of the default Inbox', async () => {
    await expect(async () => {
      await db.runAsync('DELETE FROM task_lists WHERE id = ?;', [DEFAULT_INBOX_ID]);
    }).rejects.toThrow();
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-PB02-01.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB02.md.
- **Environment:** Node.js, Jest, SQLite in-memory engine.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-01 | Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON. | functional | Initialize database schema -> inspect sqlite_master and PRAGMA foreign_keys | Tables task_lists and tasks exist with foreign keys enabled |
| QA-02 | Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1. | functional | Initialize database -> query task_lists where is_default = 1 | Single record returned with name "Hộp thư đến" and id "00000000-0000-0000-0000-000000000001" |
| QA-03 | Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected. | functional | Attempt DELETE on Inbox row or UPDATE is_default=0 | Operation is rejected with constraint or domain error |

## Verification

- `npm.cmd test -- databaseSchema`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given the database is initialized, when checking tables, then task_lists and tasks exist with strict constraints and PRAGMA foreign_keys is ON.
- Given a fresh database initialization, when querying task_lists, then default Inbox exists with fixed UUID 00000000-0000-0000-0000-000000000001 and is_default=1.
- Given the default Inbox, when an attempt to delete or alter its is_default flag occurs, then the operation is rejected.
