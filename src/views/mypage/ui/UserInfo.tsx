'use client';

import Image from 'next/image';
import {useUserEmail, useUserId} from '@/entities/auth';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <section className="flex flex-col items-center mt-6 md:mt-8 lg:mt-12">
      <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 bg-white flex justify-center items-center rounded-full border-boldBlue border-[7px] overflow-hidden">
        <Image
          // TODO: 실제 사용자 프로필 이미지로 변경
          src="https://picsum.photos/200/200"
          alt={`${userId} 프로필 사진`}
          width={160}
          height={160}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center mt-3">
        {userId ? (
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-1">{userId}</p>
        ) : (
          <Skeleton className="h-5 md:h-6 lg:h-7 w-32 md:w-36 lg:w-40 mb-3" />
        )}
        {userEmail ? (
          <p className="text-sm md:text-base lg:text-lg font-semibold text-boldBlue">{userEmail}</p>
        ) : (
          <Skeleton className="h-4 md:h-5 lg:h-6 w-40 md:w-48 lg:w-52" />
        )}
      </div>
    </section>
  );
}
