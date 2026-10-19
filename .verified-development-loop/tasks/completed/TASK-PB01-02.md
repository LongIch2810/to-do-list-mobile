<!-- vdl-json
{
  "task_id": "TASK-PB01-02",
  "title": "Thiết lập 4-Tab Navigation (Today, Upcoming, Lists, Settings) và nút tạo nhanh FAB",
  "acceptance_criteria": [
    "Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.",
    "Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label \"Tạo task mới\".",
    "Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.",
    "Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens."
  ],
  "depends_on": [
    "TASK-PB01-01"
  ],
  "verification": [
    [
      "npm.cmd",
      "test",
      "--",
      "tabNavigation"
    ],
    [
      "npx.cmd",
      "tsc",
      "--noEmit"
    ]
  ],
  "test_code": "### Navigation & FAB Component Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | Verify TabNavigator route configurations | Required |\n| Integration | Verify tab navigation and FAB presence/absence per screen | Required |\n| E2E | Not applicable | Full device E2E will run in PB-16 on real device/emulator |\n\n### `__tests__/navigation/tabNavigation.test.tsx`\n\n```tsx\nimport React from 'react';\nimport { render, fireEvent } from '@testing-library/react-native';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { RootNavigator } from '../../src/app/navigation/RootNavigator';\n\ndescribe('TabNavigation and Quick Add FAB', () => {\n  it('renders 4 tabs: Today, Upcoming, Lists, Settings with accessibility labels', async () => {\n    const { getByText } = render(\n      <NavigationContainer>\n        <RootNavigator />\n      </NavigationContainer>\n    );\n\n    expect(getByText('Today')).toBeTruthy();\n    expect(getByText('Upcoming')).toBeTruthy();\n    expect(getByText('Lists')).toBeTruthy();\n    expect(getByText('Settings')).toBeTruthy();\n  });\n\n  it('displays FAB with min 48x48dp touch target and accessibility label on task screens', () => {\n    const { getByLabelText } = render(\n      <NavigationContainer>\n        <RootNavigator />\n      </NavigationContainer>\n    );\n\n    const fab = getByLabelText('Tạo task mới');\n    expect(fab).toBeTruthy();\n  });\n\n  it('does not display FAB on Settings screen', () => {\n    const { getByText, queryByLabelText } = render(\n      <NavigationContainer>\n        <RootNavigator />\n      </NavigationContainer>\n    );\n\n    fireEvent.press(getByText('Settings'));\n    expect(queryByLabelText('Tạo task mới')).toBeNull();\n  });\n\n  it('opens TaskFormModal placeholder when tapping FAB', () => {\n    const { getByLabelText, getByText } = render(\n      <NavigationContainer>\n        <RootNavigator />\n      </NavigationContainer>\n    );\n\n    const fab = getByLabelText('Tạo task mới');\n    fireEvent.press(fab);\n    expect(getByText(/Task Form Placeholder/i)).toBeTruthy();\n  });\n});\n```",
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB01-02.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB01.md.\n- **Environment:** React Native Expo app, React Navigation v7, RNTL.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-03 | Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works. | functional | Launch app root -> inspect bottom tab bar -> switch tab | All 4 tabs present with accessible labels and switching renders corresponding screen |\n| QA-04 | Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label \"Tạo task mới\". | functional | Navigate to Today, Upcoming, or Lists -> find FAB | FAB (+) is present, has accessibilityLabel \"Tạo task mới\" and minimum 48x48dp touch target |\n| QA-05 | Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed. | functional | Switch to Settings tab -> inspect screen | FAB (+) is not present |\n| QA-06 | Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens. | functional | On Today/Upcoming/Lists tab, press FAB (+) | TaskFormModal placeholder screen opens |",
  "plan_id": "PLAN-PB01",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-PB01-02/verification-d2b19f21eeb5411b91d59cedc5aefe08.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-PB01-02/review-164bb4f47d4f42769aa8326f3a09417b.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-PB01-02/qa-c63e48bca161428fa4eee8aeffa5eadb.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-PB01-02/acceptance-433bb8472be74485b51c2efac6b2fb1f.md",
  "latest_report": ".verified-development-loop/reports/TASK-PB01-02-completed-20261019-1745.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-PB01

**Status:** completed

**Plan:** PLAN-PB01

Thiết lập 4-Tab Navigation (Today, Upcoming, Lists, Settings) và nút tạo nhanh FAB

**Latest report:** .verified-development-loop/reports/TASK-PB01-02-completed-20261019-1745.md

## Test code

### Navigation & FAB Component Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | Verify TabNavigator route configurations | Required |
| Integration | Verify tab navigation and FAB presence/absence per screen | Required |
| E2E | Not applicable | Full device E2E will run in PB-16 on real device/emulator |

### `__tests__/navigation/tabNavigation.test.tsx`

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../../src/app/navigation/RootNavigator';

describe('TabNavigation and Quick Add FAB', () => {
  it('renders 4 tabs: Today, Upcoming, Lists, Settings with accessibility labels', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Upcoming')).toBeTruthy();
    expect(getByText('Lists')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('displays FAB with min 48x48dp touch target and accessibility label on task screens', () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    const fab = getByLabelText('Tạo task mới');
    expect(fab).toBeTruthy();
  });

  it('does not display FAB on Settings screen', () => {
    const { getByText, queryByLabelText } = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Settings'));
    expect(queryByLabelText('Tạo task mới')).toBeNull();
  });

  it('opens TaskFormModal placeholder when tapping FAB', () => {
    const { getByLabelText, getByText } = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);
    expect(getByText(/Task Form Placeholder/i)).toBeTruthy();
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-PB01-02.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB01.md.
- **Environment:** React Native Expo app, React Navigation v7, RNTL.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-03 | Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works. | functional | Launch app root -> inspect bottom tab bar -> switch tab | All 4 tabs present with accessible labels and switching renders corresponding screen |
| QA-04 | Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label "Tạo task mới". | functional | Navigate to Today, Upcoming, or Lists -> find FAB | FAB (+) is present, has accessibilityLabel "Tạo task mới" and minimum 48x48dp touch target |
| QA-05 | Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed. | functional | Switch to Settings tab -> inspect screen | FAB (+) is not present |
| QA-06 | Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens. | functional | On Today/Upcoming/Lists tab, press FAB (+) | TaskFormModal placeholder screen opens |

## Verification

- `npm.cmd test -- tabNavigation`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.
- Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label "Tạo task mới".
- Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.
- Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens.
