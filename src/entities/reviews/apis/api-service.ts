import {
  BestReviewsResult,
  CategoryReviewsResult,
  KeywordReviewsResult,
  MyBookmarkedReviews,
  MyReviews,
  RecentReviews,
} from '../model/types';
import {requestGet} from '@/shared/apis';

export function getBestReviews() {
  return requestGet<BestReviewsResult>({
    endpoint: '/reviews/best',
  });
}

export function getRecentReviews() {
  return requestGet<RecentReviews>({
    endpoint: '/reviews/latest',
    // endpoint: '/api/reviews/latest',
    // baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
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
    endpoint: `/reviews`,
    queryParams: {
      categoryId: categoryId,
      cursor: cursor,
      sort: sort,
    },
  });
}

export function getMyReviews(page: number) {
  return requestGet<MyReviews>({
    endpoint: '/users/me/reviews',
    queryParams: {
      page: page,
    },
  });
}

export function getMyBookmarkedReviews(page: number) {
  return requestGet<MyBookmarkedReviews>({
    endpoint: '/users/me/bookmarks',
    queryParams: {
      page: page,
    },
  });
}
