import {ReviewCard} from '@/entities/review';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: ReviewCard;
};

export default function RecentReviewCard({post}: Props) {
  return (
    <Link href={`/reviews/${post.board_id}`}>
      <div
        dir="ltr"
        className="flex flex-col text-left w-[85%] lg:max-w-[400px] bg-white border-[0.15rem] border-boldBlue rounded-2xl p-4 mx-2 shadow-lg flex-shrink-0"
      >
        <div className="w-full h-[200px] overflow-hidden rounded-md mb-3">
          <Image
            src={post.image_url}
            width={400}
            height={200}
            alt={post.title ?? '리뷰 이미지'}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{post.preview}</p>
      </div>
    </Link>
  );
}
