import Link from 'next/link';
import ReviewDetailInteractive from './ReviewDetailInteractive';
import {Viewer} from '@/features/review/viewer';
import {DeleteButton} from '@/entities/reviews';
import {getReviewDetail} from '@/entities/review';
import getSessionUserNickname from '@/shared/lib/utils/getSessionUserNickname';
import {notFound} from 'next/navigation';

type Props = {
  params: Promise<{reviewId: string}>;
};

export async function generateMetadata({params}: Props) {
  const {reviewId} = await params;
  const parsedReviewId = Number(reviewId);

  const post = await getReviewDetail(parsedReviewId);

  if (post) {
    return {
      title: post.title,
      description: `${post.title}에 대한 자세한 후기를 확인해보세요.`,
    };
  }
}

export default async function ReviewDetailPage({params}: Props) {
  const {reviewId} = await params;
  const parsedReviewId = Number(reviewId);

  const post = await getReviewDetail(parsedReviewId);

  if (!post) {
    notFound();
  }

  const {author_nickname, content, category, created_at, title, profile_image} = post;

  const sessionUserNickname = await getSessionUserNickname();
  const isAuthor = sessionUserNickname === author_nickname;

  return (
    <section className="flex flex-col w-full max-w-5xl mx-auto items-center relative pt-1 md:pt-3">
      {isAuthor && (
        <div className="absolute top-[17px] right-6 flex items-center gap-2">
          <Link href={`/reviews/${reviewId}/edit`} className="text-gray-500 hover:text-gray-700">
            수정
          </Link>
          <DeleteButton category={category} reviewId={parsedReviewId} />
        </div>
      )}
      <Viewer
        title={title}
        author_nickname={author_nickname}
        profile_image={profile_image}
        content={content}
        category={category}
        created_at={created_at}
        authorProfileUrl={`/users/${author_nickname}`}
      />
      <ReviewDetailInteractive reviewId={parsedReviewId} category={category} />
    </section>
  );
}
