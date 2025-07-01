'use client';

import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {reviewsQueryOptions} from './query-service';
import {useEffect} from 'react';

export default function useMyReviews(page: number) {
  const {data} = useSuspenseQuery(reviewsQueryOptions.my(page));
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(reviewsQueryOptions.my(page + 1));
    }

    if (page > 1) {
      queryClient.prefetchQuery(reviewsQueryOptions.my(page - 1));
    }
  }, [page, data.total_pages, queryClient]);

  return data;
}
