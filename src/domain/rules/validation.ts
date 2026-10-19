export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateTaskTitle(title: string): string {
  const trimmed = title?.trim() ?? '';
  if (!trimmed) {
    throw new ValidationError('title', 'Tiêu đề không được để trống.');
  }
  if (trimmed.length > 200) {
    throw new ValidationError('title', 'Tiêu đề không được vượt quá 200 ký tự.');
  }
  return trimmed;
}

export function validateTaskDescription(description?: string | null): string | null {
  if (!description) return null;
  if (description.length > 5000) {
    throw new ValidationError('description', 'Mô tả không được vượt quá 5.000 ký tự.');
  }
  return description;
}

export function validateTaskListName(name: string): string {
  const trimmed = name?.trim() ?? '';
  if (!trimmed) {
    throw new ValidationError('name', 'Tên danh sách không được để trống.');
  }
  if (trimmed.length > 50) {
    throw new ValidationError('name', 'Tên danh sách không được vượt quá 50 ký tự.');
  }
  return trimmed;
}

export function validateDueDateTime(
  dueDate?: string | null,
  dueTimeMinutes?: number | null
): void {
  if (dueDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dueDate)) {
      throw new ValidationError('dueDate', 'Ngày hết hạn phải có định dạng YYYY-MM-DD.');
    }
  }

  if (dueTimeMinutes !== undefined && dueTimeMinutes !== null) {
    if (!dueDate) {
      throw new ValidationError('dueTimeMinutes', 'Giờ hết hạn chỉ hợp lệ khi có ngày hết hạn.');
    }
    if (dueTimeMinutes < 0 || dueTimeMinutes > 1439) {
      throw new ValidationError('dueTimeMinutes', 'Giờ hết hạn phải từ 0 đến 1439 phút.');
    }
  }
}
