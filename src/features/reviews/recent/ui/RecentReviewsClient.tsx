'use client';

import {RQProvider} from '@/shared/providers';
import dynamic from 'next/dynamic';

const RecentReviewsCarousel = dynamic(() => import('./RecentReviewsCarousel'), {
  ssr: false,
  loading: () => <div>대체 UI</div>,
});

export default function RecentReviewsClient() {
  return (
    <section>
      <RQProvider LoadingFallback={<div>대체 UI</div>}>
        <RecentReviewsCarousel />
      </RQProvider>
    </section>
  );
}
