import {cva, VariantProps} from 'class-variance-authority';
import {ReviewCard} from '@/entities/review';
import CardDescription from './CardDescription';
import {cn} from '@/shared/lib/utils/cn';
import {LucideIcon} from '@/shared/ui/icons';

const cardVariants = cva(
  'relative w-[290px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[280px] lg:h-[370px] bg-white shadow-lg shadow-black',
  {
    variants: {
      from: {
        bestReview: 'rounded-t-[115px] rounded-b-xl pt-7',
        myPage: 'rounded-xl pt-4',
      },
    },
  },
);

type BaseProps = {
  card: ReviewCard;
  className?: string;
};

type BestReviewProps = BaseProps & {
  from: 'bestReview';
  onEdit?: never;
  onDelete?: never;
};

type MyPageProps = BaseProps & {
  from: 'myPage';
  onEdit: () => void;
  onDelete: () => void;
};

type ReviewCardProps = BestReviewProps | MyPageProps;

type Props = ReviewCardProps & VariantProps<typeof cardVariants>;

export default function CardFrame({card, from, className, onEdit, onDelete}: Props) {
  const cardActions = {
    myPage: (
      <div className="absolute w-full px-4 pt-1 flex justify-between">
        <button onClick={onEdit} aria-label="리뷰 수정">
          <LucideIcon name="PencilLine" size={20} />
        </button>
        <button onClick={onDelete} aria-label="리뷰 삭제">
          <LucideIcon name="X" size={20} />
        </button>
      </div>
    ),
    bestReview: null,
  };

  return (
    <section className={cn(cardVariants({from}), className)}>
      {cardActions[from]}
      <CardDescription card={card} />
    </section>
  );
}
