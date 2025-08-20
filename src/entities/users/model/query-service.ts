import {getPostsByUser} from '../apis/api-service';

export const usersQueryKeys = {
  all: () => ['users'] as const,

  reviews: (userId: string, sort: string) => [usersQueryKeys.all(), userId, sort] as const,
};

export const usersQueryOptions = {
  reviews: (userId: string, sort: string) => ({
    queryKey: usersQueryKeys.reviews(userId, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getPostsByUser(pageParam, userId, sort),
    initialPageParam: 0,
  }),
};
