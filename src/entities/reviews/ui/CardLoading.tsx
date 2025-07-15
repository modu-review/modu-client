import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function CardLoading() {
  return (
    <section className="flex flex-col items-center rounded-xl pt-4 w-[310px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[260px] lg:h-[350px] bg-white shadow-lg">
      <div className="w-full px-3 flex justify-between items-center">
        <Skeleton className="w-[30px] h-[20px] mb-3" />
        <Skeleton className="w-[100px] h-[25px] mb-3" />
        <Skeleton className="w-[30px] h-[20px] mb-3" />
      </div>
      <Skeleton className="rounded-[30px] w-[140px] h-[140px] mb-3" />
      <Skeleton className="w-[180px] h-[25px] mb-2" />
      <Skeleton className="w-[220px] h-[40px] mb-2" />
      <Skeleton className="w-[70px] h-[25px] mb-1" />
      <Skeleton className="w-[110px] h-[25px]" />
    </section>
  );
}
