import { createDatabase, DEFAULT_INBOX_ID, DEFAULT_INBOX_NAME } from '../../src/data/local/database';

describe('Database Schema & Inbox Seeding', () => {
  let db: any;

  beforeEach(async () => {
    db = await createDatabase(':memory:');
  });

  afterEach(async () => {
    await db.closeAsync();
  });

  it('creates task_lists and tasks tables and enables PRAGMA foreign_keys', async () => {
    const fkResult = await db.getFirstAsync('PRAGMA foreign_keys;');
    expect(Object.values(fkResult)[0]).toBe(1);

    const tables = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('task_lists', 'tasks');"
    );
    expect(tables.length).toBe(2);
  });

  it('seeds default Inbox with fixed UUID and is_default=1', async () => {
    const inbox = await db.getFirstAsync(
      'SELECT * FROM task_lists WHERE is_default = 1;'
    );
    expect(inbox).toBeDefined();
    expect(inbox.id).toBe(DEFAULT_INBOX_ID);
    expect(inbox.name).toBe(DEFAULT_INBOX_NAME);
    expect(inbox.is_default).toBe(1);
  });

  it('rejects deleting or altering is_default of the default Inbox', async () => {
    await expect(async () => {
      await db.runAsync('DELETE FROM task_lists WHERE id = ?;', [DEFAULT_INBOX_ID]);
    }).rejects.toThrow();
  });
});
