'use client';

import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'custom-editor-image',
        },
      }),
      TextAlign.configure({types: ['heading', 'paragraph']}),
    ],
    editorProps: {
      scrollThreshold: 100,
      scrollMargin: 100,
      attributes: {
        class: 'prose prose-p:my-3 prose-h1:font-bold lg:prose-lg focus:outline-none',
      },
    },
    immediatelyRender: false,
    autofocus: true,
  });

  return <EditorContent editor={editor} />;
}
