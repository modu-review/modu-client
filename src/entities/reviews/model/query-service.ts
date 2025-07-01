import {keepPreviousData} from '@tanstack/react-query';
import {
  getBestReviews,
  getCategoryReviews,
  getKeywordReviews,
  getMyBookmarkedReviews,
  getMyReviews,
} from '../apis/api-service';

export const reviewsQueryKeys = {
  best: ['best'] as const,
  category: (categoryId: string, sort: string) => ['category', categoryId, sort] as const,
  keyword: (keyword: string, page: number, sort: string) => ['keyword', keyword, page, sort] as const,
  my: (page: number) => ['my', page] as const,
  myBookmarks: (page: number) => ['myBookmarks', page] as const,
};

export const reviewsQueryOptions = {
  best: () => ({
    queryKey: reviewsQueryKeys.best,
    queryFn: getBestReviews,
  }),
  category: (categoryId: string, sort: string) => ({
    queryKey: reviewsQueryKeys.category(categoryId, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getCategoryReviews(pageParam, categoryId, sort),
    initialPageParam: 0,
  }),
  keyword: (keyword: string, page: number, sort: string) => ({
    queryKey: reviewsQueryKeys.keyword(keyword, page, sort),
    queryFn: () => getKeywordReviews(keyword, page, sort),
    placeholderData: keepPreviousData,
  }),
  my: (page: number) => ({
    queryKey: reviewsQueryKeys.my(page),
    queryFn: () => getMyReviews(page),
    placeholderData: keepPreviousData,
  }),
  myBookmarks: (page: number) => ({
    queryKey: reviewsQueryKeys.myBookmarks(page),
    queryFn: () => getMyBookmarkedReviews(page),
    placeholderData: keepPreviousData,
  }),
};
