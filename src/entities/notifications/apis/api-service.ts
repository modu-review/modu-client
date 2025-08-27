import {Notifications} from '../model/type';
import {requestGet, requestPatch} from '@/shared/apis';

export async function getNotifications(page: number) {
  return await requestGet<Notifications>({
    endpoint: '/users/me/notifications',
    queryParams: {
      page: page,
    },
  });
}

export async function markNotificationAsRead(notificationId: number) {
  await requestPatch({
    endpoint: `/users/me/notifications/${notificationId}`,
    body: {
      isRead: true,
    },
  });
}

export async function deleteNotification(notificationId: number) {
  await requestPatch({
    endpoint: `/users/me/notifications/${notificationId}`,
    body: {
      isDeleted: true,
    },
  });
}

export async function preflightNotifications() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/stream`, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
    },
    credentials: 'include',
  });

  return response;
}
