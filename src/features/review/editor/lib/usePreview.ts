import {useState} from 'react';
import {useModal} from '@/shared/ui/modal';
import {ReviewDetail} from '@/entities/review';

function usePreview() {
  const [preview, setPreview] = useState<ReviewDetail | null>(null);
  const {openModal, handleModalOpen, handleModalClose} = useModal(() => setPreview(null));

  const openPreview = (data: ReviewDetail) => {
    setPreview(data);
    handleModalOpen();
  };

  return {
    preview,
    openModal,
    handleModalClose,
    openPreview,
  };
}

export default usePreview;
