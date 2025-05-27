import {BestReviewMapped, FindReviews, MyBookmarkedReviews, MyReviews, SearchReviewsWithKeyword} from '../model/types';
import {requestGet} from '@/shared/apis';

export function getBestReviews() {
  return requestGet<BestReviewMapped>({
    endpoint: '/reviews/best',
  });
}

export function getReviewsWithKeyword(keyword: string, page: number, sort: string) {
  return requestGet<SearchReviewsWithKeyword>({
    endpoint: '/search',
    queryParams: {
      keyword: keyword,
      page: page,
      sort: sort,
    },
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  });
}

export function getReviews(cursor: number, categoryId: string, sort: string) {
  return requestGet<FindReviews>({
    endpoint: `/reviews`,
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
