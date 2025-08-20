import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {usersQueryOptions} from './query-service';

export default function useGetPostsByUser(userNickname: string, sort: string) {
  return useSuspenseInfiniteQuery({
    ...usersQueryOptions.reviews(userNickname, sort),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
