import SearchBar from '@/features/search';
import {SearchReviews, SearchReviewsLoading} from '@/features/search-review';
import {RQProvider} from '@/shared/providers';
import {LucideIcon} from '@/shared/ui/icons';
type Props = {
  params: Promise<{query: string}>;
};

export default async function SearchWithQueryPage({params}: Props) {
  const {query} = await params;

  const decodedQuery = decodeURIComponent(query);

  return (
    <section className="w-full h-full md:max-w-5xl mx-auto p-5 px-6 mt-2">
      <h2 className="text-2xl ml-5 mb-4 md:mb-9 font-semibold">{decodedQuery} 검색 결과</h2>
      <SearchBar />
      <RQProvider
        LoadingFallback={<SearchReviewsLoading />}
        icon={<LucideIcon name="Bug" className="w-28 h-28 md:w-40 md:h-40 mb-4" />}
      >
        <SearchReviews query={query} />
      </RQProvider>
    </section>
  );
}
