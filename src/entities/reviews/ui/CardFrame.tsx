import {cva, VariantProps} from 'class-variance-authority';
import {ReviewCard} from '@/entities/review';
import CardDescription from './CardDescription';
import {cn} from '@/shared/lib/utils/cn';
import {LucideIcon} from '@/shared/ui/icons';

const cardVariants = cva('relative bg-white', {
  variants: {
    from: {
      bestReview:
        'rounded-t-[115px] rounded-b-xl pt-7 w-[290px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[280px] lg:h-[370px] shadow-lg shadow-black',
      myPage:
        'rounded-xl pt-4 w-[290px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[260px] lg:h-[350px] shadow-md shadow-mediumBlue hover:translate-y-[-2px] hover:shadow-lg hover:shadow-boldBlue transition-all',
    },
  },
});

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
