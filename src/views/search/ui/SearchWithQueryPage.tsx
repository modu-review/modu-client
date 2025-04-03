import SearchBar from '@/features/search';
import SearchReviews from '@/features/search-review';

type Props = {
  params: Promise<{query: string}>;
};

export default async function SearchWithQueryPage({params}: Props) {
  const {query} = await params;

  const decodedQuery = decodeURIComponent(query);

  return (
    <section className="w-full md:max-w-5xl mx-auto p-4 px-6">
      <h2 className="text-2xl mb-6 font-semibold">{decodedQuery} 검색 결과</h2>
      <SearchBar />
      <SearchReviews query={decodedQuery} />
    </section>
  );
}
