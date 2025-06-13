import {Comment} from '@/entities/review';
import {Avatar} from '@/shared/ui/components';

type Props = {
  comments: Comment[];
  currentPage: number;
  totalPages: number;
};

export default function CommentsList({comments, currentPage, totalPages}: Props) {
  return (
    <>
      <ul className="flex flex-col gap-5 mt-6">
        {comments.map(({id, author, content, created_at, profile_image}) => (
          <li key={id}>
            <div className="flex gap-3 mx-2 px-3 pt-5 pb-8 mb-5 bg-slate-100 rounded-lg">
              <Avatar src={profile_image} alt={`${author}님의 프로필 이미지`} />
              <article>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold ">{author}</span>
                  <time className="text-sm text-gray-500" dateTime={created_at}>
                    ({created_at})
                  </time>
                </div>
                <p className="text-sm md:text-base">{content}</p>
              </article>
            </div>
            <div className="w-full h-[1.5px] bg-gray-300" />
          </li>
        ))}
      </ul>
    </>
  );
}
