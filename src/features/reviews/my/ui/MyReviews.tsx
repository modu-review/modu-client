import {ReviewsGrid, useMyReviews} from '@/entities/reviews';
import Pagination from '@/widgets/pagination';

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
      <ReviewsGrid
        reviews={results}
        from="myPage"
        onEdit={() => console.log('수정')}
        onDelete={() => console.log('삭제')}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={total_pages}
        generateUrl={(page: number) => `?tabs=my&page=${page}`}
      />
    </section>
  );
}
