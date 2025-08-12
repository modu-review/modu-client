'use client';

import NotificationCard from './NotificationCard';
import {useGetNotifications} from '@/entities/notifications';

export default function NotificationList() {
  const {data} = useGetNotifications();

  return (
    <ul className="min-h-[80%] max-h-[310px] md:max-h-[600px] mt-6 md:mt-8 mx-2 md:mx-10 bg-white rounded-lg shadow-md shadow-gray-300 overflow-y-auto">
      {data.map(notification => (
        <li key={notification.id} className="relative">
          <NotificationCard notification={notification} />
        </li>
      ))}
    </ul>
  );
}
