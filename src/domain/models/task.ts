export type TaskStatus = 'PENDING' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  listId: string;
  dueDate?: string | null; // ISO YYYY-MM-DD
  dueTimeMinutes?: number | null; // 0..1439
  reminderAtMs?: number | null;
  completedAtMs?: number | null;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  priority?: TaskPriority;
  listId?: string;
  dueDate?: string | null;
  dueTimeMinutes?: number | null;
  reminderAtMs?: number | null;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  listId?: string;
  dueDate?: string | null;
  dueTimeMinutes?: number | null;
  reminderAtMs?: number | null;
}
