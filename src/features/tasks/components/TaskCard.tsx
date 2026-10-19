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
  HIGH: { text: 'Cao', bg: theme.colors.errorBg, color: theme.colors.error },
  MEDIUM: { text: 'Vừa', bg: theme.colors.warningBg, color: '#B45309' },
  LOW: { text: 'Thấp', bg: theme.colors.primaryLight, color: theme.colors.primary },
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
    borderRadius: theme.metrics.borderRadius.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.space3,
    paddingHorizontal: theme.spacing.space7,
    marginBottom: theme.spacing.space3,
    ...theme.shadows.shadow1,
  },
  cardCompleted: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.borderLight,
    opacity: 0.75,
  },
  checkboxTouchTarget: {
    minWidth: theme.metrics.minTouchTarget,
    minHeight: theme.metrics.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.space3,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
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
    paddingVertical: theme.spacing.space1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.space3,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textTertiary,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textTertiary,
  },
  priorityBadge: {
    paddingHorizontal: theme.spacing.space2,
    paddingVertical: 2,
    borderRadius: theme.metrics.borderRadius.xs,
  },
  priorityText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
  },
});
