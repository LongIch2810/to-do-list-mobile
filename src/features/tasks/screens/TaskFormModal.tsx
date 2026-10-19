import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../../core/components/ScreenWrapper';
import { theme } from '../../../core/theme';
import { useTaskRepository } from '../../../app/providers/DatabaseContext';
import { useTaskFormViewModel } from '../hooks/useTaskFormViewModel';

export const TaskFormModal: React.FC = () => {
  const navigation = useNavigation();
  const taskRepository = useTaskRepository();
  const {
    title,
    setTitle,
    description,
    setDescription,
    isSaving,
    errorMessage,
    handleSave,
  } = useTaskFormViewModel(taskRepository);

  const onSubmit = async () => {
    await handleSave(() => {
      navigation.goBack();
    });
  };

  return (
    <ScreenWrapper testID="task-form-modal">
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Đóng modal"
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Tạo task mới</Text>

          <TouchableOpacity
            onPress={onSubmit}
            disabled={isSaving}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Lưu task"
            accessibilityState={{ disabled: isSaving, busy: isSaving }}
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          >
            {isSaving && (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
                style={styles.savingSpinner}
              />
            )}
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          keyboardShouldPersistTaps="handled"
        >
          {!!errorMessage && (
            <View
              style={styles.errorContainer}
              accessible={true}
              accessibilityRole="alert"
            >
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tiêu đề *</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Tiêu đề công việc..."
              placeholderTextColor={theme.colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={200}
              autoFocus={true}
              accessible={true}
              accessibilityLabel="Tiêu đề công việc"
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả</Text>
            <TextInput
              style={styles.descInput}
              placeholder="Thêm ghi chú hoặc mô tả..."
              placeholderTextColor={theme.colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              maxLength={5000}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              accessible={true}
              accessibilityLabel="Mô tả công việc"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  closeButton: {
    minWidth: theme.metrics.minTouchTarget,
    minHeight: theme.metrics.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.xs,
  },
  closeText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  saveButton: {
    minWidth: theme.metrics.minTouchTarget,
    minHeight: theme.metrics.minTouchTarget,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.metrics.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: theme.typography.sizes.md,
    color: '#FFFFFF',
    fontWeight: theme.typography.weights.semibold,
  },
  savingSpinner: {
    marginRight: theme.spacing.xs,
  },
  body: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  bodyContent: {
    padding: theme.spacing.md,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: theme.metrics.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.error,
    fontWeight: theme.typography.weights.medium,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  titleInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.metrics.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    minHeight: theme.metrics.minTouchTarget,
  },
  descInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.metrics.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    minHeight: 100,
  },
});
