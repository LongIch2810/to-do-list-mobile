import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/RootNavigator';

import { DatabaseProvider } from './providers/DatabaseContext';
import { TaskRepository } from '../data/repositories/TaskRepository';
import { TaskListRepository } from '../data/repositories/TaskListRepository';
import { DatabaseConnection } from '../data/local/database';

const defaultInitialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export interface AppProps {
  initialMetrics?: any;
  db?: DatabaseConnection;
  taskRepository?: TaskRepository;
  taskListRepository?: TaskListRepository;
}

export const App: React.FC<AppProps> = ({
  initialMetrics = defaultInitialMetrics,
  db,
  taskRepository,
  taskListRepository,
}) => {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <DatabaseProvider db={db} taskRepository={taskRepository} taskListRepository={taskListRepository}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <RootNavigator />
        </NavigationContainer>
      </DatabaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
