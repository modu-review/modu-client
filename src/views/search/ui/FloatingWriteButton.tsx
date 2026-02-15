'use client';

import {useRouter} from 'next/navigation';
import {useIsLoggedIn} from '@/entities/auth';
import {LucideIcon} from '@/shared/ui/icons';
import {useLoginModal} from '@/features/auth';

export default function FloatingWriteButton() {
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
      <button
        className="w-14 h-14 rounded-full shadow-lg flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-105 bg-mediumBlue"
        onClick={handleClick}
        aria-label="리뷰 작성하기"
      >
        <LucideIcon className="w-8 h-8 transition-colors duration-300 ease-in-out text-white" name="Plus" />
      </button>
      {isOpenLoginModal && renderLoginModal()}
    </>
  );
}
