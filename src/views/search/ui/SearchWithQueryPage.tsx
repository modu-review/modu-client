import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import SearchBar from '@/features/search';
import {SearchReviews, SearchReviewsError, SearchReviewsLoading} from '@/features/search-review';
type Props = {
  params: Promise<{query: string}>;
};

export default async function SearchWithQueryPage({params}: Props) {
  const {query} = await params;

  const decodedQuery = decodeURIComponent(query);

  return (
    <section className="w-full md:max-w-5xl mx-auto p-5 px-6 mt-2">
      <h2 className="text-2xl ml-5 mb-4 md:mb-9 font-semibold">{decodedQuery} 검색 결과</h2>
      <SearchBar />
      <ErrorBoundary fallback={<SearchReviewsError />}>
        <Suspense fallback={<SearchReviewsLoading />}>
          <SearchReviews query={query} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
