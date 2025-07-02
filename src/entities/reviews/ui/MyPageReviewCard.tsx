import Link from 'next/link';
import CardDescription from './CardDescription';
import {ReviewCard, useDeleteReviewFromMyPage} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  card: ReviewCard;
  isAuthor: boolean;
  context: 'my' | 'bookmarks';
};

export default function MyPageReviewCard({card, isAuthor, context}: Props) {
  const {deleteReview, isPending} = useDeleteReviewFromMyPage();

  const handleDelete = () => {
    deleteReview({
      reviewId: card.board_id,
      category: card.category,
      context,
    });
  };

  return (
    <section className="relative bg-white rounded-xl pt-4 w-[290px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[260px] lg:h-[350px] shadow-md shadow-mediumBlue hover:translate-y-[-2px] hover:shadow-lg hover:shadow-boldBlue transition-all">
      {isPending && <div>{/* TODO: 로딩 오버레이 표시 */}</div>}
      {isAuthor && (
        <div className="absolute w-full px-4 pt-1 flex justify-between">
          <Link href={`/reviews/${card.board_id}/edit`} aria-label="리뷰 수정">
            <LucideIcon name="PencilLine" size={20} />
          </Link>
          <button onClick={handleDelete} aria-label="리뷰 삭제">
            <LucideIcon name="X" size={20} />
          </button>
        </div>
      )}
      <CardDescription card={card} />
    </section>
  );
}
