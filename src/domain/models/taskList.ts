export interface TaskList {
  id: string;
  name: string;
  color: string;
  icon?: string | null;
  isDefault: boolean;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface CreateTaskListInput {
  name: string;
  color?: string;
  icon?: string | null;
}
