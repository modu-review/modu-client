import {requestGet} from '@/shared/apis';
import {PostsByUserResult} from '../model/types';

export function getPostsByUser(cursor: number, userEmail: string, sort: string) {
  return requestGet<PostsByUserResult>({
    endpoint: `/users/${userEmail}/reviews`,
    queryParams: {
      cursor: cursor,
      sort: sort,
    },
  });
}
