'use client';

import {RQProvider} from '@/shared/providers';
import dynamic from 'next/dynamic';
import {RecentReviewsCarouselLoading} from './RecentReviewsCarouselLoading';

const RecentReviewsCarousel = dynamic(() => import('./RecentReviewsCarousel'), {
  ssr: false,
  loading: () => (
    <div>
      <RecentReviewsCarouselLoading />
    </div>
  ),
});

export default function RecentReviewsClient() {
  return (
    <section>
      <RQProvider
        LoadingFallback={
          <div>
            <RecentReviewsCarouselLoading />
          </div>
        }
      >
        <RecentReviewsCarousel />
      </RQProvider>
    </section>
  );
}
