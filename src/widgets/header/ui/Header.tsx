'use client';

import {Button} from '@/shared/shadcnComponent/ui/button';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const isSearchPage = pathName.startsWith('/search');

  return (
    <header
      className={`flex justify-between items-center py-5 px-6 md:px-8 lg:px-10 ${isSearchPage && 'bg-lightBlue'}`}
    >
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold text-boldBlue">모두의 : 후기</h2>
      </Link>
      {/* Todo: 로그인 기능 구현하기 */}
      <Button variant="logInOut" size="logInOut">
        로그인
      </Button>
    </header>
  );
}
