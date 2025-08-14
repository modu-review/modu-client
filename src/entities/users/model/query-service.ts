import {getPostsByUser} from '../apis/api-service';

export const usersQueryKeys = {
  all: () => ['users'] as const,

  reviews: (userEmail: string, sort: string) => [usersQueryKeys.all(), userEmail, sort] as const,
};

export const usersQueryOptions = {
  reviews: (userEmail: string, sort: string) => ({
    queryKey: usersQueryKeys.reviews(userEmail, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getPostsByUser(pageParam, userEmail, sort),
    initialPageParam: 0,
  }),
};
