import {KeywordReviews} from '@/features/reviews/keyword';
import {SearchBar} from '@/features/reviews/search-bar';

type Props = {
  params: Promise<{keyword: string}>;
};

export default async function KeywordSearchPage({params}: Props) {
  const {keyword} = await params;

  const decodedQuery = decodeURIComponent(keyword);

  return (
    <section className="w-full h-full md:px-8 md:max-w-5xl mx-auto mt-2">
      <h2 className="font-bold text-2xl mt-3 mb-6 md:mb-8 md:text-3xl px-5">{decodedQuery} 검색 결과</h2>
      <SearchBar />
      <KeywordReviews />
    </section>
  );
}
