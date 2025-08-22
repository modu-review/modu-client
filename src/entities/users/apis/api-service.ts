import {requestGet, requestPost} from '@/shared/apis';
import {PostsByUserResult, ProfileImage} from '../model/types';

export function getPostsByUser(cursor: number, userNickname: string, sort: string) {
  return requestGet<PostsByUserResult>({
    endpoint: `/users/${userNickname}/reviews`,
    queryParams: {
      cursor: cursor,
      sort: sort,
    },
  });
}

export function getProfileImageByUserNickname(userNickname: string) {
  return requestGet<ProfileImage>({
    // TODO: 개발 완료 후 baseUrl 제거
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: `/api/users/${userNickname}/profileImage`,
  });
}

export async function postProfileImage(body: FormData) {
  await requestPost({
    // TODO: 개발 완료 후 baseUrl 제거
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: '/api/users/me/profileImage',
    body,
  });
}
