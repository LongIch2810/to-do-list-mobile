import { useState, useEffect, useCallback } from 'react';
import { Task } from '../../../domain/models/task';
import { TaskRepository } from '../../../data/repositories/TaskRepository';

export function useTodayViewModel(taskRepository: TaskRepository) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allTasks = await taskRepository.getAllTasks();
      
      // Sort tasks: pending first, then by createdAt desc
      const sorted = [...allTasks].sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === 'PENDING' ? -1 : 1;
        }
        return b.createdAtMs - a.createdAtMs;
      });

      setTasks(sorted);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải danh sách công việc.');
    } finally {
      setIsLoading(false);
    }
  }, [taskRepository]);

  const toggleTaskComplete = useCallback(
    async (task: Task) => {
      try {
        const nextStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
        await taskRepository.updateTask(task.id, { status: nextStatus });
      } catch (err: any) {
        setError(err?.message || 'Không thể cập nhật trạng thái công việc.');
      }
    },
    [taskRepository]
  );

  useEffect(() => {
    loadTasks();
    const unsubscribe = taskRepository.subscribe(() => {
      loadTasks();
    });

    return () => {
      unsubscribe();
    };
  }, [taskRepository, loadTasks]);

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    toggleTaskComplete,
  };
}
