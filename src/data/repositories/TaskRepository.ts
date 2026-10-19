import { DatabaseConnection, DEFAULT_INBOX_ID } from '../local/database';
import { TaskDao } from '../local/taskDao';
import { Task, CreateTaskInput, UpdateTaskInput } from '../../domain/models/task';
import {
  validateTaskTitle,
  validateTaskDescription,
  validateDueDateTime,
} from '../../domain/rules/validation';
import { generateUUID } from '../../core/utils/uuid';

export class TaskRepository {
  private dao: TaskDao;
  private listeners: Set<() => void> = new Set();

  constructor(private db: DatabaseConnection) {
    this.dao = new TaskDao(db);
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        // Safe execution of observer callback
      }
    });
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const title = validateTaskTitle(input.title);
    const description = validateTaskDescription(input.description);
    validateDueDateTime(input.dueDate, input.dueTimeMinutes);

    const now = Date.now();
    const task: Task = {
      id: generateUUID(),
      title,
      description,
      status: 'PENDING',
      priority: input.priority || 'MEDIUM',
      listId: input.listId || DEFAULT_INBOX_ID,
      dueDate: input.dueDate ?? null,
      dueTimeMinutes: input.dueTimeMinutes ?? null,
      reminderAtMs: input.reminderAtMs ?? null,
      completedAtMs: null,
      createdAtMs: now,
      updatedAtMs: now,
    };

    await this.dao.insert(task);
    this.notify();
    return task;
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.dao.getById(id);
  }

  async getTasksByListId(listId: string): Promise<Task[]> {
    return await this.dao.getByListId(listId);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.dao.getAll();
  }

  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    const existing = await this.dao.getById(id);
    if (!existing) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    const title = input.title !== undefined ? validateTaskTitle(input.title) : existing.title;
    const description =
      input.description !== undefined ? validateTaskDescription(input.description) : existing.description;
    
    const dueDate = input.dueDate !== undefined ? input.dueDate : existing.dueDate;
    const dueTimeMinutes = input.dueTimeMinutes !== undefined ? input.dueTimeMinutes : existing.dueTimeMinutes;
    validateDueDateTime(dueDate, dueTimeMinutes);

    const status = input.status !== undefined ? input.status : existing.status;
    const now = Date.now();
    let completedAtMs = existing.completedAtMs;

    if (status === 'COMPLETED' && existing.status !== 'COMPLETED') {
      completedAtMs = now;
    } else if (status === 'PENDING' && existing.status !== 'PENDING') {
      completedAtMs = null;
    }

    const updatedTask: Task = {
      ...existing,
      title,
      description,
      status,
      priority: input.priority !== undefined ? input.priority : existing.priority,
      listId: input.listId !== undefined ? input.listId : existing.listId,
      dueDate: dueDate ?? null,
      dueTimeMinutes: dueTimeMinutes ?? null,
      reminderAtMs: input.reminderAtMs !== undefined ? input.reminderAtMs : existing.reminderAtMs,
      completedAtMs,
      updatedAtMs: now,
    };

    await this.dao.update(updatedTask);
    this.notify();
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    await this.dao.delete(id);
    this.notify();
  }
}
