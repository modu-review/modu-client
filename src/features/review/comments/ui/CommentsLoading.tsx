import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';
import CommentCardLoading from './CommentCardLoading';

export default function CommentsLoading() {
  return (
    <section className="w-full px-6">
      <h2 className="mr-auto text-xl pb-1.5 border-b-2 flex items-center">
        댓글쓰기 <Skeleton className="inline-block h-6 w-9 ml-2" />
      </h2>
      <Skeleton className="w-full h-32 mt-4 mb-6" />
      <ul className="flex flex-col gap-5 mt-6">
        {Array.from({length: 5}).map((_, idx) => (
          <li key={idx}>
            <CommentCardLoading />
            <div className="w-full h-[1.5px] bg-gray-300" />
          </li>
        ))}
      </ul>
      <Skeleton className="mx-auto w-[200px] md:w-[260px] h-10 my-5" />
    </section>
  );
}
