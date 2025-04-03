import SearchBar from '@/features/search';
import {SearchReviewsWithKeyword, SearchReviewsLoading} from '@/features/search-review-keyword';
import {RQProvider} from '@/shared/providers';
import {LucideIcon} from '@/shared/ui/icons';
type Props = {
  params: Promise<{keyword: string}>;
};

export default async function SearchWithKeywordPage({params}: Props) {
  const {keyword} = await params;

  const decodedQuery = decodeURIComponent(keyword);

  return (
    <section className="w-full h-full md:max-w-5xl mx-auto p-5 px-6 mt-2">
      <h2 className="text-2xl ml-5 mb-4 md:mb-9 font-semibold">{decodedQuery} 검색 결과</h2>
      <SearchBar />
      <RQProvider
        LoadingFallback={<SearchReviewsLoading />}
        icon={<LucideIcon name="Bug" className="w-28 h-28 md:w-40 md:h-40 mb-4" />}
      >
        <SearchReviewsWithKeyword keyword={keyword} />
      </RQProvider>
    </section>
  );
}
