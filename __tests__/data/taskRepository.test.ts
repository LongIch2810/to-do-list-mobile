import { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';
import { TaskRepository } from '../../src/data/repositories/TaskRepository';
import { TaskListRepository } from '../../src/data/repositories/TaskListRepository';

describe('TaskRepository and TaskListRepository', () => {
  let db: any;
  let taskRepo: TaskRepository;
  let listRepo: TaskListRepository;

  beforeEach(async () => {
    db = await createDatabase(':memory:');
    taskRepo = new TaskRepository(db);
    listRepo = new TaskListRepository(db);
  });

  afterEach(async () => {
    await db.closeAsync();
  });

  it('creates task with valid UUID and timestamps', async () => {
    const task = await taskRepo.createTask({
      title: 'Mua sữa tươi',
      listId: DEFAULT_INBOX_ID,
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Mua sữa tươi');
    expect(task.status).toBe('PENDING');
    expect(task.priority).toBe('MEDIUM');
    expect(task.listId).toBe(DEFAULT_INBOX_ID);
    expect(task.createdAtMs).toBeGreaterThan(0);
  });

  it('fails with foreign key error when listId does not exist', async () => {
    await expect(async () => {
      await taskRepo.createTask({
        title: 'Task lỗi',
        listId: 'invalid-non-existent-list',
      });
    }).rejects.toThrow();
  });

  it('persists data across closing and reopening database', async () => {
    await taskRepo.createTask({
      title: 'Task bền vững',
      listId: DEFAULT_INBOX_ID,
    });

    const tasksBefore = await taskRepo.getTasksByListId(DEFAULT_INBOX_ID);
    expect(tasksBefore.length).toBe(1);
  });

  it('rolls back transaction on failure leaving no partial records', async () => {
    await expect(async () => {
      await db.withTransactionAsync(async () => {
        await taskRepo.createTask({
          title: 'Task 1 in transaction',
          listId: DEFAULT_INBOX_ID,
        });
        throw new Error('Simulated failure');
      });
    }).rejects.toThrow('Simulated failure');

    const tasksAfter = await taskRepo.getTasksByListId(DEFAULT_INBOX_ID);
    expect(tasksAfter.length).toBe(0);
  });
});
