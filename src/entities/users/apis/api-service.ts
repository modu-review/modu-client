import {requestGet} from '@/shared/apis';
import {PostsByUserResult} from '../model/types';

export function getPostsByUser(cursor: number, userId: string, sort: string) {
  return requestGet<PostsByUserResult>({
    endpoint: `/users/${userId}/reviews`,
    queryParams: {
      cursor: cursor,
      sort: sort,
    },
  });
}
