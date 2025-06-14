import {Button} from '@/shared/shadcnComponent/ui/button';
import Link from 'next/link';

export default async function Header() {
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;

  if (!LOGIN_URL) {
    throw new Error('로그인 URL이 환경변수에 정의되지 않았습니다.');
  }

  return (
    <header className="flex justify-between items-center py-5 px-6 md:px-8 lg:py-6 lg:px-10">
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold text-boldBlue">모두의 : 후기</h2>
      </Link>
      <Link href={LOGIN_URL}>
        <Button variant="logInOut" size="logInOut">
          로그인
        </Button>
      </Link>
    </header>
  );
}
