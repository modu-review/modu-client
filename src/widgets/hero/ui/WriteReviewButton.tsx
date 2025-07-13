'use client';

import {useRouter} from 'next/navigation';
import {useIsLoggedIn} from '@/entities/auth';
import {Button} from '@/shared/shadcnComponent/ui/button';
import {LoginModal, Modal, useModal} from '@/shared/ui/modal';

export default function WriteReviewButton() {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const handleClick = () => {
    if (!isLoggedIn) {
      handleModalOpen();
      return;
    }

    router.push('/reviews/new', {scroll: false});
  };

  return (
    <>
      <Button
        className=" bg-boldBlue rounded-3xl hover:bg-extraboldBlue p-5 text-[14px] md:text-[16px] md:p-6 lg:text-[18px] mb-10"
        onClick={handleClick}
      >
        {'내 경험 공유하기>'}
      </Button>
      {openModal && (
        <Modal onClose={handleModalClose}>
          <LoginModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
