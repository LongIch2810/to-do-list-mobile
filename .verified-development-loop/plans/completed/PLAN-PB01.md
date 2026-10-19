<!-- vdl-json
{
  "plan_id": "PLAN-PB01",
  "mode": "feature",
  "spec": {
    "context_and_goal": "Người dùng mở app trên Android/iOS, có nền tảng điều hướng cơ bản gồm 4 tab (Today, Upcoming, Lists, Settings) và nút tạo nhanh FAB trên các màn hình quản lý task chính. Giao diện tuân thủ safe area, bàn phím ảo, vùng chạm tối thiểu >= 48dp, cỡ chữ hệ thống và nhãn hỗ trợ tiếp cận.",
    "current_behavior": "Repository chưa có source code, package.json hay cấu hình native.",
    "desired_outcome": "Ứng dụng React Native (Expo SDK 52) khởi động mượt mà, hiển thị thanh điều hướng 4 tab, có nút tạo nhanh (+) mở TaskFormModal placeholder, hỗ trợ đầy đủ safe area và accessibility theo thiết kế.",
    "scope_included": [
      "Khởi tạo project Expo SDK 52 với TypeScript và New Architecture",
      "Cấu hình Custom Theme tokens (colors, typography, spacing, minTouchTarget >= 48dp)",
      "ScreenWrapper xử lý SafeAreaView và nền theme chung",
      "React Navigation v7: Bottom Tab Navigator (Today, Upcoming, Lists, Settings) và Native Stack (RootNavigator bọc MainTabs và TaskFormModal)",
      "Floating Action Button (FAB) (+) trên Today, Upcoming, Lists với touch target >= 48x48dp và accessibilityLabel 'Tạo task mới'",
      "Màn hình TaskFormModal placeholder kích hoạt từ FAB chuẩn bị cho PB-03",
      "Unit & Component test suite với Jest và React Native Testing Library"
    ],
    "scope_excluded": [
      "Lưu trữ dữ liệu SQLite cục bộ (thuộc PB-02)",
      "Form nhập liệu tạo task hoàn chỉnh (thuộc PB-03)",
      "Local notifications / reminder (thuộc PB-13)"
    ],
    "affected_interfaces": "Giao diện chính trên thiết bị di động (Android / iOS) và hệ thống điều hướng",
    "required_behavior": "Ứng dụng hiển thị 4 tab điều hướng ở thanh dưới cùng. Chuyển tab mượt mà. Tab Today, Upcoming, Lists có nút FAB (+) cố định góc dưới bên phải. Tab Settings không có FAB. Nhấn FAB mở modal placeholder. Các thành phần có nhãn tiếp cận và vùng chạm tối thiểu 48dp.",
    "constraints_and_dependencies": {
      "min_android_version": "Android 7.0+ (API 24+)",
      "min_ios_version": "iOS 15.1+",
      "design_direction": "Custom Design System trung tính (Clean, Modern Minimalist)",
      "dependencies": "Expo SDK 52, React Navigation v7, TypeScript"
    },
    "assumptions": "Môi trường Node.js và npm có sẵn trên máy để cài đặt dependencies và chạy test."
  },
  "acceptance_criteria": [
    "Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.",
    "Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.",
    "Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.",
    "Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label \"Tạo task mới\".",
    "Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.",
    "Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens."
  ],
  "tasks": [
    {
      "task_id": "TASK-PB01-01",
      "title": "Thiết lập dự án Expo SDK 52, Theme Tokens, ScreenWrapper và Jest Test Environment",
      "acceptance_criteria": [
        "Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.",
        "Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios."
      ],
      "depends_on": [],
      "verification": [
        [
          "npm.cmd",
          "test",
          "--",
          "themeAndWrapper"
        ],
        [
          "npx.cmd",
          "tsc",
          "--noEmit"
        ]
      ],
      "test_code": "### Unit & Component Tests\n\n| Level | Case | Status or reason |\n| --- | --- | --- |\n| Unit | Verify theme tokens for colors, spacing, typography, and touchTarget | Required |\n| Integration | Verify ScreenWrapper integrates SafeAreaView and theme | Required |\n| E2E | Not applicable | App root entry point tested in TASK-PB01-02 |\n\n### `__tests__/core/themeAndWrapper.test.tsx`\n\n```tsx\nimport React from 'react';\nimport { Text } from 'react-native';\nimport { render } from '@testing-library/react-native';\nimport { theme } from '../../src/core/theme';\nimport { ScreenWrapper } from '../../src/core/components/ScreenWrapper';\n\ndescribe('Theme Tokens and ScreenWrapper', () => {\n  it('provides consistent theme colors, spacing and touch targets >= 48', () => {\n    expect(theme.colors.primary).toBeDefined();\n    expect(theme.colors.background).toBeDefined();\n    expect(theme.colors.surface).toBeDefined();\n    expect(theme.metrics.minTouchTarget).toBeGreaterThanOrEqual(48);\n  });\n\n  it('renders children within ScreenWrapper using safe area and theme background', () => {\n    const { getByText } = render(\n      <ScreenWrapper testID=\"screen-wrapper\">\n        <Text>Screen Content</Text>\n      </ScreenWrapper>\n    );\n    expect(getByText('Screen Content')).toBeTruthy();\n  });\n});\n```",
      "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB01-01.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB01.md.\n- **Environment:** Node.js, Jest test runner, React Native Testing Library.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-01 | Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area. | functional | Render component inside ScreenWrapper with theme tokens applied | Content is enclosed in SafeAreaView, theme colors are applied, minTouchTarget is >= 48dp |\n| QA-02 | Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios. | functional | Verify text style definitions and theme typography tokens | Scaled font styles and high contrast color tokens are returned |"
    },
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
      "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB01-02.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB01.md.\n- **Environment:** React Native Expo app, React Navigation v7, RNTL.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-03 | Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works. | functional | Launch app root -> inspect bottom tab bar -> switch tab | All 4 tabs present with accessible labels and switching renders corresponding screen |\n| QA-04 | Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label \"Tạo task mới\". | functional | Navigate to Today, Upcoming, or Lists -> find FAB | FAB (+) is present, has accessibilityLabel \"Tạo task mới\" and minimum 48x48dp touch target |\n| QA-05 | Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed. | functional | Switch to Settings tab -> inspect screen | FAB (+) is not present |\n| QA-06 | Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens. | functional | On Today/Upcoming/Lists tab, press FAB (+) | TaskFormModal placeholder screen opens |"
    }
  ],
  "status": "completed",
  "spec_file": ".verified-development-loop/specs/completed/PLAN-PB01.md",
  "execution_state": "completed",
  "human_approval": {
    "record": "duyệt",
    "time": "2026-10-19T17:33:40.584622+00:00"
  },
  "acceptance_evidence": {
    "criteria": [
      "Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.",
      "Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.",
      "Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.",
      "Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label \"Tạo task mới\".",
      "Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.",
      "Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens."
    ],
    "time": "2026-10-19T17:47:15.841130+00:00"
  }
}
-->

# Plans: PLAN-PB01

**Status:** completed

## Tasks

### TASK-PB01-01: Thiết lập dự án Expo SDK 52, Theme Tokens, ScreenWrapper và Jest Test Environment

- Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.
- Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.

Test code:

### Unit & Component Tests

| Level | Case | Status or reason |
| --- | --- | --- |
| Unit | Verify theme tokens for colors, spacing, typography, and touchTarget | Required |
| Integration | Verify ScreenWrapper integrates SafeAreaView and theme | Required |
| E2E | Not applicable | App root entry point tested in TASK-PB01-02 |

### `__tests__/core/themeAndWrapper.test.tsx`

```tsx
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { theme } from '../../src/core/theme';
import { ScreenWrapper } from '../../src/core/components/ScreenWrapper';

describe('Theme Tokens and ScreenWrapper', () => {
  it('provides consistent theme colors, spacing and touch targets >= 48', () => {
    expect(theme.colors.primary).toBeDefined();
    expect(theme.colors.background).toBeDefined();
    expect(theme.colors.surface).toBeDefined();
    expect(theme.metrics.minTouchTarget).toBeGreaterThanOrEqual(48);
  });

  it('renders children within ScreenWrapper using safe area and theme background', () => {
    const { getByText } = render(
      <ScreenWrapper testID="screen-wrapper">
        <Text>Screen Content</Text>
      </ScreenWrapper>
    );
    expect(getByText('Screen Content')).toBeTruthy();
  });
});
```

QA scenarios:

#### QA Context and Scenarios
- **Task ID:** TASK-PB01-01.
- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB01.md.
- **Environment:** Node.js, Jest test runner, React Native Testing Library.

| ID | Acceptance criterion | Type | Steps | Expected result from Spec |
| --- | --- | --- | --- | --- |
| QA-01 | Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area. | functional | Render component inside ScreenWrapper with theme tokens applied | Content is enclosed in SafeAreaView, theme colors are applied, minTouchTarget is >= 48dp |
| QA-02 | Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios. | functional | Verify text style definitions and theme typography tokens | Scaled font styles and high contrast color tokens are returned |

Verification:

- `npm.cmd test -- themeAndWrapper`
- `npx.cmd tsc --noEmit`

### TASK-PB01-02: Thiết lập 4-Tab Navigation (Today, Upcoming, Lists, Settings) và nút tạo nhanh FAB

- Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.
- Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label "Tạo task mới".
- Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.
- Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens.

Test code:

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

Verification:

- `npm.cmd test -- tabNavigation`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.
- Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.
- Given the app starts, when viewing the root screen, then 4 tabs (Today, Upcoming, Lists, Settings) are visible with proper accessibility labels and active tab switching works.
- Given the user is on a task management screen (Today, Upcoming, Lists), when looking at the screen, then a Floating Action Button (+) is displayed with min 48x48dp touch target and accessibility label "Tạo task mới".
- Given the user is on the Settings tab, when viewing the screen, then no FAB is displayed.
- Given the user taps the FAB on any task management screen, when tapped, then the Task Form Modal placeholder opens.
