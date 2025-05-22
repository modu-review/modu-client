import {keepPreviousData} from '@tanstack/react-query';
import {getBestReviews, getMyReviews, getReviews, getReviewsWithKeyword} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['bestReviews'] as const,
  search: (categoryId: string, sort: string) => ['search', categoryId, sort] as const,
  searchWithKeyword: (keyword: string, page: number, sort: string) =>
    ['searchWithKeyword', keyword, page, sort] as const,
  my: (page: number) => ['my', page] as const,
  myBookmarked: (page: number) => ['myBookmarked', page] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
  search: (categoryId: string, sort: string) => ({
    queryKey: reviewQueryKeys.search(categoryId, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getReviews(pageParam, categoryId, sort),
    initialPageParam: 1,
  }),
  searchWithKeyword: (keyword: string, page: number, sort: string) => ({
    queryKey: reviewQueryKeys.searchWithKeyword(keyword, page, sort),
    queryFn: () => getReviewsWithKeyword(keyword, page, sort),
    placeholderData: keepPreviousData,
  }),
  my: (page: number) => ({
    queryKey: reviewQueryKeys.my(page),
    queryFn: () => getMyReviews(page),
    placeholderData: keepPreviousData,
  }),
  myBookmarked: (page: number) => ({
    queryKey: reviewQueryKeys.myBookmarked(page),
    queryFn: () => getMyReviews(page),
    placeholderData: keepPreviousData,
  }),
};

export {reviewQueryOptions};
