import {toast as sonnerToast} from 'sonner';
import {Toast, ToastProps} from '@/shared/ui/components';
import NotificationToast, {NotificationToastProps} from '@/shared/ui/components/NotificationToast';

type ToastOptions = Omit<ToastProps, 'id' | 'type'>;
type NotificationToastOptions = Omit<NotificationToastProps, 'id'>;

const toast = {
  show: (options: ToastOptions) => {
    return sonnerToast.custom(id => <Toast id={id} type="default" {...options} />);
  },

  success: (options: ToastOptions) => {
    return sonnerToast.custom(id => <Toast id={id} type="success" {...options} />);
  },

  error: (options: ToastOptions) => {
    return sonnerToast.custom(id => <Toast id={id} type="error" {...options} />);
  },

  info: (options: ToastOptions) => {
    return sonnerToast.custom(id => <Toast id={id} type="info" {...options} />);
  },

  notification: (options: NotificationToastOptions) => {
    return sonnerToast.custom(id => <NotificationToast id={id} {...options} />);
  },
};

export default toast;
