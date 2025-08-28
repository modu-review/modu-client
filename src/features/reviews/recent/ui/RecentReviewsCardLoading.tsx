import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function RecentReviewCardLoading() {
  return (
    <div className="flex flex-col w-[85%] lg:max-w-[400px] bg-white border-[0.15rem] border-boldBlue rounded-2xl p-4 mx-2 shadow-lg flex-shrink-0">
      <Skeleton className="w-full h-[200px] overflow-hidden rounded-md mb-3" />
      <Skeleton className="mb-2 w-[60px] h-[19px]" />
      <Skeleton className="mb-2 w-[100px] h-[17px]" />
    </div>
  );
}
