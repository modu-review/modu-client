import {requestGet} from '@/shared/apis';
import {BestReviewMapped} from '../model/types';

export function getBestReviews() {
  return requestGet<BestReviewMapped>({
    endpoint: '/reviews/best',
  });
}
