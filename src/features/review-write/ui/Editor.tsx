'use client';

import {EditorContent} from '@tiptap/react';
import useReviewEditor from '../lib/useReviewEditor';
import {Toolbar} from '../toolbar';

export default function Editor() {
  const {editor, editorRef} = useReviewEditor();

  if (!editor) {
    return null;
  }

  return (
    <section className="w-full h-[80vh] flex flex-col relative shadow-lg">
      <header>
        <Toolbar editor={editor} />
      </header>
      <EditorContent ref={editorRef} spellCheck="false" className="p-5 h-full overflow-auto" editor={editor} />
    </section>
  );
}
