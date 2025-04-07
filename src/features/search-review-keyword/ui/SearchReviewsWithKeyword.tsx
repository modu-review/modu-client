'use client';

import ReviewWithPagination from './ReviewWithPagination';
import {RQProvider} from '@/shared/providers';
import SearchReviewsLoading from './SearchReviewsLoading';
import {LucideIcon} from '@/shared/ui/icons';
import {SelectSortOptions} from '@/features/review-sorting';
import useSelectSortOption from '@/features/review-sorting/lib/useSelectSortOption';

export default function SearchReviewsWithKeyword() {
  const {sort, handleChange} = useSelectSortOption({
    options: {
      page: '1',
    },
  });

  return (
    <section className="px-6 mt-7">
      <SelectSortOptions className="ml-auto mb-6 md:mr-5" sort={sort} onValueChange={handleChange} />
      <RQProvider
        LoadingFallback={<SearchReviewsLoading />}
        icon={<LucideIcon name="Bug" className="w-28 h-28 md:w-40 md:h-40 mb-4" />}
      >
        <ReviewWithPagination sort={sort} />
      </RQProvider>
    </section>
  );
}
