import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {usersQueryOptions} from './query-service';

export default function useGetPostsByUser(userEmail: string, sort: string = 'recent') {
  return useSuspenseInfiniteQuery({
    ...usersQueryOptions.reviews(userEmail, sort),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
