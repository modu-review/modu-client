'use client';

import NotificationCard from './NotificationCard';
import {useGetNotifications} from '@/entities/notifications';

export default function NotificationList() {
  const {data} = useGetNotifications();

  if (data.length === 0) {
    return (
      <section className="min-h-[80%] max-h-[310px] md:max-h-[600px] flex flex-col items-center justify-center mt-6 md:mt-8 mx-2 md:mx-10 pb-24 md:pb-14 bg-white rounded-lg shadow-md shadow-gray-300">
        <h2 className="text-xl md:text-2xl font-semibold mb-1">아직 알림이 없어요.</h2>
        <p className="text-sm md:text-base text-muted-foreground">새로운 알림이 도착하면 여기에서 확인할 수 있어요.</p>
      </section>
    );
  }

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
