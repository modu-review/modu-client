import {Comment} from '@/entities/review';
import {UserInfo} from '@/shared/ui/components';

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
            <UserInfo profileImage={profile_image} userId={author} />
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
