import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodayScreen } from '../../features/today/screens/TodayScreen';
import { UpcomingScreen } from '../../features/upcoming/screens/UpcomingScreen';
import { ListsScreen } from '../../features/lists/screens/ListsScreen';
import { SettingsScreen } from '../../features/settings/screens/SettingsScreen';
import { theme } from '../../core/theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.sizes.xs,
          fontWeight: theme.typography.weights.medium,
        },
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarAccessibilityLabel: 'Tab Hôm nay (Today)',
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={UpcomingScreen}
        options={{
          tabBarLabel: 'Upcoming',
          tabBarAccessibilityLabel: 'Tab Sắp tới (Upcoming)',
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          tabBarLabel: 'Lists',
          tabBarAccessibilityLabel: 'Tab Danh sách (Lists)',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarAccessibilityLabel: 'Tab Cài đặt (Settings)',
        }}
      />
    </Tab.Navigator>
  );
};
