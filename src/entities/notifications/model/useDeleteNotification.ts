import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteNotification} from '../apis/api-service';
import {Notification} from './type';
import {notificationsKeys} from './query-service';

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onMutate: async notificationId => {
      await queryClient.cancelQueries({queryKey: notificationsKeys.all});

      const previousNotifications = queryClient.getQueryData<Notification[]>(notificationsKeys.all);

      if (previousNotifications) {
        const updatedNotifications = previousNotifications.filter(notification => notification.id !== notificationId);

        queryClient.setQueryData(notificationsKeys.all, updatedNotifications);
      }

      return {previousNotifications};
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: notificationsKeys.all});
    },
    onError: (_, {}, context) => {
      if (context) {
        queryClient.setQueryData(notificationsKeys.all, context.previousNotifications);
      }
    },
  });

  return {
    deleteNotification: mutate,
    ...rest,
  };
}
