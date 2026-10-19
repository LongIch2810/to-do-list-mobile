import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../core/components/ScreenWrapper';
import { FloatingActionButton } from '../../../core/components/FloatingActionButton';
import { theme } from '../../../core/theme';
import type { RootStackParamList } from '../../../app/navigation/types';

export const UpcomingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenCreateTask = () => {
    navigation.navigate('TaskFormModal');
  };

  return (
    <ScreenWrapper testID="upcoming-screen">
      <View style={styles.header}>
        <Text style={styles.title}>Sắp tới</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Không có công việc nào trong tương lai.</Text>
      </View>
      <FloatingActionButton onPress={handleOpenCreateTask} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
