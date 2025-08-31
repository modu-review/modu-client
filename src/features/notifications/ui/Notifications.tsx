'use client';

import dynamic from 'next/dynamic';
import NotificationHeader from './NotificationHeader';
import NotificationListLoading from './NotificationListLoading';
import {RQProvider} from '@/shared/providers';

const NotificationList = dynamic(() => import('./NotificationList'), {
  ssr: false,
  loading: () => <NotificationListLoading />,
});

export default function Notifications() {
  return (
    <section className="h-full flex flex-col bg-gray-100 rounded-lg pt-5 md:pt-8 md:px-8 shadow-md">
      <NotificationHeader />
      <RQProvider LoadingFallback={<NotificationListLoading />}>
        <NotificationList />
      </RQProvider>
    </section>
  );
}
