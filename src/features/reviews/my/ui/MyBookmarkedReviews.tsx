import Empty from './Empty';
import Pagination from '@/widgets/pagination';
import {ReviewsGrid, useMyBookmarkedReviews} from '@/entities/reviews';
import {useUserId} from '@/entities/auth';

type Props = {
  currentPage: number;
};

export default function MyBookmarkedReviews({currentPage}: Props) {
  const {results, total_pages} = useMyBookmarkedReviews(currentPage);
  const userId = useUserId();

  if (results.length === 0) {
    return <Empty title="아직 저장한 후기가 없어요." linkText="후기 보러가기" linkHref="/search" />;
  }

  return (
    <section>
      <ReviewsGrid reviews={results} from="myBookmarkedReviews" userId={userId} onDelete={() => console.log('삭제')} />
      <Pagination
        currentPage={currentPage}
        totalPages={total_pages}
        generateUrl={(page: number) => `?tabs=myBookmarks&page=${page}`}
        className="bg-white px-1.5 md:px-5 py-1.5 rounded-md shadow-md mb-4"
        scrollToTop={false}
      />
    </section>
  );
}
