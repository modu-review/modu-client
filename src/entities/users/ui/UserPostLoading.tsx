import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserPostLoading() {
  return (
    <li>
      <div className="flex p-4 md:p-6 border border-gray-200 rounded-lg shadow-sm mb-4">
        {/* 썸네일 이미지 Skeleton */}
        <div className="flex-shrink-0 w-[100px] h-[100px] overflow-hidden rounded-md border mr-4">
          <Skeleton className="w-full h-full" />
        </div>

        {/* 텍스트 콘텐츠 영역 */}
        <div className="flex flex-col flex-1">
          {/* 제목 + 카테고리 */}
          <div className="flex justify-between items-start">
            <Skeleton className="w-2/3 h-5 mb-2" />
            <Skeleton className="w-[85px] h-6 rounded-xl" />
          </div>

          {/* 날짜 */}
          <Skeleton className="w-[100px] h-3 mb-3" />

          {/* 본문 요약 */}
          <Skeleton className="w-full h-4 mb-1" />
          <Skeleton className="w-3/4 h-4 mb-3" />

          {/* 하단 아이콘 영역 */}
          <div className="flex gap-6 mt-2">
            <Skeleton className="w-[40px] h-[20px]" />
            <Skeleton className="w-[40px] h-[20px]" />
          </div>
        </div>
      </div>
    </li>
  );
}
