import {Button} from '@/shared/shadcnComponent/ui/button';
import {cookies} from 'next/headers';
import Link from 'next/link';

export default async function Header() {
  const cookieStore = await cookies();

  const isLoggedIn = cookieStore.has('refreshToken');

  return (
    <header className="flex justify-between items-center py-5 px-6 md:px-8 lg:py-6 lg:px-10">
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold text-boldBlue">모두의 : 후기</h2>
      </Link>
      {isLoggedIn ? (
        <Link href={'/mypage'} scroll={false}>
          <Button variant="logInOut" size="logInOut">
            마이페이지
          </Button>
        </Link>
      ) : (
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}>
          <Button variant="logInOut" size="logInOut">
            로그인
          </Button>
        </Link>
      )}
    </header>
  );
}
