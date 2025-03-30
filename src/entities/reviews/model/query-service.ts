import {keepPreviousData} from '@tanstack/react-query';
import {getBestReviews, getSearchReviewsWithQuery} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['bestReviews'] as const,
  search: (query: string, page: number) => ['searchReviews', query, page] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
  search: (query: string, page: number) => ({
    queryKey: reviewQueryKeys.search(query, page),
    queryFn: () => getSearchReviewsWithQuery(query, page),
    placeholderData: keepPreviousData,
  }),
};

export {reviewQueryOptions};
