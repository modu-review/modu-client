import {requestGet} from '@/shared/apis';
import {BestReviewMapped, SearchReviewWithQuery} from '../model/types';

export function getBestReviews() {
  return requestGet<BestReviewMapped>({
    endpoint: '/reviews/best',
  });
}

export function getSearchReviewsWithQuery(query: string, page: number) {
  return requestGet<SearchReviewWithQuery>({
    endpoint: `/api/search?query=${query}&page=${page}`,
    baseUrl: 'http://localhost:3000',
  });
}
