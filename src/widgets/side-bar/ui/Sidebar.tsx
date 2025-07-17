'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import UserInfo from './UserInfo';
import LoginRequiredPopover from './LoginRequiredPopover';
import {useIsLoggedIn} from '@/entities/auth';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/shadcnComponent/ui/sheet';
import {LucideIcon} from '@/shared/ui/icons';

const SIDEBAR_ROUTES = [
  {
    title: '홈',
    href: '/',
    isActive: (path: string) => path === '/',
    requiresAuth: false,
  },
  {
    title: '마이페이지',
    href: '/mypage',
    isActive: (path: string) => path === '/mypage',
    requiresAuth: true,
  },
  {
    title: '후기 작성하기',
    href: '/reviews/new',
    isActive: (path: string) => path === '/reviews/new',
    requiresAuth: true,
  },
  {
    title: '후기 둘러보기',
    href: '/search',
    isActive: (path: string) => path === '/search',
    requiresAuth: false,
  },
  {
    title: '내가 작성한 후기',
    href: '/mypage?tabs=my',
    isActive: (path: string) => path === '/mypage?tabs=my',
    requiresAuth: true,
  },
  {
    title: '내가 저장한 후기',
    href: '/mypage?tabs=myBookmarks',
    isActive: (path: string) => path === '/mypage?tabs=myBookmarks',
    requiresAuth: true,
  },
  {
    title: '문의하기',
    href: '/feedback',
    isActive: (path: string) => path === '/feedback',
    requiresAuth: false,
  },
];

export default function Sidebar() {
  const pathName = usePathname();
  const isLoggedIn = useIsLoggedIn();

  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;

  if (!LOGIN_URL) {
    throw new Error('로그인 URL이 환경변수에 정의되지 않았습니다.');
  }

  return (
    <Sheet>
      <SheetTrigger>
        <LucideIcon name="Menu" className="hover:text-boldBlue md:hover:scale-105 transition-all" />
      </SheetTrigger>
      <SheetContent className="w-[300px] flex flex-col">
        <SheetHeader className="border-b-[3px] border-boldBlue pb-3">
          <SheetTitle className="text-xl md:text-2xl mb-1">모두의 후기</SheetTitle>
          <SheetDescription>세상의 모든 후기를 확인해보세요.</SheetDescription>
        </SheetHeader>
        <nav className="flex-1 flex flex-col space-y-11 text-lg mt-5">
          {SIDEBAR_ROUTES.map(({title, href, isActive, requiresAuth}) =>
            !requiresAuth || isLoggedIn ? (
              <SheetClose key={title} asChild>
                <Link
                  key={title}
                  href={href}
                  className={
                    isActive(pathName)
                      ? 'text-boldBlue font-semibold'
                      : 'text-muted-foreground hover:text-boldBlue transition-colors'
                  }
                >
                  <span>{title}</span>
                </Link>
              </SheetClose>
            ) : (
              <LoginRequiredPopover key={title} title={title} />
            ),
          )}
        </nav>
        <SheetFooter>
          {isLoggedIn ? (
            <UserInfo />
          ) : (
            <Link
              href={LOGIN_URL}
              className="w-full text-center bg-boldBlue text-white py-1.5 font-semibold rounded-md hover:bg-extraboldBlue transition-colors mb-3"
            >
              로그인
            </Link>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
