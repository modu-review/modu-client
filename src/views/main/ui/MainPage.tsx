import Hero from '@/widgets/hero';
import {getBestReviews} from '@/entities/reviews';
import {BestReviews} from '@/features/reviews/best';
import ContactUs from '@/widgets/contactus';

export default async function MainPage() {
  const data = await getBestReviews();

  return (
    <section>
      <Hero />
      <BestReviews reviews={data} />
      <BestReviews reviews={data} />
      <ContactUs />
    </section>
  );
}
