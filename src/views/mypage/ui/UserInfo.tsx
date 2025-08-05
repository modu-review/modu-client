'use client';

import Image from 'next/image';
import {useLogout, useUserEmail, useUserId} from '@/entities/auth';
import {Button} from '@/shared/shadcnComponent/ui/button';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();
  const {logout} = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <section className="flex ml-2 md:ml-10 lg:ml-16">
      <div className="translate-y-1/2 w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center rounded-full border-lightBlue border-[6px] overflow-hidden">
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
      <div className="mt-auto ml-3 md:ml-5 relative">
        {userId ? (
          <p className="text-lg md:text-xl lg:text-2xl text-boldBlue font-semibold mb-1 md:mb-2">{userId}</p>
        ) : (
          <Skeleton className="h-5 md:h-6 lg:h-7 w-32 md:w-36 lg:w-40 mb-3" />
        )}
        {userEmail ? (
          <p className="text-sm md:text-base lg:text-lg text-boldBlue">{userEmail}</p>
        ) : (
          <Skeleton className="h-4 md:h-5 lg:h-6 w-40 md:w-48 lg:w-52" />
        )}
        <Button
          className="absolute -left-[0.5rem] -bottom-[3.5rem] md:-bottom-[4rem]"
          variant="logInOut"
          size="logInOut"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    </section>
  );
}
