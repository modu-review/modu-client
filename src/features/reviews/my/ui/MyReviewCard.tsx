import Link from 'next/link';
import {ReviewCard, useDeleteReviewFromMyPage} from '@/entities/review';
import {CardDescription} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';
import {LoadingSpinner} from '@/shared/ui/components';
import {ConfirmDeleteTrigger} from '@/shared/ui/modal';

type Props = {
  card: ReviewCard;
  isAuthor: boolean;
  context: 'my' | 'myBookmarks';
  priority: boolean;
};

export default function MyReviewCard({card, isAuthor, context, priority}: Props) {
  const {deleteReview, isPending} = useDeleteReviewFromMyPage();

  const handleDelete = () => {
    deleteReview({
      reviewId: card.board_id,
      category: card.category,
      context,
    });
  };

  return (
    <article className="relative bg-white rounded-xl pt-4 w-[325px] h-[410px] md:w-[300px] md:h-[400px] lg:w-[310px] lg:h-[420px] xl:w-[330px] xl:h-[440px] shadow-md shadow-mediumBlue hover:translate-y-[-2px] hover:shadow-lg hover:shadow-boldBlue transition-all">
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
          <ConfirmDeleteTrigger onConfirm={handleDelete} isPending={isPending} label="리뷰 삭제">
            {props => (
              <button {...props} className="hover:text-gray-800">
                <LucideIcon name="X" size={20} />
              </button>
            )}
          </ConfirmDeleteTrigger>
        </div>
      )}
      <Link href={`/reviews/${card.board_id}`}>
        <CardDescription card={card} priority={priority} />
      </Link>
    </article>
  );
}
