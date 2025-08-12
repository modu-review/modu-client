export type NotificationType = 'comment' | 'bookmark';

export type Notification = {
  id: number;
  board_id: number;
  type: NotificationType;
  title: string;
  created_at: string;
  isRead: boolean;
  isDelete: boolean;
};

export type MutationVariables = {
  notificationId: number;
  boardId: number;
};
