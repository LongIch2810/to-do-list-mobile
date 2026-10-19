import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../core/components/ScreenWrapper';
import { FloatingActionButton } from '../../../core/components/FloatingActionButton';
import { theme } from '../../../core/theme';
import type { RootStackParamList } from '../../../app/navigation/types';
import { useTaskRepository } from '../../../app/providers/DatabaseContext';
import { useTodayViewModel } from '../hooks/useTodayViewModel';
import { TaskCard } from '../../tasks/components/TaskCard';

export const TodayScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const taskRepository = useTaskRepository();
  const { tasks, toggleTaskComplete } = useTodayViewModel(taskRepository);

  const handleOpenCreateTask = () => {
    navigation.navigate('TaskFormModal');
  };

  return (
    <ScreenWrapper testID="today-screen">
      <View style={styles.header}>
        <Text style={styles.title}>Hôm nay</Text>
      </View>
      <View style={styles.content}>
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.subtitle}>Không có công việc nào đến hạn hôm nay.</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggleComplete={toggleTaskComplete}
              />
            )}
            contentContainerStyle={styles.listContent}
            style={styles.list}
          />
        )}
      </View>
      <FloatingActionButton onPress={handleOpenCreateTask} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.space7,
    paddingVertical: theme.spacing.space5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.space7,
    paddingBottom: 80,
  },
});
