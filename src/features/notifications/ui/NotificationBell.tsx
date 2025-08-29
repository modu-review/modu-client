'use client';

import Link from 'next/link';
import {useHasNotifications, useSetHasNotifications} from '@/entities/notifications';
import {LucideIcon} from '@/shared/ui/icons';

export default function NotificationBell() {
  const hasNotifications = useHasNotifications();
  const setHasNotifications = useSetHasNotifications();

  const handleReadNotifications = () => {
    setHasNotifications(false);
  };

  return (
    <Link href="/notifications" className="relative" onClick={handleReadNotifications}>
      <LucideIcon name="Bell" className="w-6 h-6 hover:text-boldBlue md:hover:scale-105 transition-all" />
      {hasNotifications && <div className="absolute -top-0.5 right-0.5 bg-boldBlue w-3 h-3 rounded-full" />}
    </Link>
  );
}
