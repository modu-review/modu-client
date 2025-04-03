'use client';

import {useEffect} from 'react';
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

function useSearchReviewsWithKeyword(query: string, page: number) {
  const {data} = useSuspenseQuery(reviewQueryOptions.searchWithKeyword(query, page));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(reviewQueryOptions.searchWithKeyword(query, page + 1));
    }

    if (page > 1) {
      queryClient.prefetchQuery(reviewQueryOptions.searchWithKeyword(query, page - 1));
    }
  }, [query, page, data.total_pages, queryClient]);

  return data;
}

export default useSearchReviewsWithKeyword;
