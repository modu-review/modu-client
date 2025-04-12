'use client';

import {EditorContent} from '@tiptap/react';
import useReviewEditor from '../lib/useReviewEditor';

export default function Editor() {
  const {editor, editorRef} = useReviewEditor();

  return (
    <section className="w-full h-[80vh] flex flex-col relative max-w-5xl shadow-lg">
      <EditorContent ref={editorRef} spellCheck="false" className="p-5 h-full overflow-auto" editor={editor} />
    </section>
  );
}
