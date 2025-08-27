'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import {usePathname} from 'next/navigation';
import {Sidebar} from '@/widgets/side-bar';
import {LoginButtonLoading, LogoutButton} from '@/features/auth';
import {useIsLoggedIn} from '@/entities/auth';
import {SIDEBAR_ROUTES} from '@/widgets/side-bar/const/sidebarRoutes';
import LoginRequiredPopover from '@/widgets/side-bar/ui/LoginRequiredPopover';

export default function Header() {
  const pathName = usePathname();
  const isMainPage = pathName === '/';
  const isLoggedIn = useIsLoggedIn();

  const LoginButton = dynamic(() => import('@/features/auth/ui/LoginButton'), {
    ssr: false,
    loading: () => <LoginButtonLoading />,
  });

  return (
    <header
      className={`flex justify-between items-center py-5 px-5 md:px-8 lg:py-6 lg:px-10 ${isMainPage || ' border-b border-gray-200'}`}
    >
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-extrabold whitespace-nowrap text-boldBlue">모두의 : 후기</h2>
      </Link>
      {/* 모바일 */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* 데스크탑 */}
      <div className="hidden lg:flex w-full lg:max-w-screen-2xl items-center">
        <div className="flex justify-center items-center w-full gap-4">
          {/* 메뉴 영역 */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-14 text-medium items-center flex-wrap">
            {SIDEBAR_ROUTES.map(({title, href, isActive, requiresAuth, scrollToTop}) =>
              !requiresAuth || isLoggedIn ? (
                <Link
                  key={href}
                  href={href}
                  className={
                    isActive(pathName)
                      ? 'text-boldBlue font-semibold md:font-extrabold whitespace-nowrap underline decoration-4 decoration-boldBlue underline-offset-8'
                      : 'text-muted-foreground hover:text-boldBlue transition-colors whitespace-nowrap'
                  }
                  aria-label={`${title} 메뉴로 이동`}
                  scroll={scrollToTop}
                >
                  <span className="relative group font-medium">
                    <span className="invisible group-hover:visible absolute -left-2">[</span>
                    <span className="px-2">{title}</span>
                    <span className="invisible group-hover:visible absolute -right-2">]</span>
                  </span>
                </Link>
              ) : (
                <LoginRequiredPopover key={title} title={title} />
              ),
            )}
          </nav>
        </div>
        {/* 로그인/로그아웃 버튼 */}
        <div className="flex-shrink-0">{isLoggedIn ? <LogoutButton /> : <LoginButton className="px-6" />}</div>
      </div>
    </header>
  );
}
