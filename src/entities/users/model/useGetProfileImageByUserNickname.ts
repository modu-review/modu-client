import {useSuspenseQuery} from '@tanstack/react-query';
import {usersQueryOptions} from './query-service';

export function useGetProfileImageByUserNickname(userNickname: string) {
  return useSuspenseQuery(usersQueryOptions.profileImage(userNickname));
}
