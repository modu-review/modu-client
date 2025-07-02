import CommentCard from './CommentCard';
import Pagination from '@/widgets/pagination';
import {Comment} from '@/entities/review';
import {useUserEmail} from '@/entities/auth';

type Props = {
  comments: Comment[];
  currentPage: number;
  totalPages: number;
  reviewId: number;
};

export default function CommentsList({comments, currentPage, totalPages, reviewId}: Props) {
  const userEmail = useUserEmail();

  return (
    <>
      <ul className="flex flex-col gap-5 mt-6">
        {comments.map(comment => (
          <li key={comment.id}>
            <CommentCard comment={comment} userEmail={userEmail} reviewId={reviewId} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        generateUrl={page => `?page=${page}`}
        className="my-5"
        scrollToTop={false}
      />
    </>
  );
}
