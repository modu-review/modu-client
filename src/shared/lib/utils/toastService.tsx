import {toast as sonnerToast} from 'sonner';
import {Toast, ToastProps} from '@/shared/ui/components';

type ToastOptions = Omit<ToastProps, 'id' | 'type'>;

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
};

export default toast;
