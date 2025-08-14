'use client';

import {Suspense} from 'react';
import dynamic from 'next/dynamic';
import NotificationHeader from './NotificationHeader';
import NotificationListLoading from './NotificationListLoading';

const NotificationList = dynamic(() => import('./NotificationList'), {
  ssr: false,
  loading: () => <NotificationListLoading />,
});

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
