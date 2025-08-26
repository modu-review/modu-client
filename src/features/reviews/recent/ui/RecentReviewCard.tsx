import {ReviewCard} from '@/entities/review';
import Image from 'next/image';

type Props = {
  key: string;
  post: Partial<ReviewCard>;
};
export default function RecentReviewCard({key, post}: Props) {
  return (
    <div
      key={key}
      className="min-w-[260px] bg-white border-[0.3rem] border-boldBlue rounded-2xl p-4 mx-2 shadow-md flex-shrink-0"
    >
      <Image
        src={post.image_url || '/images/placeholder.png'}
        width={400}
        height={200}
        alt={post.title ?? '리뷰 이미지'}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p className="text-sm text-gray-600">{post.preview}</p>
    </div>
  );
}
