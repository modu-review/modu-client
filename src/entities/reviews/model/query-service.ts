import {keepPreviousData} from '@tanstack/react-query';
import {getBestReviews, getReviewsWithKeyword} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['bestReviews'] as const,
  searchWithKeyword: (keyword: string, page: number) => ['searchWithKeyword', keyword, page] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
  searchWithKeyword: (query: string, page: number) => ({
    queryKey: reviewQueryKeys.searchWithKeyword(query, page),
    queryFn: () => getReviewsWithKeyword(query, page),
    placeholderData: keepPreviousData,
  }),
};

export {reviewQueryOptions};
