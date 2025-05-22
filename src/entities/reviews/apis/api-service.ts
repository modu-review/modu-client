import {BestReviewMapped, FindReviews, MyBookmarkedReviews, MyReviews, SearchReviewsWithKeyword} from '../model/types';
import {requestGet} from '@/shared/apis';

export function getBestReviews() {
  return requestGet<BestReviewMapped>({
    endpoint: '/reviews/best',
  });
}

// 키워드 검색
// endpoint에 /api 빼고 /reviews로 요청
// baseUrl에 https://localhost:8080
export function getReviewsWithKeyword(keyword: string, page: number, sort: string) {
  return requestGet<SearchReviewsWithKeyword>({
    endpoint: '/api/reviews',
    queryParams: {
      keyword: keyword,
      page: page,
      sort: sort,
    },
    baseUrl: 'http://localhost:3000',
  });
}

// 카테고리 검색
// endpoint에 /api 빼고 /reviews로 요청
// baseUrl에 https://localhost:8080
export function getReviews(cursor: number, categoryId: string, sort: string) {
  return requestGet<FindReviews>({
    endpoint: `/api/reviews`, // TODO: 실제 api들어오면 /api 빼기
    queryParams: {
      categoryId: categoryId,
      cursor: cursor,
      sort: sort,
    },
    baseUrl: 'http://localhost:3000', // TODO: 실제 api들어오면 지워주기
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
