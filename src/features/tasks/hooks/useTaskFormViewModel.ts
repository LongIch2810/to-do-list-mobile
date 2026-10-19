import { useState, useRef } from 'react';
import { TaskRepository } from '../../../data/repositories/TaskRepository';
import { Task } from '../../../domain/models/task';
import { ValidationError, validateTaskTitle, validateTaskDescription } from '../../../domain/rules/validation';

export function useTaskFormViewModel(taskRepository: TaskRepository) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Ref để chặn double-submit synchronous ngay lập tức
  const isSavingRef = useRef(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setErrorMessage(null);
    setIsSaving(false);
    isSavingRef.current = false;
  };

  const handleSave = async (onSuccess?: (task: Task) => void): Promise<Task | null> => {
    if (isSavingRef.current) {
      return null;
    }

    try {
      const validTitle = validateTaskTitle(title);
      const validDesc = validateTaskDescription(description);

      isSavingRef.current = true;
      setIsSaving(true);
      setErrorMessage(null);

      const task = await taskRepository.createTask({
        title: validTitle,
        description: validDesc,
      });

      if (onSuccess) {
        onSuccess(task);
      }

      return task;
    } catch (err: any) {
      if (err instanceof ValidationError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(err.message || 'Lỗi lưu công việc.');
      }
      return null;
    } finally {
      setIsSaving(false);
      isSavingRef.current = false;
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    isSaving,
    errorMessage,
    handleSave,
    resetForm,
  };
}
