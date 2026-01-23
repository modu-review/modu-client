import {Notification} from '@/entities/notifications';

export const readNotificationStub: Notification = {
  id: 1,
  board_id: 1,
  isRead: true,
  isDeleted: false,
  title: '테스트',
  created_at: '2026년 1월 24일',
  type: 'bookmark',
};

export const unReadNotificationStub: Notification = {
  id: 1,
  board_id: 1,
  isRead: false,
  isDeleted: false,
  title: '테스트',
  created_at: '2026년 1월 24일',
  type: 'bookmark',
};
