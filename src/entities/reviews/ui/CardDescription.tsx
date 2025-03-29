import Image from 'next/image';
import {Review} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  card: Review;
};

export default function CardDescription({
  card: {category, image_url, title, content, author, comments_count, bookmarks},
}: Props) {
  return (
    <article className="h-full flex flex-col items-center justify-between font-semibold">
      <p className="text-sm">{category}</p>

      <div className="flex flex-col gap-1 items-center text-center">
        <Image
          className="rounded-[30px] mb-3 shadow-md shadow-black"
          src={`https://picsum.photos/seed/picsum/200/200`}
          width={140}
          height={140}
          priority
          alt={image_url}
        />
        <h3>{title}</h3>
        <div className="min-h-[30px]">
          <p className="text-[11px] font-light line-clamp-2 px-5">{content}</p>
        </div>
      </div>

      <p className="text-boldBlue text-sm">{author}</p>

      <div className="flex mb-5 gap-5 text-xs font-normal">
        <div className="flex gap-1 items-center">
          <LucideIcon name="Bookmark" size={16} />
          {bookmarks}
        </div>
        <div className="flex gap-1 items-center">
          <LucideIcon name="MessageCircle" size={16} />
          {comments_count}
        </div>
      </div>
    </article>
  );
}
