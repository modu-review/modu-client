'use client';

import {useRouter} from 'next/navigation';
import {useLoginModal} from '@/features/auth';
import {useIsLoggedIn} from '@/entities/auth';
import {Button} from '@/shared/shadcnComponent/ui/button';

export default function WriteReviewButton() {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  const {isOpenLoginModal, openLoginModal, renderLoginModal} = useLoginModal();

  const handleClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    router.push('/reviews/new', {scroll: false});
  };

  return (
    <>
      <Button
        className=" bg-boldBlue rounded-3xl font-bold hover:bg-extraboldBlue p-5 text-[14px] md:text-[16px] md:p-6 lg:text-[18px] mb-8 md:mb-10 lg:mb-10"
        onClick={handleClick}
      >
        {'내 경험 공유하기'}
      </Button>
      {isOpenLoginModal && renderLoginModal()}
    </>
  );
}
