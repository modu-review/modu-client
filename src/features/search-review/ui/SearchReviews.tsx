'use client';

import {CategoryBar, useSelectCategory} from '@/features/review-filtering';
import SearchBar from '@/features/search/ui/SearchBar';
import ReviewsWithScroll from './ReviewWithScroll';
import {RQProvider} from '@/shared/providers';
import {SearchReviewsLoading} from '@/features/search-review-keyword';
import {LucideIcon} from '@/shared/ui/icons';

export default function SearchReviews() {
  const {selectedCategory, handleSelectCategory} = useSelectCategory();

  return (
    <section>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <SearchBar />
      <RQProvider
        LoadingFallback={<SearchReviewsLoading />}
        icon={<LucideIcon name="Bug" className="w-28 h-28 md:w-40 md:h-40 mb-4 mt-12" />}
      >
        <ReviewsWithScroll selectedCategory={selectedCategory} />
      </RQProvider>
    </section>
  );
}
