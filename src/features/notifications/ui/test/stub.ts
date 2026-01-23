import {Notification} from '@/entities/notifications';

export const bookmarkNotificationStub: Notification = {
  id: 1,
  board_id: 1,
  isRead: false,
  isDeleted: false,
  title: '테스트',
  created_at: '2026년 1월 24일',
  type: 'bookmark',
};

export const readCommentNotificationStub: Notification = {
  id: 1,
  board_id: 1,
  isRead: true,
  isDeleted: false,
  title: '테스트',
  created_at: '2026년 1월 24일',
  type: 'bookmark',
};

export const unReadCommentNotificationStub: Notification = {
  id: 1,
  board_id: 1,
  isRead: false,
  isDeleted: false,
  title: '테스트',
  created_at: '2026년 1월 24일',
  type: 'bookmark',
};