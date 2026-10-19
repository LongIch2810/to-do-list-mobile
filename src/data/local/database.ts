import { SCHEMA_SQL } from './schema';

export const DEFAULT_INBOX_ID = '00000000-0000-0000-0000-000000000001';
export const DEFAULT_INBOX_NAME = 'Hộp thư đến';
export const DEFAULT_INBOX_COLOR = '#2563EB';

export interface DatabaseConnection {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, params?: any[]): Promise<{ changes: number; lastInsertRowId: number }>;
  getFirstAsync<T>(sql: string, params?: any[]): Promise<T | null>;
  getAllAsync<T>(sql: string, params?: any[]): Promise<T[]>;
  withTransactionAsync<T>(action: () => Promise<T>): Promise<T>;
  closeAsync(): Promise<void>;
}

class BetterSqliteWrapper implements DatabaseConnection {
  private db: any;

  constructor(dbPath: string = ':memory:') {
    // Dynamic require for Node/Jest environment
    const Database = require('better-sqlite3');
    this.db = new Database(dbPath);
  }

  async execAsync(sql: string): Promise<void> {
    this.db.exec(sql);
  }

  async runAsync(sql: string, params: any[] = []): Promise<{ changes: number; lastInsertRowId: number }> {
    const stmt = this.db.prepare(sql);
    const info = stmt.run(...params);
    return {
      changes: info.changes,
      lastInsertRowId: Number(info.lastInsertRowid),
    };
  }

  async getFirstAsync<T>(sql: string, params: any[] = []): Promise<T | null> {
    const stmt = this.db.prepare(sql);
    const row = stmt.get(...params);
    return (row as T) || null;
  }

  async getAllAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
    const stmt = this.db.prepare(sql);
    return stmt.all(...params) as T[];
  }

  async withTransactionAsync<T>(action: () => Promise<T>): Promise<T> {
    this.db.exec('BEGIN TRANSACTION;');
    try {
      const result = await action();
      this.db.exec('COMMIT;');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK;');
      throw error;
    }
  }

  async closeAsync(): Promise<void> {
    this.db.close();
  }
}

class ExpoSqliteWrapper implements DatabaseConnection {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async execAsync(sql: string): Promise<void> {
    await this.db.execAsync(sql);
  }

  async runAsync(sql: string, params: any[] = []): Promise<{ changes: number; lastInsertRowId: number }> {
    return await this.db.runAsync(sql, params);
  }

  async getFirstAsync<T>(sql: string, params: any[] = []): Promise<T | null> {
    return await this.db.getFirstAsync(sql, params);
  }

  async getAllAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
    return await this.db.getAllAsync(sql, params);
  }

  async withTransactionAsync<T>(action: () => Promise<T>): Promise<T> {
    return await this.db.withTransactionAsync(action);
  }

  async closeAsync(): Promise<void> {
    await this.db.closeAsync();
  }
}

export async function createDatabase(dbPath: string = 'todo.db'): Promise<DatabaseConnection> {
  const isNodeOrJest = typeof process !== 'undefined' && (process.env.JEST_WORKER_ID !== undefined || dbPath === ':memory:');

  let connection: DatabaseConnection;

  if (isNodeOrJest) {
    connection = new BetterSqliteWrapper(dbPath);
  } else {
    const SQLite = require('expo-sqlite');
    const nativeDb = await SQLite.openDatabaseAsync(dbPath);
    connection = new ExpoSqliteWrapper(nativeDb);
  }

  // 1. Enable foreign keys
  await connection.execAsync('PRAGMA foreign_keys = ON;');

  // 2. Initialize schema
  await connection.execAsync(SCHEMA_SQL);

  // 3. Seed default Inbox if not exists
  const now = Date.now();
  await connection.runAsync(
    `INSERT OR IGNORE INTO task_lists (id, name, color, icon, is_default, created_at_ms, updated_at_ms)
     VALUES (?, ?, ?, ?, 1, ?, ?);`,
    [DEFAULT_INBOX_ID, DEFAULT_INBOX_NAME, DEFAULT_INBOX_COLOR, 'inbox', now, now]
  );

  // 4. Set schema version
  await connection.execAsync('PRAGMA user_version = 1;');

  return connection;
}

export function createDatabaseSync(dbPath: string = ':memory:'): DatabaseConnection {
  const connection = new BetterSqliteWrapper(dbPath);
  connection.execAsync('PRAGMA foreign_keys = ON;');
  connection.execAsync(SCHEMA_SQL);
  const now = Date.now();
  connection.runAsync(
    `INSERT OR IGNORE INTO task_lists (id, name, color, icon, is_default, created_at_ms, updated_at_ms)
     VALUES (?, ?, ?, ?, 1, ?, ?);`,
    [DEFAULT_INBOX_ID, DEFAULT_INBOX_NAME, DEFAULT_INBOX_COLOR, 'inbox', now, now]
  );
  connection.execAsync('PRAGMA user_version = 1;');
  return connection;
}

let sharedDatabaseInstance: DatabaseConnection | null = null;

export function getSharedDatabase(): DatabaseConnection {
  if (!sharedDatabaseInstance) {
    sharedDatabaseInstance = createDatabaseSync(':memory:');
  }
  return sharedDatabaseInstance;
}

export function setSharedDatabase(db: DatabaseConnection | null): void {
  sharedDatabaseInstance = db;
}

export function resetSharedDatabase(): void {
  sharedDatabaseInstance = null;
}
