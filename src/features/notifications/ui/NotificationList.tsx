'use client';

import NotificationCard from './NotificationCard';
import {useGetNotifications} from '@/entities/notifications';

export default function NotificationList() {
  const {data} = useGetNotifications();

  return (
    <ul className="min-h-[80%] mt-6 md:mt-8 mx-4 md:mx-0 bg-white rounded-lg shadow-md shadow-gray-300">
      {data.map(notification => (
        <li
          key={notification.id}
          className={`py-4 px-7 border-b-2 last:border-b-0 ${notification.isRead ? 'bg-gray-200' : 'bg-white'}`}
        >
          <NotificationCard notification={notification} />
        </li>
      ))}
    </ul>
  );
}
