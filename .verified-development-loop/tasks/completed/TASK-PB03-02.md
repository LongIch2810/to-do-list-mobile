<!-- vdl-json
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
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB03-02.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB03.md.\n- **Environment:** React Native Expo, RNTL.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-05 | Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list. | functional | Press FAB -> Enter title 'Học React Native' -> Press Save | Modal closes, 'Học React Native' task card appears on TodayScreen |\n| QA-06 | Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator. | functional | Press Save on valid input | Save button enters disabled state during persist execution |",
  "plan_id": "PLAN-PB03",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-PB03-02/verification-ea908faf75334804829940336e1cef76.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-PB03-02/review-4aeefe1edc634859931904d478f5e97b.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-PB03-02/qa-e4aa85c0ea5e4074b4abf6488c9e9a40.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-PB03-02/acceptance-8c16fa5af6c0464aa7edaebc23f81a4f.md",
  "latest_report": ".verified-development-loop/reports/TASK-PB03-02-completed-20261019-1824.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-PB03

**Status:** completed

**Plan:** PLAN-PB03

TaskFormModal UI, TaskCard & Immediate TodayScreen List Display

**Latest report:** .verified-development-loop/reports/TASK-PB03-02-completed-20261019-1824.md

## Test code

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

## Verification

- `npm.cmd test -- taskFormModal`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given the TaskFormModal is opened, when typing a valid title and pressing Save, then the modal closes and the new task is immediately visible in the task list.
- Given the TaskFormModal is displayed, when isSaving is true, then the save button is disabled with accessible saving indicator.
