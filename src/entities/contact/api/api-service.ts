import {requestPost} from '@/shared/apis';
import {ContactFormSchemaType} from '../model/type';

export async function sendSlackMessage(data: ContactFormSchemaType) {
  await requestPost({
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: '/api/slack',
    body: data,
  });
}
