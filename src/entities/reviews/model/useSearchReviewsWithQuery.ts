'use client';

import {useEffect} from 'react';
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

function useSearchReviewsWithKeyword(keyword: string, page: number, sort: string) {
  const {data} = useSuspenseQuery(reviewQueryOptions.searchWithKeyword(keyword, page, sort));

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data.total_pages) {
      queryClient.prefetchQuery(reviewQueryOptions.searchWithKeyword(keyword, page + 1, sort));
    }

    if (page > 1) {
      queryClient.prefetchQuery(reviewQueryOptions.searchWithKeyword(keyword, page - 1, sort));
    }
  }, [keyword, page, data.total_pages, queryClient, sort]);

  return data;
}

export default useSearchReviewsWithKeyword;
