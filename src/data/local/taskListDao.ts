import { DatabaseConnection, DEFAULT_INBOX_ID } from './database';
import { TaskList } from '../../domain/models/taskList';

export interface TaskListRow {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  is_default: number;
  created_at_ms: number;
  updated_at_ms: number;
}

export function mapRowToTaskList(row: TaskListRow): TaskList {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    icon: row.icon,
    isDefault: row.is_default === 1,
    createdAtMs: row.created_at_ms,
    updatedAtMs: row.updated_at_ms,
  };
}

export class TaskListDao {
  constructor(private db: DatabaseConnection) {}

  async getById(id: string): Promise<TaskList | null> {
    const row = await this.db.getFirstAsync<TaskListRow>(
      'SELECT * FROM task_lists WHERE id = ?;',
      [id]
    );
    return row ? mapRowToTaskList(row) : null;
  }

  async getAll(): Promise<TaskList[]> {
    const rows = await this.db.getAllAsync<TaskListRow>(
      'SELECT * FROM task_lists ORDER BY is_default DESC, name ASC;'
    );
    return rows.map(mapRowToTaskList);
  }

  async getDefault(): Promise<TaskList | null> {
    const row = await this.db.getFirstAsync<TaskListRow>(
      'SELECT * FROM task_lists WHERE is_default = 1;'
    );
    return row ? mapRowToTaskList(row) : null;
  }

  async insert(list: TaskList): Promise<void> {
    await this.db.runAsync(
      `INSERT INTO task_lists (id, name, color, icon, is_default, created_at_ms, updated_at_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        list.id,
        list.name,
        list.color,
        list.icon ?? null,
        list.isDefault ? 1 : 0,
        list.createdAtMs,
        list.updatedAtMs,
      ]
    );
  }

  async update(list: TaskList): Promise<void> {
    await this.db.runAsync(
      `UPDATE task_lists 
       SET name = ?, color = ?, icon = ?, is_default = ?, updated_at_ms = ?
       WHERE id = ?;`,
      [
        list.name,
        list.color,
        list.icon ?? null,
        list.isDefault ? 1 : 0,
        list.updatedAtMs,
        list.id,
      ]
    );
  }

  async delete(id: string): Promise<void> {
    if (id === DEFAULT_INBOX_ID) {
      throw new Error('Không thể xóa danh mục Inbox mặc định.');
    }
    await this.db.runAsync('DELETE FROM task_lists WHERE id = ?;', [id]);
  }
}
