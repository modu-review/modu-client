import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function NotificationCardLoading() {
  return (
    <section className="relative w-full flex items-center py-[24px] md:py-[26px] px-3 md:px-5 pb-8 md:pb-6 border-b-2 border-neutral-300">
      <Skeleton className="w-9 h-9" />
      <div className="flex flex-col ml-3 gap-1 flex-[0.75]">
        <Skeleton className="w-[150px] h-[16px] md:h-[18px]" />
        <Skeleton className="w-[260px] md:w-[310px] h-[14px] md:h-[16px]" />
      </div>
      <div className="flex-[0.2]">
        <Skeleton className="w-[105px] md:w-[125px] h-[14px] md:h-[17px] absolute right-3 bottom-2 md:static" />
      </div>
      <div className="absolute top-2 md:inset-y-0 right-2 md:right-3 flex items-center">
        <Skeleton className="w-4 md:w-5 h-4 md:h-5" />
      </div>
    </section>
  );
}
