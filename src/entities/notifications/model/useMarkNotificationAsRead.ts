'use client';

import {useRouter} from 'next/navigation';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {markNotificationAsRead} from '../apis/api-service';
import {notificationsKeys} from './query-service';
import {MutationVariables} from './type';

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({notificationId}: MutationVariables) => markNotificationAsRead(notificationId),
    onSuccess: (_, {boardId}) => {
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      });

      router.push(`/reviews/${boardId}`);
    },
  });

  return {
    markNotificationAsRead: mutate,
    ...rest,
  };
}
