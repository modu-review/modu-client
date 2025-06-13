import {Comment} from '@/entities/review';

type Props = {
  comments: Comment[];
  currentPage: number;
  totalPages: number;
};

export default function CommentsList({comments, currentPage, totalPages}: Props) {
  return (
    <>
      <ul>
        {comments.map(({id, author, content, created_at, profile_image}) => (
          <li key={id}>
            <p>{author}</p>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
