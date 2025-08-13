import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {usersQueryOptions} from './query-service';

export default function useGetPostsByUser(userId: string, sort: string = 'recent') {
  return useSuspenseInfiniteQuery({
    ...usersQueryOptions.reviews(userId, sort),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
