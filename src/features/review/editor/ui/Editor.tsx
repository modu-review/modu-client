'use client';

import EditorMetaForm from './EditorMetaForm';
import EditorContainer from './EditorContainer';
import EditorFooter from './EditorFooter';
import {Viewer, ViewerModal} from '../../viewer';
import {usePreview, useSaveReview, useSubmitReview} from '../lib';
import {EditorInitialData} from '../model/type';
import {Modal} from '@/shared/ui/modal';
import {LoadingSpinner} from '@/shared/ui/components';

export default function Editor({title, category, content}: EditorInitialData) {
  const {preview, openModal, handleModalClose, openPreview} = usePreview();
  const {saveReview, isPending} = useSaveReview();

  const {handleSetActionPreview, handleSetActionSave, handleSetContentGetter, handleSubmit} = useSubmitReview({
    onPreview: openPreview,
    onSave: saveReview,
  });

  return (
    <section className="flex flex-col w-full max-w-5xl h-full mx-auto shadow-lg pt-4">
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
  );
}
