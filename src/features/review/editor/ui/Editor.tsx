'use client';

import EditorMetaForm from './EditorMetaForm';
import {Viewer, ViewerModal} from '../../viewer';
import {usePreview, useSubmitReview} from '../lib';
import {Modal} from '@/shared/ui/modal';
import {Button} from '@/shared/shadcnComponent/ui/button';
import EditorContainer from './EditorContainer';
import {useRouter} from 'next/navigation';

export default function Editor() {
  const {preview, openModal, handleModalClose, openPreview} = usePreview();
  const {handleSetActionPreview, handleSetActionSave, handleSetContentGetter, handleSubmit} = useSubmitReview({
    onPreview: openPreview,
    onSave: data => console.log(data),
  });

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="flex flex-col w-full max-w-5xl h-full mx-auto shadow-lg pt-4">
      <EditorMetaForm onSubmit={handleSubmit} />
      <EditorContainer onMount={handleSetContentGetter} />
      <section className="w-full bg-white border-t border-gray-300 p-4 flex items-center justify-between">
        <Button variant="link" onClick={handleGoBack}>
          나가기
        </Button>
        <div className="flex gap-3">
          <Button
            className="border border-boldBlue bg-white text-boldBlue hover:bg-gray-100"
            form="editor-meta-form"
            type="submit"
            onClick={handleSetActionPreview}
          >
            미리보기
          </Button>
          <Button
            className="bg-boldBlue hover:bg-boldBlue/80"
            form="editor-meta-form"
            type="submit"
            onClick={handleSetActionSave}
          >
            저장하기
          </Button>
        </div>
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
