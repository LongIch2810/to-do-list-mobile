import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { DatabaseConnection, createDatabase, getSharedDatabase } from '../../data/local/database';
import { TaskRepository } from '../../data/repositories/TaskRepository';
import { TaskListRepository } from '../../data/repositories/TaskListRepository';

interface DatabaseContextValue {
  db: DatabaseConnection;
  taskRepository: TaskRepository;
  taskListRepository: TaskListRepository;
  isReady: boolean;
}

const DatabaseContext = createContext<DatabaseContextValue | null>(null);

export interface DatabaseProviderProps {
  children: React.ReactNode;
  db?: DatabaseConnection;
  taskRepository?: TaskRepository;
  taskListRepository?: TaskListRepository;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
  db: propDb,
  taskRepository: propTaskRepo,
  taskListRepository: propListRepo,
}) => {
  // Use synchronous shared DB as instant initial fallback
  const initialDb = propDb ?? getSharedDatabase();
  const [db, setDb] = useState<DatabaseConnection>(initialDb);
  const [isReady, setIsReady] = useState(true);

  const taskRepo = useMemo(() => {
    return propTaskRepo ?? new TaskRepository(db);
  }, [propTaskRepo, db]);

  const listRepo = useMemo(() => {
    return propListRepo ?? new TaskListRepository(db);
  }, [propListRepo, db]);

  useEffect(() => {
    let isMounted = true;
    const isNodeOrJest = typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined;
    
    // In production mobile environment, ensure native SQLite is initialized
    if (!isNodeOrJest && !propDb) {
      createDatabase('todo.db')
        .then((nativeDb) => {
          if (isMounted) {
            setDb(nativeDb);
            setIsReady(true);
          }
        })
        .catch((err) => {
          console.error('Failed to initialize native database:', err);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [propDb]);

  const value = useMemo(
    () => ({
      db,
      taskRepository: taskRepo,
      taskListRepository: listRepo,
      isReady,
    }),
    [db, taskRepo, listRepo, isReady]
  );

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

let sharedTaskRepoInstance: TaskRepository | null = null;
let sharedTaskListRepoInstance: TaskListRepository | null = null;

export function getSharedTaskRepository(): TaskRepository {
  if (!sharedTaskRepoInstance) {
    const db = getSharedDatabase();
    sharedTaskRepoInstance = new TaskRepository(db);
  }
  return sharedTaskRepoInstance;
}

export function getSharedTaskListRepository(): TaskListRepository {
  if (!sharedTaskListRepoInstance) {
    const db = getSharedDatabase();
    sharedTaskListRepoInstance = new TaskListRepository(db);
  }
  return sharedTaskListRepoInstance;
}

export function useDatabase(): DatabaseConnection {
  const context = useContext(DatabaseContext);
  if (!context) {
    return getSharedDatabase();
  }
  return context.db;
}

export function useTaskRepository(): TaskRepository {
  const context = useContext(DatabaseContext);
  if (!context) {
    return getSharedTaskRepository();
  }
  return context.taskRepository;
}

export function useTaskListRepository(): TaskListRepository {
  const context = useContext(DatabaseContext);
  if (!context) {
    return getSharedTaskListRepository();
  }
  return context.taskListRepository;
}
