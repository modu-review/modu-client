import {MouseEvent, ReactElement} from 'react';
import Modal from './Modal';
import DeleteConfirmModal from './DeleteConfirmModal';
import {useModal} from '../lib/useModal';

type TriggerProps = {
  onClick: (e: MouseEvent) => void;
  disabled: boolean;
  'aria-disabled': boolean;
  tabIndex: number;
  'aria-label': string;
};

type Props = {
  children: (props: TriggerProps) => ReactElement;
  onConfirm: () => void;
  label: string;
  text?: string;
  isPending?: boolean;
};

export default function ConfirmDeleteTrigger({children, onConfirm, text, isPending, label}: Props) {
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const handleDeleteConfirm = () => {
    onConfirm();
    handleModalClose();
  };

  const triggerProps: TriggerProps = {
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      handleModalOpen();
    },
    tabIndex: isPending ? -1 : 0,
    disabled: isPending || false,
    'aria-disabled': isPending || false,
    'aria-label': label || '삭제',
  };

  return (
    <>
      {children(triggerProps)}
      {openModal && (
        <Modal onClose={handleModalClose}>
          <DeleteConfirmModal
            onDelete={handleDeleteConfirm}
            onDeleteCancel={handleModalClose}
            text={text || '삭제된 항목은 복구할 수 없어요.'}
          />
        </Modal>
      )}
    </>
  );
}
