import {keepPreviousData} from '@tanstack/react-query';
import {getCategoryReviews, getKeywordReviews, getMyBookmarkedReviews, getMyReviews} from '../apis/api-service';
import {Category} from '@/entities/review/model/type';

export const reviewsQueryKeys = {
  all: () => ['reviews'] as const,

  my: {
    all: () => [...reviewsQueryKeys.all(), 'my'] as const,
    page: (page: number) => [...reviewsQueryKeys.my.all(), page] as const,
  },
  myBookmarks: {
    all: () => [...reviewsQueryKeys.all(), 'myBookmarks'] as const,
    page: (page: number) => [...reviewsQueryKeys.myBookmarks.all(), page] as const,
  },
  keyword: {
    all: () => [...reviewsQueryKeys.all(), 'keyword'] as const,
    keyword: (keyword: string) => [...reviewsQueryKeys.keyword.all(), keyword] as const,
    page: (keyword: string, page: number, sort: string) =>
      [...reviewsQueryKeys.keyword.keyword(keyword), page, sort] as const,
  },
  category: {
    all: () => [...reviewsQueryKeys.all(), 'category'] as const,
    category: (categoryId: Category) => [...reviewsQueryKeys.category.all(), categoryId] as const,
    page: (categoryId: Category, sort: string) => [...reviewsQueryKeys.category.category(categoryId), sort] as const,
  },
};

export const reviewsQueryOptions = {
  category: (categoryId: Category, sort: string) => ({
    queryKey: reviewsQueryKeys.category.page(categoryId, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getCategoryReviews(pageParam, categoryId, sort),
    initialPageParam: 0,
  }),
  keyword: (keyword: string, page: number, sort: string) => ({
    queryKey: reviewsQueryKeys.keyword.page(keyword, page, sort),
    queryFn: () => getKeywordReviews(keyword, page, sort),
    placeholderData: keepPreviousData,
  }),
  my: (page: number) => ({
    queryKey: reviewsQueryKeys.my.page(page),
    queryFn: () => getMyReviews(page),
    placeholderData: keepPreviousData,
  }),
  myBookmarks: (page: number) => ({
    queryKey: reviewsQueryKeys.myBookmarks.page(page),
    queryFn: () => getMyBookmarkedReviews(page),
    placeholderData: keepPreviousData,
  }),
};
