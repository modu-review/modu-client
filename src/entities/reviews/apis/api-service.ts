import {requestGet} from '@/shared/apis';
import {BestReviewMapped, SearchReviewsWithKeyword} from '../model/types';

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
