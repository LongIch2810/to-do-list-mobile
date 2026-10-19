# QA Report

## Summary

- **Task ID:** `TASK-PB03-02`
- **Overall Result:** PASS
- **QA round:** `1/3`
- **Commit/diff checked:** Giao diện TaskFormModal, component TaskCard, và TodayScreen cập nhật danh sách tức thì
- **Environment:** Node.js v22.22.2, Jest 29.7.0, React Native Testing Library, Expo SDK 52

## Regression Results

- **Full test suite command:** `npm.cmd test -- taskFormModal`
- **Result:** 2 passed, 2 total, exit code 0
- **Actual output:** `PASS __tests__/components/taskFormModal.test.tsx`

## Scenario Results

| ID | PASS/FAIL/NOT RUN | Command or action attempted | Actual result and evidence |
| --- | --- | --- | --- |
| QA-05 | PASS | Nhấn FAB -> Nhập tiêu đề 'Học React Native' -> Nhấn 'Lưu' | Modal đóng lại và 'Học React Native' xuất hiện ngay lập tức trên TodayScreen trong thẻ TaskCard |
| QA-06 | PASS | Nhập tiêu đề 'Công việc kiểm tra nút Lưu' -> Nhấn 'Lưu' | Nút 'Lưu' chuyển sang trạng thái disabled và hiển thị ActivityIndicator |

## Findings

None

## Additional Edge Cases

| `additional` scenario | Command or action | Result and evidence |
| --- | --- | --- |
| Full Regression Test Suite | `npm.cmd test` | 6 test suites passed, 19 tests passed, exit code 0 |
| TypeScript Strict Check | `npx.cmd tsc --noEmit` | Exit code 0, không có lỗi kiểu dữ liệu |

## Limits

Chưa kiểm tra cử chỉ cuộn trên thiết bị thật; sẽ kiểm thử toàn diện trên thiết bị Android/iOS tại PB-16.
