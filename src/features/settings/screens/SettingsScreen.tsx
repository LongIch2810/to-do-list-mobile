import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../../../core/components/ScreenWrapper';
import { theme } from '../../../core/theme';

export const SettingsScreen: React.FC = () => {
  return (
    <ScreenWrapper testID="settings-screen">
      <View style={styles.header}>
        <Text style={styles.title}>Cài đặt</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Thông tin ứng dụng</Text>
        <Text style={styles.infoText}>Todo Mobile — Bản địa hóa offline</Text>
        <Text style={styles.infoText}>Phiên bản: 1.0.0 (MVP)</Text>
      </View>
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
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
});
