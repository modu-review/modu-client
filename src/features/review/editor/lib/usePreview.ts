import {useState} from 'react';
import {useModal} from '@/shared/ui/modal';
import {ReviewContent} from '@/entities/review';

function usePreview() {
  const [preview, setPreview] = useState<ReviewContent | null>(null);
  const {openModal, handleModalOpen, handleModalClose} = useModal(() => setPreview(null));

  const openPreview = (data: ReviewContent) => {
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
