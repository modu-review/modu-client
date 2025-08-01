'use client';

import Link from 'next/link';
import BestReviewsGrid from './BestReviewsGrid';
import {CategoryBar, useSelectCategory} from '@/features/reviews/filtering';
import {BestReviewsResult} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  reviews: BestReviewsResult;
};

export default function BestReviews({reviews}: Props) {
  const {selectedCategory, handleSelectCategory} = useSelectCategory();
  const filteredReview = reviews[selectedCategory];

  return (
    <section className="bg-boldBlue mt-12 md:mt-16">
      <div className="w-full max-w-[1250px] mx-auto flex flex-col justify-center py-6 md:py-9 md:px-8">
        <h4 className="text-white font-bold text-2xl text-center md:text-start md:ml-14 mb-5 md:mb-8 md:text-3xl">
          HOT REVIEW POSTS
        </h4>
        <article className="w-full max-w-[1150px] mx-auto px-3 mb-2 md:mb-4">
          <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
        </article>
        <BestReviewsGrid filteredReview={filteredReview} />
        <Link
          href="/search"
          className="flex items-center mx-auto animate-bounce cursor-pointer text-white font-bold text-[20px]"
          aria-label="더 많은 후기 보러가기"
        >
          더 많은 후기 보기 <LucideIcon name="ArrowRight" size={20} />
        </Link>
      </div>
    </section>
  );
}
