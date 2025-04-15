'use client';

import {EditorContent} from '@tiptap/react';
import {Toolbar} from '../toolbar';
import EditorMetaForm from './EditorMetaForm';
import {Viewer, ViewerModal} from '../../viewer';
import {usePreview, useReviewEditor, useSubmitReview} from '../lib';
import {Modal} from '@/shared/ui/modal';
import {Button} from '@/shared/shadcnComponent/ui/button';

export default function Editor() {
  const {editor, editorRef} = useReviewEditor();
  const {preview, openModal, handleModalClose, openPreview} = usePreview();
  const {handleSetAction, handleSubmit} = useSubmitReview({
    editor,
    onPreview: openPreview,
    onSave: data => console.log(data),
  });

  if (!editor) {
    return null;
  }

  console.log(preview);

  return (
    <section className="flex flex-col w-full max-w-5xl h-full mx-auto shadow-lg pt-4">
      <header className="border-b pb-2 md:pb-3 flex flex-col gap-3">
        <EditorMetaForm onSubmit={handleSubmit} />
        <Toolbar editor={editor} />
      </header>
      <EditorContent ref={editorRef} spellCheck="false" className="p-5 h-full overflow-auto" editor={editor} />
      <section className="w-full bg-white border-t border-gray-300 p-4 flex justify-end items-center gap-3">
        <Button form="editor-meta-form" type="submit" onClick={() => handleSetAction('preview')}>
          미리보기
        </Button>
        <Button form="editor-meta-form" type="submit" onClick={() => handleSetAction('save')}>
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
