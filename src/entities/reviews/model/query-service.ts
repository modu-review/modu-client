import {keepPreviousData} from '@tanstack/react-query';
import {getBestReviews, getReviews, getReviewsWithKeyword} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['bestReviews'] as const,
  search: (categoryId: string) => ['search', categoryId] as const,
  searchWithKeyword: (keyword: string, page: number) => ['searchWithKeyword', keyword, page] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
  search: (categoryId: string) => ({
    queryKey: reviewQueryKeys.search(categoryId),
    queryFn: ({pageParam}: {pageParam: number}) => getReviews(pageParam, categoryId),
    initialPageParam: 1,
  }),
  searchWithKeyword: (query: string, page: number) => ({
    queryKey: reviewQueryKeys.searchWithKeyword(query, page),
    queryFn: () => getReviewsWithKeyword(query, page),
    placeholderData: keepPreviousData,
  }),
};

export {reviewQueryOptions};
