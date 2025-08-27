'use client';

import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {notificationsOptions} from './query-service';
import {useEffect} from 'react';

export function useGetNotifications(page: number) {
  const {data} = useSuspenseQuery(notificationsOptions.page(page));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(notificationsOptions.page(page + 1));
    }

    if (page > 1) {
      queryClient.prefetchQuery(notificationsOptions.page(page - 1));
    }
  }, [page, data.total_pages, queryClient]);

  return data;
}
