import {Notification} from '../model/type';
import {requestGet} from '@/shared/apis';

export async function getNotifications() {
  return await requestGet<Notification[]>({
    // TODO: 개발 완료 후 baseUrl 제거.
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: '/users/me/notifications',
  });
}
