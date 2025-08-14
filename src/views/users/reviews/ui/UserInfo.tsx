'use client';

import Image from 'next/image';
// import {useUserEmail, useUserId} from '@/entities/auth';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

type Props = {
  userEmail: string;
};

export default function UserInfo({userEmail}: Props) {
  const userId = userEmail.split('@')[0];
  // const userEmail = useUserEmail();

  return (
    <section className="px-5 pt-10 pb-10 md:pb-14 lg:pb-20">
      <div className="flex items-start">
        <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center mr-4 rounded-full border-boldBlue border-[7px] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/ee2/200/200"
            alt={`${userId} 프로필 사진`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center mt-20">
          <p className="text-xl lg:text-2xl font-bold mb-2">
            {userId} 님의 <span className=" text-3xl">프로필 </span>
          </p>

          {userEmail ? (
            <p className="text-sm md:text-base font-semibold text-boldBlue">{userEmail}</p>
          ) : (
            <Skeleton className="h-4 md:h-5 lg:h-6 w-40 md:w-48 lg:w-52" />
          )}
        </div>
      </div>

      <div className="mt-6 md:mt-2 lg:mt-0">
        <div className="h-2 w-full bg-boldBlue rounded-full md:w-[680px] lg:w-[860px] mx-auto" />
      </div>
    </section>
  );
}
