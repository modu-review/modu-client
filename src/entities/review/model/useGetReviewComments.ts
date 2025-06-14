'use client';

import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';
import {useEffect} from 'react';

export default function useGetReviewComments(reviewId: number, page: number) {
  const {data} = useSuspenseQuery(reviewQueryOptions.comments(reviewId, page));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(reviewQueryOptions.comments(reviewId, page + 1));
    }

    if (page > 1) {
      queryClient.prefetchQuery(reviewQueryOptions.comments(reviewId, page - 1));
    }
  }, [reviewId, page, data.total_pages, queryClient]);

  return data;
}
