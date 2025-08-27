import {ReviewCard} from '@/entities/review';
import Image from 'next/image';

type Props = {
  key: string;
  post: ReviewCard;
  uniqueKey: string;
};
export default function RecentReviewCard({uniqueKey, post}: Props) {
  return (
    <div
      key={uniqueKey}
      className="flex flex-col text-left w-[85%] lg:max-w-[400px] bg-white border-[0.3rem] border-boldBlue rounded-2xl p-4 mx-2 shadow-md flex-shrink-0"
    >
      <div className="w-full h-[200px] overflow-hidden rounded-md mb-3">
        <Image
          src={post.image_url || '/images/placeholder.png'}
          width={400}
          height={200}
          alt={post.title ?? '리뷰 이미지'}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{post.title}제목이 길어진다면어떻게될까요</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{post.preview}</p>
    </div>
  );
}
