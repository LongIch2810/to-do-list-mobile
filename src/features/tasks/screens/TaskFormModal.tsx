import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
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

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const onSubmit = async () => {
    setHasAttemptedSubmit(true);
    const task = await handleSave();
    if (task) {
      navigation.goBack();
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper testID="task-form-modal">
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleClose}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Hủy và đóng form"
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Hủy</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Tạo task mới</Text>

          <TouchableOpacity
            onPress={onSubmit}
            disabled={isSaving}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Lưu công việc"
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
              placeholderTextColor={theme.colors.textTertiary}
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
              placeholderTextColor={theme.colors.textTertiary}
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
    paddingHorizontal: theme.spacing.space7,
    paddingVertical: theme.spacing.space3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  closeButton: {
    minWidth: theme.metrics.minTouchTarget,
    minHeight: theme.metrics.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.space1,
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
    borderRadius: theme.metrics.borderRadius.xs,
    paddingHorizontal: theme.spacing.space7,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: theme.typography.sizes.md,
    color: '#FFFFFF',
    fontWeight: theme.typography.weights.semibold,
  },
  savingSpinner: {
    marginRight: theme.spacing.space1,
  },
  body: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  bodyContent: {
    padding: theme.spacing.space7,
  },
  errorContainer: {
    backgroundColor: theme.colors.errorBg,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.metrics.borderRadius.xs,
    padding: theme.spacing.space3,
    marginBottom: theme.spacing.space7,
  },
  errorText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.error,
    fontWeight: theme.typography.weights.medium,
  },
  inputGroup: {
    marginBottom: theme.spacing.space7,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.space1,
  },
  titleInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.metrics.borderRadius.xs,
    paddingHorizontal: theme.spacing.space7,
    paddingVertical: theme.spacing.space3,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textPrimary,
    minHeight: theme.metrics.minTouchTarget,
  },
  descInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.metrics.borderRadius.xs,
    paddingHorizontal: theme.spacing.space7,
    paddingVertical: theme.spacing.space3,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textPrimary,
    minHeight: 100,
  },
});
