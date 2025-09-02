import {Notifications} from '@/features/notifications';

export default function NotificationsPage() {
  return (
    <section className="h-full flex flex-col max-w-5xl mx-auto md:px-4 pt-4 md:pt-7 md:pb-7">
      <h2 className="text-2xl font-semibold ml-6 mb-4 md:mb-6">알림</h2>
      <Notifications />
    </section>
  );
}
