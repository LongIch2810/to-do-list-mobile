import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../core/components/ScreenWrapper';
import { FloatingActionButton } from '../../../core/components/FloatingActionButton';
import { theme } from '../../../core/theme';
import type { RootStackParamList } from '../../../app/navigation/types';

export const ListsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenCreateTask = () => {
    navigation.navigate('TaskFormModal');
  };

  return (
    <ScreenWrapper testID="lists-screen">
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Hộp thư đến (Inbox)</Text>
      </View>
      <FloatingActionButton onPress={handleOpenCreateTask} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.space7,
    paddingVertical: theme.spacing.space5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.md,
  },
});
