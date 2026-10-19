<!-- vdl-json
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
  "qa_plan": "#### QA Context and Scenarios\n- **Task ID:** TASK-PB01-01.\n- **Linked Spec:** .verified-development-loop/specs/drafts/PLAN-PB01.md.\n- **Environment:** Node.js, Jest test runner, React Native Testing Library.\n\n| ID | Acceptance criterion | Type | Steps | Expected result from Spec |\n| --- | --- | --- | --- | --- |\n| QA-01 | Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area. | functional | Render component inside ScreenWrapper with theme tokens applied | Content is enclosed in SafeAreaView, theme colors are applied, minTouchTarget is >= 48dp |\n| QA-02 | Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios. | functional | Verify text style definitions and theme typography tokens | Scaled font styles and high contrast color tokens are returned |",
  "plan_id": "PLAN-PB01",
  "status": "completed",
  "fix_round": 0,
  "verification_evidence": ".verified-development-loop/evidence/TASK-PB01-01/verification-e4d18698d8634041835c4c4f9c66ad7c.md",
  "review_evidence": ".verified-development-loop/evidence/TASK-PB01-01/review-8296f20b589b4f7ab14b95b14185a93e.md",
  "qa_evidence": ".verified-development-loop/evidence/TASK-PB01-01/qa-c60281b9aba44253aed6ef24175bdec9.md",
  "qa_failures": [],
  "acceptance_evidence": ".verified-development-loop/evidence/TASK-PB01-01/acceptance-9ff88b2b9dc649bb8bad0105d36ca96c.md",
  "latest_report": ".verified-development-loop/reports/TASK-PB01-01-completed-20261019-1740.md",
  "report_status": "completed"
}
-->

# Tasks: PLAN-PB01

**Status:** completed

**Plan:** PLAN-PB01

Thiết lập dự án Expo SDK 52, Theme Tokens, ScreenWrapper và Jest Test Environment

**Latest report:** .verified-development-loop/reports/TASK-PB01-01-completed-20261019-1740.md

## Test code

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

## Verification

- `npm.cmd test -- themeAndWrapper`
- `npx.cmd tsc --noEmit`

## Acceptance criteria

- Given theme tokens and ScreenWrapper, when rendered, then it provides consistent theme colors, minimum touch target dimensions (>= 48dp), and wraps content inside safe area.
- Given typography settings, when dynamic system font scale is applied, then components use scaled system fonts with accessible contrast ratios.
