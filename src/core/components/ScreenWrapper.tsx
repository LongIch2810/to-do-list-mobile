import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { theme } from '../theme';

export interface ScreenWrapperProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  testID,
  edges = ['top', 'left', 'right'],
  ...rest
}) => {
  return (
    <SafeAreaView
      testID={testID}
      style={[styles.container, style]}
      edges={edges}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
