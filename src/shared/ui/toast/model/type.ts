type NotificationToastType = 'bookmark' | 'comment';
type AlertToastType = 'success' | 'error' | 'info' | 'default';

export type ToastProps = {
  id: string | number;
  title: string;
  description?: string;
  type?: AlertToastType;
  button?: {
    label: string;
    onClick: () => void;
  };
};

export type NotificationToastProps = {
  id: string | number;
  board_id: number;
  title: string;
  type: NotificationToastType;
};
