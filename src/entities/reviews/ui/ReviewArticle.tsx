import Image from 'next/image';
import {SearchReviewCard} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  searchReview: SearchReviewCard;
};

export default function ReviewArticle({
  searchReview: {author_id, board_id, bookmarks, category, comments_count, preview, created_at, image_url, title},
}: Props) {
  return (
    <article
      key={board_id}
      className="w-full overflow-hidden mb-6 flex flex-col-reverse md:flex-row md:justify-between shadow-xl shadow-gray-300 md:shadow-none rounded-md md:rounded-none md:border-b-2 md:border-gray-500 md:px-4 md:pb-6"
    >
      <section className="flex flex-col">
        <article className="mb-4 pt-4 px-4 md:p-0">
          <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 mb-1">{created_at}</p>
          <div className="flex gap-3 text-sm text-gray-500">
            <p>{category}</p>
            <p>{author_id}</p>
          </div>
        </article>
        <article className="px-4 md:px-0 text-sm line-clamp-2 md:line-clamp-3 mb-4 md:mb-7 md:flex-1 md:max-w-[400px] lg:max-w-[550px]">
          {preview}
        </article>
        <article className="flex gap-6 text-sm border-t py-2.5 px-4 md:p-0 md:border-none">
          <div className="flex gap-1 items-center">
            <LucideIcon name="Bookmark" size={16} />
            {bookmarks}
          </div>
          <div className="flex gap-1 items-center">
            <LucideIcon name="MessageCircle" size={16} />
            {comments_count}
          </div>
        </article>
      </section>
      <div className="w-full h-[300px] md:w-[200px] md:h-[200px] overflow-hidden md:rounded-md">
        <Image
          className="w-full h-full object-cover"
          src={image_url}
          alt={`${title} preview image`}
          width={500}
          height={500}
        />
      </div>
    </article>
  );
}
