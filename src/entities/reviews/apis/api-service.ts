import {requestGet} from '@/shared/apis';
import {BestReviewMapped} from '../model/types';

export function getBestReviews() {
  return requestGet<BestReviewMapped>({
    endpoint: '/api/reviews/best',
    baseUrl: 'http://localhost:3000',
  });
}
