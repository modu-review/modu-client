'use client';

import ReviewWithPagination from './ReviewWithPagination';
import {SelectSortOptions, useSelectSortOption} from '@/features/reviews/sorting';
import {ReviewsLoading} from '@/entities/reviews';
import {RQProvider} from '@/shared/providers';
import {LucideIcon} from '@/shared/ui/icons';

export default function KeywordReviews() {
  const {sort, handleChange} = useSelectSortOption({
    options: {
      page: '1',
    },
  });

  return (
    <section className="px-6 mt-9 md:mt-7">
      <SelectSortOptions className="ml-auto mb-6 md:mr-5" sort={sort} onValueChange={handleChange} />
      <RQProvider
        LoadingFallback={<ReviewsLoading />}
        icon={<LucideIcon name="Bug" className="w-28 h-28 md:w-40 md:h-40 mb-4" />}
      >
        <ReviewWithPagination sort={sort} />
      </RQProvider>
    </section>
  );
}
