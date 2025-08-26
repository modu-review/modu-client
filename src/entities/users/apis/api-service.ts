import {requestDelete, requestGet, requestPost} from '@/shared/apis';
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
    endpoint: `/users/${userNickname}/profileImage`,
  });
}

export async function postProfileImage(body: FormData) {
  await requestPost({
    endpoint: '/users/me/profileImage',
    body,
  });
}

export async function deleteProfileImage() {
  await requestDelete({
    endpoint: '/users/me/profileImage',
  });
}
