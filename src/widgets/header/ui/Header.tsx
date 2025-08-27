'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Sidebar} from '@/widgets/side-bar';
import {NotificationBell} from '@/features/notifications';

export default function Header() {
  const pathName = usePathname();
  const isMainPage = pathName === '/';

  return (
    <header
      className={`flex justify-between items-center py-5 px-5 md:px-8 lg:py-6 lg:px-10 ${isMainPage || ' border-b border-gray-200'}`}
    >
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold text-boldBlue">모두의 : 후기</h2>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <NotificationBell />
        <Sidebar />
      </div>
    </header>
  );
}
