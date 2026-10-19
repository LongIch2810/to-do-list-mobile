import { DatabaseConnection, DEFAULT_INBOX_ID } from '../local/database';
import { TaskListDao } from '../local/taskListDao';
import { TaskList, CreateTaskListInput } from '../../domain/models/taskList';
import { validateTaskListName } from '../../domain/rules/validation';
import { generateUUID } from '../../core/utils/uuid';

export class TaskListRepository {
  private dao: TaskListDao;

  constructor(private db: DatabaseConnection) {
    this.dao = new TaskListDao(db);
  }

  async createTaskList(input: CreateTaskListInput): Promise<TaskList> {
    const validName = validateTaskListName(input.name);
    const now = Date.now();
    const list: TaskList = {
      id: generateUUID(),
      name: validName,
      color: input.color || '#2563EB',
      icon: input.icon ?? null,
      isDefault: false,
      createdAtMs: now,
      updatedAtMs: now,
    };

    await this.dao.insert(list);
    return list;
  }

  async getTaskListById(id: string): Promise<TaskList | null> {
    return await this.dao.getById(id);
  }

  async getAllTaskLists(): Promise<TaskList[]> {
    return await this.dao.getAll();
  }

  async getDefaultInbox(): Promise<TaskList> {
    const inbox = await this.dao.getDefault();
    if (!inbox) {
      throw new Error('Inbox mặc định chưa được khởi tạo.');
    }
    return inbox;
  }

  async deleteTaskList(id: string): Promise<void> {
    if (id === DEFAULT_INBOX_ID) {
      throw new Error('Không thể xóa danh mục Inbox mặc định.');
    }
    await this.dao.delete(id);
  }
}
