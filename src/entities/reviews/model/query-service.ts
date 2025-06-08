import {keepPreviousData} from '@tanstack/react-query';
import {getBestReviews, getCategoryReviews, getKeywordReviews} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['best'] as const,
  category: (categoryId: string, sort: string) => ['category', categoryId, sort] as const,
  keyword: (keyword: string, page: number, sort: string) => ['keyword', keyword, page, sort] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
  category: (categoryId: string, sort: string) => ({
    queryKey: reviewQueryKeys.category(categoryId, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getCategoryReviews(pageParam, categoryId, sort),
    initialPageParam: 0,
  }),
  keyword: (keyword: string, page: number, sort: string) => ({
    queryKey: reviewQueryKeys.keyword(keyword, page, sort),
    queryFn: () => getKeywordReviews(keyword, page, sort),
    placeholderData: keepPreviousData,
  }),
};

export {reviewQueryOptions};
