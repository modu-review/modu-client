import {getReviewDetail} from '../apis/api-service';

const reviewQueryKeys = {
  detail: (reviewId: number) => ['review', reviewId] as const,
};

const reviewQueryOptions = {
  detail: (reviewId: number) => ({
    queryKey: reviewQueryKeys.detail(reviewId),
    queryFn: () => getReviewDetail(reviewId),
  }),
};

export {reviewQueryOptions};
