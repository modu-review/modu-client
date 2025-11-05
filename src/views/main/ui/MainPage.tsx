import Hero from './Hero';
import ContactUs from '@/widgets/contactus';
import {BestReviews} from '@/features/reviews/best';
import {RecentReviews} from '@/features/reviews/recent';
import {getBestReviews} from '@/entities/reviews';

export default async function MainPage() {
  const data = await getBestReviews();

  return (
    <section>
      <Hero />
      <BestReviews reviews={data} />
      <RecentReviews />
      <ContactUs />
    </section>
  );
}
