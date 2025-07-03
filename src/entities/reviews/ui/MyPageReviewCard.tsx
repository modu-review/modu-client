import Link from 'next/link';
import CardDescription from './CardDescription';
import {ReviewCard, useDeleteReviewFromMyPage} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';
import {LoadingSpinner} from '@/shared/ui/components';

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
      {isPending && (
        <div className="absolute inset-0 bg-black/60 rounded-xl z-50">
          <LoadingSpinner text="리뷰를 삭제하고 있어요." className="text-white mt-3" textSize="text-xl" />
        </div>
      )}
      {isAuthor && (
        <div className="absolute w-full px-4 flex justify-between text-gray-500 transition-colors">
          <Link className="hover:text-gray-800" href={`/reviews/${card.board_id}/edit`} aria-label="리뷰 수정">
            <LucideIcon name="PencilLine" size={20} />
          </Link>
          <button className="hover:text-gray-800" onClick={handleDelete} aria-label="리뷰 삭제">
            <LucideIcon name="X" size={20} />
          </button>
        </div>
      )}
      <CardDescription card={card} />
    </section>
  );
}
