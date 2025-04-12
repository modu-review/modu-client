'use client';

import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>테스트</p>',
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
