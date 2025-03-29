import Hero from '@/widgets/hero';
import {BestReview} from '@/features/best-review';
import {getBestReviews} from '@/entities/reviews';

export default async function MainPage() {
  const data = await getBestReviews();

  return (
    <section>
      <Hero />
      <BestReview reviews={data} />
    </section>
  );
}
