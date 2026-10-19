import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task, TaskPriority } from '../../../domain/models/task';
import { theme } from '../../../core/theme';

export interface TaskCardProps {
  task: Task;
  onPress?: (task: Task) => void;
  onToggleComplete?: (task: Task) => void;
  testID?: string;
}

const PRIORITY_LABELS: Record<TaskPriority, { text: string; bg: string; color: string }> = {
  HIGH: { text: 'Cao', bg: '#FEE2E2', color: '#DC2626' },
  MEDIUM: { text: 'Vừa', bg: '#FEF3C7', color: '#D97706' },
  LOW: { text: 'Thấp', bg: '#DBEAFE', color: '#2563EB' },
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onToggleComplete,
  testID,
}) => {
  const isCompleted = task.status === 'COMPLETED';
  const priorityInfo = PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.MEDIUM;

  const handleToggle = () => {
    onToggleComplete?.(task);
  };

  const handlePress = () => {
    onPress?.(task);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={!onPress}
      testID={testID || `task-card-${task.id}`}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Công việc: ${task.title}`}
      style={[styles.card, isCompleted && styles.cardCompleted]}
    >
      <TouchableOpacity
        onPress={handleToggle}
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityLabel={`Đánh dấu ${isCompleted ? 'chưa hoàn thành' : 'hoàn thành'}: ${task.title}`}
        accessibilityState={{ checked: isCompleted }}
        style={styles.checkboxTouchTarget}
      >
        <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, isCompleted && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          {task.priority !== 'MEDIUM' && (
            <View style={[styles.priorityBadge, { backgroundColor: priorityInfo.bg }]}>
              <Text style={[styles.priorityText, { color: priorityInfo.color }]}>
                {priorityInfo.text}
              </Text>
            </View>
          )}
        </View>

        {!!task.description && (
          <Text
            style={[styles.description, isCompleted && styles.descriptionCompleted]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.metrics.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardCompleted: {
    backgroundColor: '#F9FAFB',
    opacity: 0.8,
  },
  checkboxTouchTarget: {
    minWidth: theme.metrics.minTouchTarget,
    minHeight: theme.metrics.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: theme.typography.weights.bold,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  priorityBadge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.metrics.borderRadius.sm,
  },
  priorityText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
  },
});
