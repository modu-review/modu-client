import {Suspense} from 'react';
import NotificationHeader from './NotificationHeader';
import NotificationList from './NotificationList';
import NotificationListLoading from './NotificationListLoading';

export default function Notifications() {
  return (
    <section className="h-full bg-gray-100 rounded-lg pt-5 md:pt-8 md:px-8 shadow-md">
      <NotificationHeader />
      <Suspense fallback={<NotificationListLoading />}>
        <NotificationList />
      </Suspense>
    </section>
  );
}
