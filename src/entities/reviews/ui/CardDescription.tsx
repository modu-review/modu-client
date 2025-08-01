import Image from 'next/image';
import {CATEGORY_MAP, ReviewCard} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';
import {cva} from 'class-variance-authority';
import {cn} from '@/shared/lib/utils/cn';
import {Badge} from '@/shared/ui/components';

const imageWrapperVariants = cva('w-[140px] h-[140px] overflow-hidden rounded-[30px] mb-1 shadow-md', {
  variants: {
    variant: {
      default: 'shadow-black',
      my: 'lg:w-[160px] lg:h-[160px] shadow-extraboldBlue',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const titleVariants = cva('mt-4 mb-2 px-3 line-clamp-1', {
  variants: {
    variant: {
      default: '',
      my: 'lg:text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const previewVariants = cva('text-[13px] font-light line-clamp-2 px-5', {
  variants: {
    variant: {
      default: 'md:line-clamp-2',
      my: '2xl:line-clamp-3 lg:px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const authorVariants = cva('text-boldBlue text-sm', {
  variants: {
    variant: {
      default: '',
      my: 'lg:text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type Props = {
  card: ReviewCard;
  priority: boolean;
  variant?: 'default' | 'my';
};

export default function CardDescription({
  card: {category, image_url, title, preview, author_id, comments_count, bookmarks},
  priority,
  variant = 'default',
}: Props) {
  return (
    <article className="h-full flex flex-col items-center justify-between font-semibold">
      <Badge>{CATEGORY_MAP[category]}</Badge>

      <div className="flex flex-col items-center text-center">
        <div className={cn(imageWrapperVariants({variant}))}>
          <Image
            className="w-full h-full object-cover aspect-square"
            src={image_url}
            width={140}
            height={140}
            priority={priority}
            alt={`카드 이미지: ${title}`}
          />
        </div>
        <h3 className={cn(titleVariants({variant}))}>{title}</h3>
        <div className="min-h-[30px]">
          <p className={cn(previewVariants({variant}))}>{preview}</p>
        </div>
      </div>

      <p className={cn(authorVariants({variant}))}>{author_id}</p>

      <div className="flex mb-5 gap-7 text-sm font-normal">
        <div className="flex gap-1 items-center">
          <LucideIcon name="Bookmark" className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
          {bookmarks}
        </div>
        <div className="flex gap-1 items-center">
          <LucideIcon name="MessageCircle" className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
          {comments_count}
        </div>
      </div>
    </article>
  );
}
