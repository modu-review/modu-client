'use client';

import {CategoryBar} from '@/features/review-filtering';
import SearchBar from '@/features/search/ui/SearchBar';
import ReviewsWithScroll from './ReviewWithScroll';
import {RQProvider} from '@/shared/providers';
import {SearchReviewsLoading} from '@/features/search-review-keyword';
import {LucideIcon} from '@/shared/ui/icons';
import {useSelectCategoryFromUrl} from '@/features/review-filtering/lib/useSelectCategoryFromUrl';
import {SelectSortOptions} from '@/features/review-sorting';
import useSelectSortOption from '@/features/review-sorting/lib/useSelectSortOption';

export default function SearchReviews() {
  const {selectedCategory, handleSelectCategory} = useSelectCategoryFromUrl();

  const {sort, handleChange} = useSelectSortOption({
    options: {
      cateogryId: selectedCategory,
    },
  });

  return (
    <section>
      <article className="p-3">
        <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      </article>
      <SearchBar />
      <article className="px-6">
        <SelectSortOptions className="ml-auto mt-10 mb-7 md:mr-4" sort={sort} onValueChange={handleChange} />
        <RQProvider
          LoadingFallback={<SearchReviewsLoading />}
          icon={<LucideIcon name="Bug" className="w-28 h-28 md:w-40 md:h-40 mb-4 mt-12" />}
        >
          <ReviewsWithScroll selectedCategory={selectedCategory} sort={sort} />
        </RQProvider>
      </article>
    </section>
  );
}
