import Hero from '@/widgets/hero';
import {getBestReviews} from '@/entities/reviews';
import {BestReview} from '@/features/reviews/best';

export default async function MainPage() {
  const data = await getBestReviews();

  return (
    <section>
      <Hero />
      <BestReview reviews={data} />
    </section>
  );
}
