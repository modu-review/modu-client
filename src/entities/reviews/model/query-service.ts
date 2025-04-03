import {getBestReviews, getReviews} from '../apis/api-service';

const reviewQueryKeys = {
  best: ['bestReviews'] as const,
  search: (categoryId: string) => ['search', categoryId] as const,
};

const reviewQueryOptions = {
  best: () => ({
    queryKey: reviewQueryKeys.best,
    queryFn: getBestReviews,
  }),
  search: (categoryId: string) => ({
    queryKey: reviewQueryKeys.search(categoryId),
    queryFn: ({pageParam}: {pageParam: number}) => getReviews(pageParam, categoryId),
    initialPageParam: 1,
  }),
};

export {reviewQueryOptions};
