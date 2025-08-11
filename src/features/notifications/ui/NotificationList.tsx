'use client';

import NotificationCommentCard from './NotificationCommentCard';
import NotificationBookmarkCard from './NotificationBookmarkCard';
import {useGetNotifications} from '@/entities/notifications';

export default function NotificationList() {
  const {data} = useGetNotifications();

  return (
    <ul className="min-h-[80%] mt-6 md:mt-8 mx-4 md:mx-0 bg-white rounded-lg shadow-md shadow-gray-300">
      {data.map(notification => (
        <li key={notification.id}>
          {notification.type === 'comment' ? (
            <NotificationCommentCard notification={notification} />
          ) : (
            <NotificationBookmarkCard notification={notification} />
          )}
        </li>
      ))}
    </ul>
  );
}
