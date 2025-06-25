import ReviewDetailInteractive from './ReviewDetailInteractive';
import {Viewer} from '@/features/review/viewer';
import {getReviewDetail} from '@/entities/review';
import getSessionUserEmail from '@/shared/lib/utils/getSessionUserEmail';
import Link from 'next/link';

type Props = {
  params: Promise<{reviewId: string}>;
};

export default async function ReviewDetailPage({params}: Props) {
  const {reviewId} = await params;
  const parsedReviewId = Number(reviewId);

  const {author, content, category, created_at, title} = await getReviewDetail(parsedReviewId);

  const sessionUserEmail = await getSessionUserEmail();
  const isAuthor = sessionUserEmail === author;

  return (
    <section className="flex flex-col w-full max-w-5xl mx-auto items-center relative">
      {isAuthor && (
        <div className="absolute top-[17px] right-6 flex items-center gap-2">
          <Link href={`/reviews/${reviewId}/edit`} className="text-gray-500 hover:text-gray-700">
            수정
          </Link>
          {/* TODO: 삭제 버튼 클릭 시 게시글 삭제 요청 구현하기 */}
          <button className="text-gray-500 hover:text-gray-700">삭제</button>
        </div>
      )}
      <Viewer title={title} author={author} content={content} category={category} created_at={created_at} />
      <ReviewDetailInteractive reviewId={parsedReviewId} category={category} />
    </section>
  );
}
