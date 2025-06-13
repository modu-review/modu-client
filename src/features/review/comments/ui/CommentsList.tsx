import CommentCard from './CommentCard';
import {Comment} from '@/entities/review';

type Props = {
  comments: Comment[];
  currentPage: number;
  totalPages: number;
};

export default function CommentsList({comments, currentPage, totalPages}: Props) {
  return (
    <>
      <ul className="flex flex-col gap-5 mt-6">
        {comments.map(comment => (
          <li key={comment.id}>
            <CommentCard {...comment} />
          </li>
        ))}
      </ul>
    </>
  );
}
