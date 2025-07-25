import WriteReviewButton from './WriteReviewButton';
import {SearchBar} from '@/features/reviews/search-bar';

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center mt-20">
      <article className="text-center font-semibold mb-8 text-[20px] md:text-[26px] lg:text-[32px]">
        <p className="mb-3 md:mb-0">
          내가 경험하지 못한 것을 누군가는 <br className="md:hidden" /> 먼저 경험했습니다.
        </p>
        <p>세상의 모든 후기를</p>
        <p>
          바로 여기 <span className="text-boldBlue">{"'모두의 : 후기'"}</span>에서 확인하세요.
        </p>
      </article>
      <WriteReviewButton />
      <SearchBar />
    </section>
  );
}
