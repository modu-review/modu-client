import Empty from './Empty';
import Pagination from '@/widgets/pagination';
import {ReviewsGrid, useMyReviews} from '@/entities/reviews';

type Props = {
  currentPage: number;
};

export default function MyReviews({currentPage}: Props) {
  const {results, total_pages} = useMyReviews(currentPage);

  if (results.length === 0) {
    return <Empty title="아직 작성한 후기가 없어요." linkText="후기 작성하기" linkHref="/review/write" />;
  }

  return (
    <section>
      <ReviewsGrid
        reviews={results}
        from="myReviews"
        onEdit={() => console.log('수정')}
        onDelete={() => console.log('삭제')}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={total_pages}
        generateUrl={(page: number) => `?tabs=my&page=${page}`}
        className="bg-white px-1.5 md:px-5 py-1.5 rounded-md shadow-md mb-4"
        scrollToTop={false}
      />
    </section>
  );
}
