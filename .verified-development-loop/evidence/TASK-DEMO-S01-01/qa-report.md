# QA Report

## Summary

- **Task ID:** TASK-DEMO-S01-01
- **Overall Result:** PASS
- **QA round:** 1/3
- **Commit/diff checked:** Added automated E2E demo test suite `__tests__/demo/sprint01Demo.test.tsx` covering all Sprint 01 demo scenarios.
- **Environment:** Node.js v20, Jest 29.7.0, Expo React Native 0.76.7, BetterSqlite3 file-based & in-memory databases.

## Regression Results

- **Full test suite command:** `npm test`
- **Result:** 7 test suites passed, 22 tests passed, 0 failures, exit code 0.
- **Actual output:** All suites (`tabNavigation`, `themeAndWrapper`, `databaseSchema`, `taskRepository`, `useTaskFormViewModel`, `taskFormModal`, `sprint01Demo`) passed cleanly in 3.577s.

## Scenario Results

| ID | PASS/FAIL/NOT RUN | Command or action attempted | Actual result and evidence |
| --- | --- | --- | --- |
| QA-01 | PASS | Press FAB (+) -> enter title 'Mua bánh mì và sữa tươi' -> save -> assert immediate render and database defaults | Modal closed, task card appeared immediately on TodayScreen, SQLite record confirmed: `status='PENDING'`, `priority='MEDIUM'`, `listId=DEFAULT_INBOX_ID`, `dueTimeMinutes=null`, `dueDate=null`, `description=null` |
| QA-02 | PASS | Create task in file SQLite db -> close db connection -> reopen db from file -> query and render in App | Task persisted completely across app/db restart with identical ID, title, status and list association without loss |
| QA-03 | PASS | Benchmark time elapsed during task creation flow | Total execution latency measured at 94ms, well under the 10,000ms threshold specified in PRD §10 |

## Findings

None.

## Additional Edge Cases

| `additional` scenario | Command or action | Result and evidence |
| --- | --- | --- |
| Database re-initialization PRAGMA check | Verified user_version PRAGMA remains 1 and foreign_keys remain ON across restarts | PASS. Database integrity preserved. |

## Limits

No known limits.
