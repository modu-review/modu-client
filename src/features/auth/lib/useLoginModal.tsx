import {Modal, useModal} from '@/shared/ui/modal';
import LoginModal from '../ui/LoginModal';

export default function useLoginModal() {
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const renderLoginModal = () => {
    return (
      <Modal onClose={handleModalClose}>
        <LoginModal onClose={handleModalClose} />
      </Modal>
    );
  };

  return {isOpenLoginModal: openModal, openLoginModal: handleModalOpen, renderLoginModal};
}
