'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import {usePathname} from 'next/navigation';
import UserInfo from './UserInfo';
import LoginRequiredPopover from './LoginRequiredPopover';
import {LoginButtonLoading} from '@/features/auth';
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

const LoginButton = dynamic(() => import('@/features/auth/ui/LoginButton'), {
  ssr: false,
  loading: () => <LoginButtonLoading />,
});

const SIDEBAR_ROUTES = [
  {
    title: '홈',
    href: '/',
    isActive: (path: string) => path === '/',
    requiresAuth: false,
    scrollToTop: true,
  },
  {
    title: '마이페이지',
    href: '/mypage',
    isActive: (path: string) => path === '/mypage',
    requiresAuth: true,
    scrollToTop: false,
  },
  {
    title: '후기 작성하기',
    href: '/reviews/new',
    isActive: (path: string) => path === '/reviews/new',
    requiresAuth: true,
    scrollToTop: false,
  },
  {
    title: '후기 둘러보기',
    href: '/search',
    isActive: (path: string) => path === '/search',
    requiresAuth: false,
    scrollToTop: true,
  },
  {
    title: '내가 작성한 후기',
    href: '/mypage?tabs=my',
    isActive: (path: string) => path === '/mypage?tabs=my',
    requiresAuth: true,
    scrollToTop: false,
  },
  {
    title: '내가 저장한 후기',
    href: '/mypage?tabs=myBookmarks',
    isActive: (path: string) => path === '/mypage?tabs=myBookmarks',
    requiresAuth: true,
    scrollToTop: false,
  },
  {
    title: '문의하기',
    href: '/contact',
    isActive: (path: string) => path === '/contact',
    requiresAuth: false,
    scrollToTop: true,
  },
];

export default function Sidebar() {
  const pathName = usePathname();
  const isLoggedIn = useIsLoggedIn();

  return (
    <Sheet>
      <SheetTrigger aria-label="사이드바 네비게이션 열기">
        <LucideIcon
          name="Menu"
          className="w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 hover:text-boldBlue md:hover:scale-105 transition-all"
        />
      </SheetTrigger>
      <SheetContent className="w-[300px] flex flex-col">
        <SheetHeader className="border-b-[3px] border-boldBlue pb-3">
          <SheetTitle className="text-xl md:text-2xl mb-1">모두의 후기</SheetTitle>
          <SheetDescription>세상의 모든 후기를 확인해보세요.</SheetDescription>
        </SheetHeader>
        <nav className="flex-1 flex flex-col space-y-10 md:space-y-11 text-lg mt-5 md:font-semibold">
          {SIDEBAR_ROUTES.map(({title, href, isActive, requiresAuth, scrollToTop}) =>
            !requiresAuth || isLoggedIn ? (
              <SheetClose key={title} asChild>
                <Link
                  href={href}
                  className={
                    isActive(pathName)
                      ? 'text-boldBlue font-semibold md:font-bold'
                      : 'text-muted-foreground hover:text-boldBlue transition-colors'
                  }
                  aria-label={`${title} 메뉴로 이동`}
                  scroll={scrollToTop}
                >
                  <span>{title}</span>
                </Link>
              </SheetClose>
            ) : (
              <LoginRequiredPopover key={title} title={title} />
            ),
          )}
        </nav>
        <SheetFooter>{isLoggedIn ? <UserInfo /> : <LoginButton />}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
