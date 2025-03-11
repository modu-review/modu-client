import {Review} from '@/entities/reviews';
import Image from 'next/image';
import {LucideIcon} from '../icons';

type Props = {card: Review};

export default function CardFrame({
  card: {category, image_url, title, content, author, comments_count, bookmarks},
}: Props) {
  return (
    <article className="h-full flex flex-col items-center justify-between pt-7 font-semibold">
      <p className="px-9 py-1 bg-mediumBlue rounded-2xl text-white text-sm">{category}</p>

      <div className="flex flex-col gap-1 items-center text-center min-h-[200px]">
        <Image
          className="rounded-[30px] mb-3 shadow-md border"
          src="https://picsum.photos/seed/picsum/200/200"
          width={140}
          height={140}
          priority
          alt={image_url}
        />
        <h3>{title}</h3>
        <p className="text-[11px] font-light line-clamp-2 px-5">{content}</p>
      </div>

      <p className="text-boldBlue text-sm">{author}</p>

      <div className="flex mb-5 gap-5 text-sm font-normal">
        <div className="flex items-center">
          <LucideIcon name="Bookmark" size={18} />
          {bookmarks}
        </div>
        <div className="flex items-center">
          <LucideIcon name="MessageCircle" size={18} />
          {comments_count}
        </div>
      </div>
    </article>
  );
}
