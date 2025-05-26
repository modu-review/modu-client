import ReviewList from './ReviewList';
import {useMyReviews} from '@/entities/reviews';

type Props = {
  currentPage: number;
};

export default function MyReviews({currentPage}: Props) {
  const {results, total_pages} = useMyReviews(currentPage);

  if (results.length === 0) {
    return <p>아직 작성한 후기가 없어요.</p>;
  }

  return (
    <section>
      <ReviewList reviews={results} currentPage={currentPage} totalPages={total_pages} tabs="my" />
    </section>
  );
}
