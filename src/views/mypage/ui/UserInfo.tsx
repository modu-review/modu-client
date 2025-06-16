'use client';

import {useUserEmail, useUserId} from '@/entities/auth';
import {Button} from '@/shared/shadcnComponent/ui/button';
import {LucideIcon} from '@/shared/ui/icons';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <section className="flex ml-2 md:ml-10">
      <div className="translate-y-1/2 w-36 h-36 md:w-40 md:h-40 bg-white flex justify-center items-center rounded-full border-lightBlue border-[6px]">
        <LucideIcon name="UserRound" className="w-20 h-20 md:w-32 md:h-32" />
      </div>
      <div className="mt-auto ml-3 md:ml-5 relative">
        <p className="text-lg md:text-xl text-boldBlue font-semibold mb-1 md:mb-2">{userId}</p>
        <p className="text-sm text-boldBlue">{userEmail}</p>
        <Button
          className="absolute -left-[0.5rem] -bottom-[3.5rem] md:-bottom-[4rem]"
          variant="logInOut"
          size="logInOut"
        >
          로그아웃
        </Button>
      </div>
    </section>
  );
}
