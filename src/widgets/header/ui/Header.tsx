'use client';

import Link from 'next/link';
import {Sidebar} from '@/widgets/side-bar';
import {usePathname} from 'next/navigation';
import {LoginButton, LoginButtonLoading, LogoutButton} from '@/features/auth';
import {useLogin} from '@/entities/auth';
import LoginRequiredPopover from '@/widgets/side-bar/ui/LoginRequiredPopover';
// import {dynamic} from '../../../../app/search/page';

export default function Header() {
  const pathName = usePathname();
  const isMainPage = pathName === '/';
  const isLoggedIn = useLogin();

  // const LoginButton = dynamic(() => import('@/features/auth/ui/LoginButton'), {
  //   ssr: false,
  //   loading: () => <LoginButtonLoading />,
  // });

  const SIDEBAR_ROUTES = [
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
      title: '마이페이지',
      href: '/mypage',
      isActive: (path: string) => path === '/mypage',
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

  return (
    <header
      className={`flex justify-between items-center py-5 px-5 md:px-8 lg:py-6 lg:px-10 ${isMainPage || ' border-b border-gray-200'}`}
    >
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap text-boldBlue">모두의 : 후기</h2>
      </Link>
      {/* 모바일 */}
      <div className="md:hidden lg:hidden">
        <Sidebar />
      </div>

      {/* 데스크탑 */}
      <div className="hidden md:flex lg:flex w-full max-w-[1250px] justify-end">
        <div className="flex justify-end w-full gap-4">
          {/* 메뉴 영역 */}
          <nav className="flex gap-6 text-lg flex-wrap">
            {SIDEBAR_ROUTES.map(({title, href, isActive, requiresAuth, scrollToTop}) =>
              !requiresAuth || isLoggedIn ? (
                <Link
                  key={href}
                  href={href}
                  className={
                    isActive(pathName)
                      ? 'text-boldBlue font-semibold md:font-bold whitespace-nowrap'
                      : 'text-muted-foreground hover:text-boldBlue transition-colors whitespace-nowrap'
                  }
                  aria-label={`${title} 메뉴로 이동`}
                  scroll={scrollToTop}
                >
                  <span>{title}</span>
                </Link>
              ) : (
                <LoginRequiredPopover key={title} title={title} />
              ),
            )}
          </nav>

          {/* 로그인/로그아웃 버튼 */}
          <div className="flex-shrink-0">{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>
        </div>
      </div>
    </header>
  );
}
