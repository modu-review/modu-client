import {BestReview} from '@/features/best-review';
import Hero from './Hero';
import {Suspense} from 'react';

export default function MainPage() {
  return (
    <section>
      <Hero />
      {/* Todo: fallback UI 구현 */}
      <Suspense fallback={<div>Loading...</div>}>
        <BestReview />
      </Suspense>
    </section>
  );
}
