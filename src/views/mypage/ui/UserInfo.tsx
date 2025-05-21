'use client';

import {useUserEmail, useUserId} from '@/entities/auth';
import {Button} from '@/shared/shadcnComponent/ui/button';
import {LucideIcon} from '@/shared/ui/icons';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <section className="flex ml-10">
      <div className="translate-y-1/2 w-48 h-48 bg-white flex justify-center items-center rounded-full border-lightBlue border-[6px]">
        <LucideIcon name="UserRound" className="w-36 h-36" />
      </div>
      <div className="mt-auto ml-5 relative">
        <p className="text-xl text-boldBlue font-bold mb-2">{userId}</p>
        <p className="text-boldBlue font-semibold">{userEmail}</p>
        <Button className="absolute -bottom-[4rem]" variant="logInOut" size="logInOut">
          로그아웃
        </Button>
      </div>
    </section>
  );
}
