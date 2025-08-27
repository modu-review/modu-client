'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {markNotificationAsRead} from '../apis/api-service';
import {notificationsKeys} from './query-service';

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: (notificationId: number) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      });
    },
  });

  return {
    markNotificationAsRead: mutate,
    ...rest,
  };
}
