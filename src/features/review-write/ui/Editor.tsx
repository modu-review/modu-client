'use client';

import {EditorContent} from '@tiptap/react';
import useReviewEditor from '../lib/useReviewEditor';
import {Toolbar} from '../toolbar';
import EditorMetaForm from './EditorMetaForm';
import {Button} from '@/shared/shadcnComponent/ui/button';

export default function Editor() {
  const {editor, editorRef} = useReviewEditor();

  if (!editor) {
    return null;
  }

  return (
    <section className="w-full h-[80vh] flex flex-col relative shadow-lg">
      <header>
        <EditorMetaForm />
        <Toolbar editor={editor} />
      </header>
      <EditorContent ref={editorRef} spellCheck="false" className="p-5 h-full overflow-auto" editor={editor} />
      <section className="w-full bg-white border-t border-gray-300 p-4 flex justify-end items-center gap-3">
        <Button form="editor-meta-form" type="submit">
          미리보기
        </Button>
        <Button>저장하기</Button>
      </section>
    </section>
  );
}
