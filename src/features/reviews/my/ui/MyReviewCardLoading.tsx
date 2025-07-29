import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function MyReviewCardLoading() {
  return (
    <section className="flex flex-col items-center justify-between rounded-xl py-4 w-[325px] h-[410px] md:w-[300px] md:h-[400px] lg:w-[310px] lg:h-[420px] xl:w-[330px] xl:h-[440px] bg-white shadow-lg">
      <div className="w-full px-3 flex justify-between items-center">
        <Skeleton className="w-[30px] h-[20px]" />
        <Skeleton className="w-[100px] h-[25px]" />
        <Skeleton className="w-[30px] h-[20px]" />
      </div>
      <div className="flex flex-col items-center">
        <Skeleton className="rounded-[30px] w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] mt-1 xl:mt-3 mb-5" />
        <Skeleton className="w-[180px] h-[25px] mb-4" />
        <Skeleton className="w-[250px] h-[40px] xl:h-[55px] mb-2" />
      </div>
      <Skeleton className="w-[70px] h-[25px]" />
      <Skeleton className="w-[110px] h-[25px]" />
    </section>
  );
}
