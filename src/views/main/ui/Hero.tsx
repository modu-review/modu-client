import {Button} from '@/shared/shadcnComponent/ui/button';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center mt-12">
      <article className="text-center font-semibold mb-8 text-[18px] md:text-[26px] lg:text-[32px]">
        <p>내가 경험하지 못한 것을 누군가는 먼저 경험했습니다.</p>
        <p>세상의 모든 후기를</p>
        <p>
          바로 여기 <span className="text-boldBlue">{"'모두의 : 후기'"}</span>에서 확인하세요.
        </p>
      </article>
      <Link href="/">
        <Button className="mb-10 bg-boldBlue rounded-3xl hover:bg-extraboldBlue text-[12px] md:text-[16px] md:p-6 lg:text-[18px]">
          {'내 경험 공유하기>'}
        </Button>
      </Link>
      <div className="flex justify-center w-full px-4">
        <SearchBar />
      </div>
    </section>
  );
}
