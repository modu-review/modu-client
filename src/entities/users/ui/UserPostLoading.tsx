import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserPostLoading() {
  return (
    <div className="flex w-full bg-slate-100 rounded-xl shadow px-3 py-5 md:p-6">
      {/* 썸네일 이미지 Skeleton */}
      <Skeleton className="w-[100px] h-[100px] rounded-md mr-3" />

      {/* 텍스트 콘텐츠 영역 */}
      <div className="flex flex-col flex-1">
        {/* 제목 + 카테고리 */}
        <div className="flex justify-between items-center">
          <Skeleton className="w-[150px] md:w-[250px] h-5 mb-2" />
          <Skeleton className="hidden md:block w-[85px] h-7 rounded-xl" />
        </div>

        {/* 날짜 */}
        <Skeleton className="w-[130px] h-3 mb-3" />

        {/* 본문 요약 */}
        <Skeleton className="w-full h-9 mb-1" />

        {/* 하단 아이콘 영역 */}
        <div className="flex gap-4 mt-2">
          <Skeleton className="w-[30px] h-[20px]" />
          <Skeleton className="w-[30px] h-[20px]" />
        </div>
      </div>
    </div>
  );
}
