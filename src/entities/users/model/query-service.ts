import {getPostsByUser} from '../apis/api-service';

export const usersQueryKeys = {
  all: () => ['users'] as const,

  reviews: (userNickname: string, sort: string) => [usersQueryKeys.all(), userNickname, sort] as const,
};

export const usersQueryOptions = {
  reviews: (userNickname: string, sort: string) => ({
    queryKey: usersQueryKeys.reviews(userNickname, sort),
    queryFn: ({pageParam}: {pageParam: number}) => getPostsByUser(pageParam, userNickname, sort),
    initialPageParam: 0,
  }),
};
