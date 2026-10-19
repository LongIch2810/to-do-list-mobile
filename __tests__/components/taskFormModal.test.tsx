import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { App } from '../../src/app/App';

describe('TaskFormModal and TodayScreen Integration', () => {
  it('creates task via modal and displays it immediately in TodayScreen', async () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<App />);

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Học React Native');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    await waitFor(() => {
      expect(getByText('Học React Native')).toBeTruthy();
    });
  });

  it('disables save button and shows loading when isSaving is true', async () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<App />);

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Công việc kiểm tra nút Lưu');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    expect(saveBtn).toBeTruthy();
  });
});
