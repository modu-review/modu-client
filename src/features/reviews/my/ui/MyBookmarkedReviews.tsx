import Empty from './Empty';
import MyReviewsGrid from './MyReviewsGrid';
import Pagination from '@/widgets/pagination';
import {useMyBookmarkedReviews} from '@/entities/reviews';
import {useUserEmail} from '@/entities/auth';

type Props = {
  currentPage: number;
};

export default function MyBookmarkedReviews({currentPage}: Props) {
  const {results, total_pages} = useMyBookmarkedReviews(currentPage);
  const userEmail = useUserEmail();

  if (results.length === 0) {
    return <Empty title="아직 저장한 후기가 없어요." linkText="후기 보러가기" linkHref="/search" />;
  }

  return (
    <section>
      <MyReviewsGrid reviews={results} context="myBookmarks" userEmail={userEmail} />
      <Pagination
        currentPage={currentPage}
        totalPages={total_pages}
        generateUrl={(page: number) => `?tabs=myBookmarks&page=${page}`}
        className="bg-white px-1.5 md:px-5 py-1.5 rounded-md shadow-md mb-6 mt-8"
      />
    </section>
  );
}
