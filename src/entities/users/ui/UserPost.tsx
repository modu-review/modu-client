import {LucideIcon} from '@/shared/ui/icons';
import Image from 'next/image';
import {CATEGORY_MAP, SearchReviewCard} from '@/entities/review';
import Link from 'next/link';

type Props = {
  userReview: SearchReviewCard;
  priority: boolean;
};
export default function UserPost({
  userReview: {board_id, bookmarks, category, comments_count, preview, created_at, image_url, title},
  priority,
}: Props) {
  return (
    <Link href={`/reviews/${board_id}`} className="flex">
      {/* 썸네일 */}
      <div className="flex-shrink-0 w-[100px] h-[100px] overflow-hidden rounded-md border mt-2 mr-4 border-gray-300">
        <Image
          width={100}
          height={100}
          src={image_url}
          alt={`${title} 썸네일`}
          className="w-full h-full object-cover"
          priority={priority}
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-1">
        {/* 제목 */}
        <div className="flex justify-between items-start">
          <h4 className="text-base md:text-lg font-semibold leading-tight">{title}</h4>
          <span className="text-xs font-bold text-white bg-mediumBlue w-[85px] py-2 text-center rounded-xl shrink-0">
            {CATEGORY_MAP[category]}
          </span>
        </div>

        {/* 날짜 */}
        <p className="text-xs text-muted-foreground mt-1">{created_at}</p>

        {/* 내용 요약 */}
        <p className="text-sm mt-2 line-clamp-2">{preview}</p>

        {/* 하단 아이콘 영역 */}
        <div className="flex justify-start items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <LucideIcon name="MessageCircle" size={16} />
            {comments_count}
          </div>
          <div className="flex items-center gap-1">
            <LucideIcon name="Bookmark" size={16} />
            {bookmarks}
          </div>
        </div>
      </div>
    </Link>
  );
}
