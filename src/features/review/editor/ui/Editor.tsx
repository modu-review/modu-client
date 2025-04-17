'use client';

import EditorMetaForm from './EditorMetaForm';
import {Viewer, ViewerModal} from '../../viewer';
import {usePreview, useSubmitReview} from '../lib';
import {Modal} from '@/shared/ui/modal';
import {Button} from '@/shared/shadcnComponent/ui/button';
import EditorContainer from './EditorContainer';

export default function Editor() {
  const {preview, openModal, handleModalClose, openPreview} = usePreview();
  const {handleSetActionPreview, handleSetActionSave, handleSetContentGetter, handleSubmit} = useSubmitReview({
    onPreview: openPreview,
    onSave: data => console.log(data),
  });

  return (
    <section className="flex flex-col w-full max-w-5xl h-full mx-auto shadow-lg pt-4">
      <EditorMetaForm onSubmit={handleSubmit} />
      <EditorContainer onMount={handleSetContentGetter} />
      <section className="w-full bg-white border-t border-gray-300 p-4 flex justify-end items-center gap-3">
        <Button form="editor-meta-form" type="submit" onClick={handleSetActionPreview}>
          미리보기
        </Button>
        <Button form="editor-meta-form" type="submit" onClick={handleSetActionSave}>
          저장하기
        </Button>
      </section>
      {openModal && preview && (
        <Modal onClose={handleModalClose}>
          <ViewerModal>
            <Viewer {...preview} />
          </ViewerModal>
        </Modal>
      )}
    </section>
  );
}
