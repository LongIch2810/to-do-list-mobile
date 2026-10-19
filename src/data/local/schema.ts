export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS task_lists (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL CHECK(trim(name) <> '' AND length(name) <= 50),
  color TEXT NOT NULL,
  icon TEXT,
  is_default INTEGER NOT NULL DEFAULT 0 CHECK(is_default IN (0, 1)),
  created_at_ms INTEGER NOT NULL,
  updated_at_ms INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_task_lists_default 
ON task_lists(is_default) WHERE is_default = 1;

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL CHECK(trim(title) <> '' AND length(title) <= 200),
  description TEXT CHECK(description IS NULL OR length(description) <= 5000),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING', 'COMPLETED')),
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK(priority IN ('LOW', 'MEDIUM', 'HIGH')),
  list_id TEXT NOT NULL REFERENCES task_lists(id) ON DELETE RESTRICT,
  due_date TEXT CHECK(due_date IS NULL OR due_date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
  due_time_minutes INTEGER CHECK(
    due_time_minutes IS NULL OR 
    (due_date IS NOT NULL AND due_time_minutes >= 0 AND due_time_minutes <= 1439)
  ),
  reminder_at_ms INTEGER,
  completed_at_ms INTEGER CHECK(
    (status = 'COMPLETED' AND completed_at_ms IS NOT NULL) OR 
    (status = 'PENDING' AND completed_at_ms IS NULL)
  ),
  created_at_ms INTEGER NOT NULL,
  updated_at_ms INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tasks_status_due ON tasks(status, due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_list_status ON tasks(list_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_completed_at ON tasks(completed_at_ms);

CREATE TRIGGER IF NOT EXISTS trg_prevent_delete_default_inbox
BEFORE DELETE ON task_lists
FOR EACH ROW
WHEN OLD.is_default = 1
BEGIN
  SELECT RAISE(ABORT, 'Không thể xóa danh mục Inbox mặc định.');
END;

CREATE TRIGGER IF NOT EXISTS trg_prevent_update_default_inbox
BEFORE UPDATE OF is_default ON task_lists
FOR EACH ROW
WHEN OLD.is_default = 1 AND NEW.is_default <> 1
BEGIN
  SELECT RAISE(ABORT, 'Không thể hủy cờ mặc định của Inbox.');
END;
`;
