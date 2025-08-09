import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function MyReviewCardLoading() {
  return (
    <section className="flex flex-col items-center justify-between rounded-[2rem] py-4 w-[325px] h-[410px] md:w-[300px] md:h-[400px] bg-white shadow-lg">
      <div className="w-full px-4 flex justify-between items-center">
        <Skeleton className="w-[30px] h-[20px]" />
        <Skeleton className="w-[100px] h-[25px]" />
        <Skeleton className="w-[30px] h-[20px]" />
      </div>
      <div className="flex flex-col items-center">
        <Skeleton className="rounded-[30px] w-[140px] h-[140px] mt-2 mb-5" />
        <Skeleton className="w-[180px] h-[25px] mb-4" />
        <Skeleton className="w-[250px] h-[40px] mb-2" />
      </div>
      <Skeleton className="w-[70px] h-[25px]" />
      <Skeleton className="w-[110px] h-[25px]" />
    </section>
  );
}
