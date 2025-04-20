import {requestPost} from '@/shared/apis';
import {ReviewContent} from '../model/type';

export async function postReview(data: ReviewContent) {
  await requestPost({
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: '/api/review',
    body: data,
    withResponse: false,
  });
}
