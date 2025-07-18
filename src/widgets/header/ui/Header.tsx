import Link from 'next/link';
import {Sidebar} from '@/widgets/side-bar';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-6 md:px-8 lg:py-6 lg:px-10">
      <Link href="/">
        <h2 className="text-2xl md:text-3xl font-bold text-boldBlue">모두의 : 후기</h2>
      </Link>
      <Sidebar />
    </header>
  );
}
