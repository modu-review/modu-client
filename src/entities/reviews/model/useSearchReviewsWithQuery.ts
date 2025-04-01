'use client';

import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';
import {useEffect} from 'react';

function useSearchReviewsWithQuery(query: string, page: number) {
  const {data} = useSuspenseQuery(reviewQueryOptions.search(query, page));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(reviewQueryOptions.search(query, page + 1));
    }

    if (page > 1) {
      queryClient.prefetchQuery(reviewQueryOptions.search(query, page - 1));
    }
  }, [query, page, data.total_pages, queryClient]);

  return data;
}

export default useSearchReviewsWithQuery;
