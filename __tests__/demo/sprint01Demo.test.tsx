import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import fs from 'fs';
import path from 'path';
import { App } from '../../src/app/App';
import { createDatabase, DEFAULT_INBOX_ID } from '../../src/data/local/database';
import { TaskRepository } from '../../src/data/repositories/TaskRepository';
import { TaskListRepository } from '../../src/data/repositories/TaskListRepository';

describe('Sprint 01 Demo: Quick Task Creation, Offline Persistence & Timing Benchmark', () => {
  const testDbFile = path.join(__dirname, 'test_demo_sprint01.db');

  beforeEach(() => {
    if (fs.existsSync(testDbFile)) {
      try {
        fs.unlinkSync(testDbFile);
      } catch {
        // ignore if locked
      }
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDbFile)) {
      try {
        fs.unlinkSync(testDbFile);
      } catch {
        // ignore if locked
      }
    }
  });

  /**
   * Kịch bản 1: Demo tạo task chỉ có Title, mặc định Pending, Medium, Inbox, hiển thị ngay lập tức
   */
  it('demo: creates task with only title, verifies default values (Pending, Medium, Inbox), and displays immediately on TodayScreen', async () => {
    const db = await createDatabase(':memory:');
    const taskRepo = new TaskRepository(db);
    const listRepo = new TaskListRepository(db);

    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <App db={db} taskRepository={taskRepo} taskListRepository={listRepo} />
    );

    // 1. Tìm nút tạo nhanh FAB
    const fab = getByLabelText('Tạo task mới');
    expect(fab).toBeTruthy();
    fireEvent.press(fab);

    // 2. Nhập tiêu đề
    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    expect(titleInput).toBeTruthy();
    fireEvent.changeText(titleInput, 'Mua bánh mì và sữa tươi');

    // 3. Nhấn Lưu
    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    // 4. Modal đóng và task hiển thị ngay lập tức trên TodayScreen
    await waitFor(() => {
      expect(getByText('Mua bánh mì và sữa tươi')).toBeTruthy();
    });

    // 5. Kiểm tra trực tiếp trong SQLite database
    const allTasks = await taskRepo.getAllTasks();
    expect(allTasks.length).toBe(1);
    expect(allTasks[0].title).toBe('Mua bánh mì và sữa tươi');
    expect(allTasks[0].status).toBe('PENDING');
    expect(allTasks[0].priority).toBe('MEDIUM');
    expect(allTasks[0].listId).toBe(DEFAULT_INBOX_ID);
    expect(allTasks[0].description).toBeNull();
    expect(allTasks[0].dueDate).toBeNull();
    expect(allTasks[0].dueTimeMinutes).toBeNull();

    await db.closeAsync();
  });

  /**
   * Kịch bản 2: Kiểm tra dữ liệu còn sau khi đóng/mở app và lưu trữ offline bền vững
   */
  it('demo: offline persistence across app restart (close and reopen database)', async () => {
    // Phiên 1: Mở app, tạo task vào file SQLite cục bộ
    const db1 = await createDatabase(testDbFile);
    const taskRepo1 = new TaskRepository(db1);
    const listRepo1 = new TaskListRepository(db1);

    const createdTask = await taskRepo1.createTask({
      title: 'Task lưu trữ offline bền vững',
    });
    expect(createdTask).toBeDefined();

    // Giả lập đóng app: ngắt toàn bộ kết nối database
    await db1.closeAsync();

    // Phiên 2: Mở lại app từ file SQLite cục bộ đã có
    const db2 = await createDatabase(testDbFile);
    const taskRepo2 = new TaskRepository(db2);
    const listRepo2 = new TaskListRepository(db2);

    const { getByText } = render(
      <App db={db2} taskRepository={taskRepo2} taskListRepository={listRepo2} />
    );

    // Kiểm tra task vẫn có mặt trên màn hình sau khi mở lại
    await waitFor(() => {
      expect(getByText('Task lưu trữ offline bền vững')).toBeTruthy();
    });

    // Kiểm tra tính toàn vẹn của dữ liệu trong database sau khởi động lại
    const persistedTasks = await taskRepo2.getAllTasks();
    expect(persistedTasks.length).toBe(1);
    expect(persistedTasks[0].id).toBe(createdTask.id);
    expect(persistedTasks[0].title).toBe('Task lưu trữ offline bền vững');
    expect(persistedTasks[0].status).toBe('PENDING');
    expect(persistedTasks[0].priority).toBe('MEDIUM');
    expect(persistedTasks[0].listId).toBe(DEFAULT_INBOX_ID);

    await db2.closeAsync();
  });

  /**
   * Kịch bản 3: Đo thời gian tạo task cơ bản (chuẩn PRD §10: <= 10 giây)
   */
  it('demo: measures task creation time well within 10-second threshold (PRD §10)', async () => {
    const db = await createDatabase(':memory:');
    const taskRepo = new TaskRepository(db);
    const listRepo = new TaskListRepository(db);

    const startTime = Date.now();

    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <App db={db} taskRepository={taskRepo} taskListRepository={listRepo} />
    );

    const fab = getByLabelText('Tạo task mới');
    fireEvent.press(fab);

    const titleInput = getByPlaceholderText('Tiêu đề công việc...');
    fireEvent.changeText(titleInput, 'Task đo thời gian phản hồi');

    const saveBtn = getByText('Lưu');
    fireEvent.press(saveBtn);

    await waitFor(() => {
      expect(getByText('Task đo thời gian phản hồi')).toBeTruthy();
    });

    const elapsedMs = Date.now() - startTime;

    // Chuẩn PRD §10: tạo task chỉ có Title trong <= 10 giây (10.000 ms)
    expect(elapsedMs).toBeLessThan(10000);

    // Ghi nhận đo đạc thực tế
    console.log(`[Benchmark Sprint 01 Demo] Thời gian tạo task hoàn tất: ${elapsedMs} ms (Ngưỡng PRD: <= 10.000 ms)`);

    await db.closeAsync();
  });
});
