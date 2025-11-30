export const ROUTES = [
  {
    title: '후기쓰기',
    href: '/reviews/new',
    isActive: (path: string) => path === '/reviews/new',
    requiresAuth: true,
    scrollToTop: false,
  },
  {
    title: '둘러보기',
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
    scrollToTop: true,
  },

  {
    title: '문의하기',
    href: '/contact',
    isActive: (path: string) => path === '/contact',
    requiresAuth: false,
    scrollToTop: true,
  },
];
