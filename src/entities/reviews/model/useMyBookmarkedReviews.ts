'use client';

import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {reviewsQueryOptions} from './query-service';
import {useEffect} from 'react';

export default function useMyBookmarkedReviews(page: number) {
  const {data} = useSuspenseQuery(reviewsQueryOptions.myBookmarks(page));
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(reviewsQueryOptions.myBookmarks(page + 1));
    }

    if (page > 1) {
      queryClient.prefetchQuery(reviewsQueryOptions.myBookmarks(page - 1));
    }
  }, [page, data.total_pages, queryClient]);

  return data;
}
