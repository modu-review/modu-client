'use client';

import Link from 'next/link';
import {Sidebar} from '@/widgets/side-bar';
import {usePathname} from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const isMainPage = pathName === '/';

  return (
    <header
      className={`flex justify-between items-center py-5 px-1 md:px-3 lg:py-6 lg:px-8 ${isMainPage || ' border-b border-gray-200'}`}
    >
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold text-boldBlue">모두의 : 후기</h2>
      </Link>
      <Sidebar />
    </header>
  );
}
