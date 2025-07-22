import {KeywordReviews} from '@/features/reviews/keyword';
import {SearchBar} from '@/features/reviews/search-bar';
import FloatingWriteButton from './FloatingWriteButton';
import Link from 'next/link';

type Props = {
  params: Promise<{keyword: string}>;
};

export default async function KeywordSearchPage({params}: Props) {
  const {keyword} = await params;

  const decodedQuery = decodeURIComponent(keyword);

  return (
    <section className="w-full h-full md:px-8 md:max-w-5xl mx-auto mt-2">
      <header className="flex flex-col gap-2 mt-4 md:mt-6 mb-6 md:mb-8 ml-7 md:flex-row md:items-center md:justify-between">
        <h2 className="font-bold text-2xl md:text-3xl">{decodedQuery} 검색 결과</h2>
        <Link href="/search" className="text-sm text-boldBlue hover:text-extraboldBlue transition-colors md:mr-4">
          카테고리별로 확인해보세요 →
        </Link>
      </header>
      <SearchBar />
      <KeywordReviews />
      <FloatingWriteButton />
    </section>
  );
}
