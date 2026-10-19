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
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space3,
  },
  infoText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.space1,
    lineHeight: theme.typography.lineHeights.base,
  },
});
