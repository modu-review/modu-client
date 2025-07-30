'use client';

import {RemoveScroll} from 'react-remove-scroll';
import EditorMetaForm from './EditorMetaForm';
import EditorContainer from './EditorContainer';
import EditorFooter from './EditorFooter';
import {usePreview, useSubmitReview} from '../lib';
import {EditorInitialData} from '../model/type';
import {Viewer, ViewerModal} from '@/features/review/viewer';
import {ReviewPayload} from '@/entities/review';
import {Modal} from '@/shared/ui/modal';
import {LoadingSpinner} from '@/shared/ui/components';

type Props = {
  onSave: (data: ReviewPayload) => void;
  isPending: boolean;
} & EditorInitialData;

export default function Editor({title, category, content, onSave, isPending}: Props) {
  const {preview, openModal, handleModalClose, openPreview} = usePreview();

  const {handleSetActionPreview, handleSetActionSave, handleSetContentGetter, handleSubmit} = useSubmitReview({
    onPreview: openPreview,
    onSave,
  });

  return (
    <RemoveScroll className="h-full">
      <section className="flex flex-col w-full bg-white max-w-5xl h-full mx-auto shadow-lg pt-4">
        <EditorMetaForm onSubmit={handleSubmit} initialTitle={title} initialCategory={category} />
        <EditorContainer onMount={handleSetContentGetter} initialContent={content} />
        <EditorFooter onPreview={handleSetActionPreview} onSave={handleSetActionSave} isPending={isPending} />
        {openModal && preview && (
          <Modal onClose={handleModalClose}>
            <ViewerModal>
              <Viewer {...preview} />
            </ViewerModal>
          </Modal>
        )}
        {isPending && (
          <div className="fixed inset-0 w-full h-full z-50 bg-black/70 text-white">
            <LoadingSpinner text="리뷰를 저장하고 있어요." />
          </div>
        )}
      </section>
    </RemoveScroll>
  );
}
