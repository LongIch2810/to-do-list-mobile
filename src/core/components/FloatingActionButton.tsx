import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../theme';

export interface FloatingActionButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  style,
  testID = 'fab-add-task',
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Tạo task mới"
      accessibilityHint="Nhấn để mở form tạo task mới"
      style={[styles.fab, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.plusIcon}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.metrics.minTouchTarget,
    minHeight: theme.metrics.minTouchTarget,
    ...theme.shadows.shadow3,
  },
  plusIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: theme.typography.weights.medium,
    textAlign: 'center',
  },
});
