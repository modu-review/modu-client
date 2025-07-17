import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/shadcnComponent/ui/sheet';
import {LucideIcon} from '@/shared/ui/icons';
import Link from 'next/link';

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
  return (
    <Sheet>
      <SheetTrigger>
        <LucideIcon name="Menu" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>모두의 후기</SheetTitle>
          <SheetDescription>세상의 모든 후기를 확인해보세요.</SheetDescription>
        </SheetHeader>
        <nav>
          {SIDEBAR_ROUTES.map(({title, href, isActive, requiresAuth}) => (
            <SheetClose key={title} asChild>
              <Link key={title} href={href}>
                <span>{title}</span>
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
