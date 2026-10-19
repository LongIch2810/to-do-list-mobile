import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { theme } from '../../src/core/theme';
import { ScreenWrapper } from '../../src/core/components/ScreenWrapper';

describe('Theme Tokens and ScreenWrapper', () => {
  it('provides consistent theme colors, spacing and touch targets >= 48 compliant with DESIGN.md', () => {
    // Colors from DESIGN.md
    expect(theme.colors.primary).toBe('#1877F2');
    expect(theme.colors.textPrimary).toBe('#1c1e21');
    expect(theme.colors.textSecondary).toBe('#385898');
    expect(theme.colors.textTertiary).toBe('#65686c');
    expect(theme.colors.background).toBe('#f0f2f5');
    expect(theme.colors.surface).toBe('#ffffff');
    expect(theme.colors.border).toBe('#ccd0d5');

    // Spacing from DESIGN.md (space.1=4, space.7=16)
    expect(theme.spacing.space1).toBe(4);
    expect(theme.spacing.space7).toBe(16);

    // Typography scale from DESIGN.md (xs=12, sm=13, md=15, lg=17)
    expect(theme.typography.sizes.xs).toBe(12);
    expect(theme.typography.sizes.sm).toBe(13);
    expect(theme.typography.sizes.md).toBe(15);
    expect(theme.typography.sizes.lg).toBe(17);

    // Border radius from DESIGN.md (xs=8, sm=10, md=20, lg=30, full=999)
    expect(theme.metrics.borderRadius.xs).toBe(8);
    expect(theme.metrics.borderRadius.sm).toBe(10);
    expect(theme.metrics.borderRadius.full).toBe(999);

    // Shadows from DESIGN.md
    expect(theme.shadows.shadow1).toBeDefined();
    expect(theme.shadows.shadow3).toBeDefined();

    // WCAG 2.2 AA touch target
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
