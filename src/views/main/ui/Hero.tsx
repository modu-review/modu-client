import {Button} from '@/shared/shadcnComponent/ui/button';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section>
      <article>
        <p>내가 경험하지 못한 것을 누군가는 먼저 경험했습니다.</p>
        <p>세상의 모든 후기를</p>
        <p>바로 여기 {'모두의 후기'} 에서 확인하세요.</p>
      </article>
      <Link href="/">
        <Button className="">{'내 경험 공유하기>'}</Button>
      </Link>
      <SearchBar />
    </section>
  );
}
