import Hero from '@/widgets/hero';
import {getBestReviews} from '@/entities/reviews';
import {BestReviews} from '@/features/reviews/best';
import ContactUs from '@/widgets/contactus';
import {RecentReviews} from '@/features/reviews/recent';
import {Suspense} from 'react';

export default async function MainPage() {
  const data = await getBestReviews();

  return (
    <section>
      <Hero />
      <BestReviews reviews={data} />
      <Suspense fallback={<div>Loading...</div>}>
        <RecentReviews />
      </Suspense>
      <ContactUs />
    </section>
  );
}
