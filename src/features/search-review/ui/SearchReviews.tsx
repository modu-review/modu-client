'use client';

import ReviewsWithScroll from './ReviewWithScroll';
import {SearchBar} from '@/features/search';
import {CategoryBar, useSelectCategoryFromUrl} from '@/features/review-filtering';
import {SearchReviewsLoading} from '@/features/search-review-keyword';
import {SelectSortOptions, useSelectSortOption} from '@/features/review-sorting';
import {RQProvider} from '@/shared/providers';
import {LucideIcon} from '@/shared/ui/icons';

export default function SearchReviews() {
  const {selectedCategory, handleSelectCategory} = useSelectCategoryFromUrl();

  const {sort, handleChange} = useSelectSortOption({
    options: {
      categoryId: selectedCategory,
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
