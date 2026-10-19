import { DatabaseConnection } from './database';
import { Task, TaskPriority, TaskStatus } from '../../domain/models/task';

export interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  list_id: string;
  due_date: string | null;
  due_time_minutes: number | null;
  reminder_at_ms: number | null;
  completed_at_ms: number | null;
  created_at_ms: number;
  updated_at_ms: number;
}

export function mapRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    listId: row.list_id,
    dueDate: row.due_date,
    dueTimeMinutes: row.due_time_minutes,
    reminderAtMs: row.reminder_at_ms,
    completedAtMs: row.completed_at_ms,
    createdAtMs: row.created_at_ms,
    updatedAtMs: row.updated_at_ms,
  };
}

export class TaskDao {
  constructor(private db: DatabaseConnection) {}

  async getById(id: string): Promise<Task | null> {
    const row = await this.db.getFirstAsync<TaskRow>(
      'SELECT * FROM tasks WHERE id = ?;',
      [id]
    );
    return row ? mapRowToTask(row) : null;
  }

  async getByListId(listId: string): Promise<Task[]> {
    const rows = await this.db.getAllAsync<TaskRow>(
      'SELECT * FROM tasks WHERE list_id = ? ORDER BY created_at_ms DESC;',
      [listId]
    );
    return rows.map(mapRowToTask);
  }

  async getAll(): Promise<Task[]> {
    const rows = await this.db.getAllAsync<TaskRow>(
      'SELECT * FROM tasks ORDER BY created_at_ms DESC;'
    );
    return rows.map(mapRowToTask);
  }

  async insert(task: Task): Promise<void> {
    await this.db.runAsync(
      `INSERT INTO tasks (
        id, title, description, status, priority, list_id,
        due_date, due_time_minutes, reminder_at_ms, completed_at_ms,
        created_at_ms, updated_at_ms
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        task.id,
        task.title,
        task.description ?? null,
        task.status,
        task.priority,
        task.listId,
        task.dueDate ?? null,
        task.dueTimeMinutes ?? null,
        task.reminderAtMs ?? null,
        task.completedAtMs ?? null,
        task.createdAtMs,
        task.updatedAtMs,
      ]
    );
  }

  async update(task: Task): Promise<void> {
    await this.db.runAsync(
      `UPDATE tasks SET
        title = ?, description = ?, status = ?, priority = ?, list_id = ?,
        due_date = ?, due_time_minutes = ?, reminder_at_ms = ?, completed_at_ms = ?,
        updated_at_ms = ?
       WHERE id = ?;`,
      [
        task.title,
        task.description ?? null,
        task.status,
        task.priority,
        task.listId,
        task.dueDate ?? null,
        task.dueTimeMinutes ?? null,
        task.reminderAtMs ?? null,
        task.completedAtMs ?? null,
        task.updatedAtMs,
        task.id,
      ]
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
  }
}
