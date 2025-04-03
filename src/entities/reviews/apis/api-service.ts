import {requestGet} from '@/shared/apis';
import {BestReviewMapped, FindReviews, SearchReviewsWithKeyword} from '../model/types';

export function getBestReviews() {
  return requestGet<BestReviewMapped>({
    endpoint: '/reviews/best',
  });
}

export function getReviewsWithKeyword(keyword: string, page: number) {
  return requestGet<SearchReviewsWithKeyword>({
    endpoint: `/api/reviews?keyword=${keyword}&page=${page}`,
    baseUrl: 'http://localhost:3000',
  });
}

export function getReviews(cursor: number, categoryId: string) {
  return requestGet<FindReviews>({
    endpoint: `/api/reviews`, // TODO: 실제 api들어오면 /api 빼기
    queryParams: {
      categoryId: categoryId,
      cursor: cursor,
    },
    baseUrl: 'http://localhost:3000', // TODO: 실제 api들어오면 지워주기
  });
}
