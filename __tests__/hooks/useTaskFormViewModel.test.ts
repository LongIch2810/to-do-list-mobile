import { renderHook, act } from '@testing-library/react-native';
import { useTaskFormViewModel } from '../../src/features/tasks/hooks/useTaskFormViewModel';
import { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';
import { TaskRepository } from '../../src/data/repositories/TaskRepository';

describe('useTaskFormViewModel', () => {
  let db: any;
  let taskRepo: TaskRepository;

  beforeEach(async () => {
    db = await createDatabase(':memory:');
    taskRepo = new TaskRepository(db);
  });

  afterEach(async () => {
    await db.closeAsync();
  });

  it('creates task with default Pending, Medium and Inbox when valid title provided', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('Mua bánh mì');
    });

    let savedTask: any = null;
    await act(async () => {
      savedTask = await result.current.handleSave();
    });

    expect(savedTask).toBeDefined();
    expect(savedTask.title).toBe('Mua bánh mì');
    expect(savedTask.status).toBe('PENDING');
    expect(savedTask.priority).toBe('MEDIUM');
    expect(savedTask.listId).toBe(DEFAULT_INBOX_ID);
  });

  it('sets validation error and does not create task when title is empty', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('   ');
    });

    let savedTask: any = null;
    await act(async () => {
      savedTask = await result.current.handleSave();
    });

    expect(savedTask).toBeNull();
    expect(result.current.errorMessage).toBe('Tiêu đề không được để trống.');
  });

  it('sets validation error when title exceeds 200 chars', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('a'.repeat(201));
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(result.current.errorMessage).toBe('Tiêu đề không được vượt quá 200 ký tự.');
  });

  it('prevents double-submit when save is triggered repeatedly while saving', async () => {
    const { result } = renderHook(() => useTaskFormViewModel(taskRepo));

    act(() => {
      result.current.setTitle('Task chống click đúp');
    });

    let firstSave: any;
    let secondSave: any;

    await act(async () => {
      firstSave = result.current.handleSave();
      secondSave = result.current.handleSave();
      await Promise.all([firstSave, secondSave]);
    });

    const allTasks = await taskRepo.getAllTasks();
    expect(allTasks.length).toBe(1);
  });
});
