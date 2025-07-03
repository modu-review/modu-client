import Link from 'next/link';
import {SearchBar} from '@/features/reviews/search-bar';
import {Button} from '@/shared/shadcnComponent/ui/button';

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center mt-20">
      <article className="text-center font-semibold mb-8 text-[18px] md:text-[26px] lg:text-[32px]">
        <p>
          내가 경험하지 못한 것을
          <br className="md:hidden" /> 누군가는 먼저 경험했습니다.
        </p>
        <p>세상의 모든 후기를</p>
        <p>
          바로 여기 <span className="text-boldBlue">{"'모두의 : 후기'"}</span>에서 확인하세요.
        </p>
      </article>
      <Link className="mb-10" href="/reviews/new" scroll={false}>
        <Button className=" bg-boldBlue rounded-3xl hover:bg-extraboldBlue p-5 text-[14px] md:text-[16px] md:p-6 lg:text-[18px]">
          {'내 경험 공유하기>'}
        </Button>
      </Link>
      <SearchBar />
    </section>
  );
}
