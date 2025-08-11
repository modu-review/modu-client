import {Suspense} from 'react';
import NotificationHeader from './NotificationHeader';
import NotificationList from './NotificationList';

export default function Notifications() {
  return (
    <section className=" h-full bg-gray-100 rounded-lg pt-7 md:px-8">
      <NotificationHeader />
      <Suspense fallback={<div>...loading</div>}>
        <NotificationList />
      </Suspense>
    </section>
  );
}
