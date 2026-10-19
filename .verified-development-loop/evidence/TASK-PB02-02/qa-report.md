# QA Report

## Summary

- **Task ID:** `TASK-PB02-02`
- **Overall Result:** PASS
- **QA round:** `1/3`
- **Commit/diff checked:** Triển khai TaskRepository và TaskListRepository với foreign keys, transaction rollback và CRUD
- **Environment:** Node.js v22.22.2, Jest 29.7.0, Better-SQLite3 engine

## Regression Results

- **Full test suite command:** `npm.cmd test -- taskRepository`
- **Result:** 4 passed, 4 total, exit code 0
- **Actual output:** `PASS __tests__/data/taskRepository.test.ts`

## Scenario Results

| ID | PASS/FAIL/NOT RUN | Command or action attempted | Actual result and evidence |
| --- | --- | --- | --- |
| QA-04 | PASS | Call createTask with Title and valid listId -> query task by ID | Task record returned with exact title, PENDING status, MEDIUM priority, and valid created_at_ms |
| QA-05 | PASS | Call createTask with invalid list_id "non-existent-id" | Operation throws Foreign Key constraint error and no record is created |
| QA-06 | PASS | Insert tasks -> close database connection -> reopen database -> query tasks | All inserted tasks and list associations are retrieved without data loss |
| QA-07 | PASS | Execute transaction with task creation followed by intentional error | Error is thrown and database rolls back completely to pre-transaction state |

## Findings

None

## Additional Edge Cases

| `additional` scenario | Command or action | Result and evidence |
| --- | --- | --- |
| Full test suite | `npm.cmd test` | 4 test suites passed, 13 tests total, exit code 0 |

## Limits

Kiểm thử CRUD và transaction trên in-memory SQLite; tích hợp ViewModels và UI màn hình sẽ thực hiện ở PB-03.
