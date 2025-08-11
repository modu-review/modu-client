export type NotificationType = 'comment' | 'bookmark';

export type Notification = {
  id: number;
  board_id: number;
  type: NotificationType;
  title: string;
  isRead: boolean;
  isDelete: boolean;
};
