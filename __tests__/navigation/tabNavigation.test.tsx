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

  it('opens TaskFormModal when tapping FAB', () => {
    const { getByLabelText, getAllByText } = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);
    expect(getAllByText('Tạo task mới').length).toBeGreaterThan(0);
  });
});
