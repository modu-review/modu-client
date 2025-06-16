import Empty from './Empty';
import ReviewList from './ReviewList';
import {useMyBookmarkedReviews} from '@/entities/reviews';

type Props = {
  currentPage: number;
};

export default function MyBookmarkedReviews({currentPage}: Props) {
  const {results, total_pages} = useMyBookmarkedReviews(currentPage);

  if (results.length === 0) {
    return <Empty title="아직 저장한 후기가 없어요." linkText="후기 보러가기" linkHref="/search" />;
  }

  return (
    <section>
      <ReviewList reviews={results} currentPage={currentPage} totalPages={total_pages} tabs="myBookmarks" />
    </section>
  );
}
