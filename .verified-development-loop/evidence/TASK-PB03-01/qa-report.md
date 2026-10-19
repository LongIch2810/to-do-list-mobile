# QA Report

## Summary

- **Task ID:** `TASK-PB03-01`
- **Overall Result:** PASS
- **QA round:** `1/3`
- **Commit/diff checked:** Triển khai useTaskFormViewModel với validation và chống double-submit
- **Environment:** Node.js v22.22.2, Jest 29.7.0, React Native Testing Library

## Regression Results

- **Full test suite command:** `npm.cmd test -- useTaskFormViewModel`
- **Result:** 4 passed, 4 total, exit code 0
- **Actual output:** `PASS __tests__/hooks/useTaskFormViewModel.test.ts`

## Scenario Results

| ID | PASS/FAIL/NOT RUN | Command or action attempted | Actual result and evidence |
| --- | --- | --- | --- |
| QA-01 | PASS | Set title='Mua bánh mì' -> call handleSave() | Task created in SQLite with status=PENDING, priority=MEDIUM, listId=Inbox |
| QA-02 | PASS | Set title='   ' -> call handleSave() | Returns null, errorMessage='Tiêu đề không được để trống.', no task inserted |
| QA-03 | PASS | Set title='a'*201 -> call handleSave() | Returns null, errorMessage indicates max 200 characters exceeded |
| QA-04 | PASS | Trigger handleSave() twice concurrently | Only 1 task record is inserted into SQLite |

## Findings

None

## Additional Edge Cases

| `additional` scenario | Command or action | Result and evidence |
| --- | --- | --- |
| `npx.cmd tsc --noEmit` | Check TypeScript compilation without emitting | Exit code 0, no type errors |

## Limits

Kiểm thử ViewModel qua unit test; tương tác giao diện người dùng trực tiếp qua Modal sẽ được kiểm thử ở TASK-PB03-02.
