import {
  BestReviewsResult,
  CategoryReviewsResult,
  KeywordReviewsResult,
  MyBookmarkedReviews,
  MyReviews,
} from '../model/types';
import {requestGet} from '@/shared/apis';

export function getBestReviews() {
  return requestGet<BestReviewsResult>({
    endpoint: '/reviews/best',
  });
}

export function getKeywordReviews(keyword: string, page: number, sort: string) {
  return requestGet<KeywordReviewsResult>({
    endpoint: '/search',
    queryParams: {
      keyword: keyword,
      page: page,
      sort: sort,
    },
  });
}

export function getCategoryReviews(cursor: number, categoryId: string, sort: string) {
  return requestGet<CategoryReviewsResult>({
    endpoint: `/reviews`, // TODO: 실제 api들어오면 /api 빼기
    queryParams: {
      categoryId: categoryId,
      cursor: cursor,
      sort: sort,
    },
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  });
}

export function getMyReviews(page: number) {
  return requestGet<MyReviews>({
    endpoint: '/api/users/me/reviews',
    queryParams: {
      page: page,
    },
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
  });
}

export function getMyBookmarkedReviews(page: number) {
  return requestGet<MyBookmarkedReviews>({
    endpoint: '/api/users/me/bookmarks',
    queryParams: {
      page: page,
    },
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
  });
}
