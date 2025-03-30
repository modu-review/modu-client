import SearchBar from '@/features/search';
import Pagination from '@/widgets/pagination';

type Props = {
  params: Promise<{query: string}>;
};

export default async function SearchWithQueryPage({params}: Props) {
  const {query} = await params;

  return (
    <section className="w-full md:max-w-5xl mx-auto p-4 px-6">
      <h2 className="text-2xl mb-6 font-semibold">후기글 모음</h2>
      <SearchBar />
      <Pagination />
    </section>
  );
}
