import {Review, ReviewsGrid} from '@/entities/reviews';
import Pagination from '@/widgets/pagination';

type Props = {
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  tabs: string;
};

export default function ReviewList({reviews, currentPage, totalPages, tabs}: Props) {
  return (
    <>
      <ReviewsGrid
        reviews={reviews}
        from="myPage"
        onEdit={() => console.log('수정')}
        onDelete={() => console.log('삭제')}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        generateUrl={(page: number) => `?tabs=${tabs}&page=${page}`}
        className="bg-white px-1.5 md:px-5 py-1.5 rounded-md shadow-md mb-4"
      />
    </>
  );
}
