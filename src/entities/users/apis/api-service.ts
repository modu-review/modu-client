import {requestGet} from '@/shared/apis';
import {PostsByUserResult} from '../model/types';

export function getPostsByUser(cursor: number, userNickname: string, sort: string) {
  return requestGet<PostsByUserResult>({
    endpoint: `/users/${userNickname}/reviews`,
    queryParams: {
      cursor: cursor,
      sort: sort,
    },
  });
}
