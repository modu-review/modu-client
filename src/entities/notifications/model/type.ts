export type NotificationType = 'comment' | 'bookmark';

export type Notification = {
  id: number;
  board_id: number;
  type: NotificationType;
  title: string;
  created_at: string;
  isRead: boolean;
  isDeleted: boolean;
};

export type Notifications = {
  results: Notification[];
  current_page: number;
  total_pages: number;
};

export type MetaEvent = {
  hasNotification: boolean;
};

export type NotificationEvent = {
  id: number;
  board_id: number;
  type: string;
  title: string;
  isRead: boolean;
  isDeleted: boolean;
  created_at: string;
};
