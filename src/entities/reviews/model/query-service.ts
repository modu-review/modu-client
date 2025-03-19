import {getBestReviews} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['bestReviews'] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
};

export {reviewQueryOptions};
