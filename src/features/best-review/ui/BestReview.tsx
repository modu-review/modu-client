'use client';

import {CategoryBar} from '@/shared/ui/components';
import {Suspense, useState} from 'react';
import Link from 'next/link';
import {LucideIcon} from '@/shared/ui/icons';
import {BestReviewCategory} from '@/entities/reviews/model/types';
import ReviewListContent from '../../../entities/reviews/ui/ReviewListContent';

export default function BestReview() {
  const [selectedCategory, setSelectedCategory] = useState<BestReviewCategory>('all');

  const handleSelectCategory = (category: BestReviewCategory) => {
    setSelectedCategory(category);
  };

  return (
    <section className=" flex flex-col items-center justify-center bg-boldBlue mt-16 py-12 md:px-8">
      <h4 className="text-white font-bold text-2xl mb-8 md:text-3xl">🔥 BEST 후기 🔥</h4>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      {/* Todo: Fallback UI 구현 */}
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewListContent selectedCategory={selectedCategory} />
      </Suspense>
      <Link
        href="/allreviews"
        className="flex items-center animate-bounce cursor-pointer text-white font-bold text-[20px]"
        aria-label="더 많은 후기 보러가기"
      >
        더 많은 후기 보기 <LucideIcon name="ArrowRight" size={20} />
      </Link>
    </section>
  );
}
