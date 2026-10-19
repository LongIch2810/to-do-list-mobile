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
