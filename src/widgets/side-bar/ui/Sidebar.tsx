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
  return;
}
