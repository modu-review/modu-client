import {Button} from '@/shared/shadcnComponent/ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between py-6 px-10">
      <Link href="/">
        <h2 className="text-3xl font-bold text-boldBlue ">모두의 : 후기</h2>
      </Link>
      {/* Todo: 로그인 기능 구현하기 */}
      <Button variant="logInOut" size="logInOut">
        로그인하기
      </Button>
    </header>
  );
}
