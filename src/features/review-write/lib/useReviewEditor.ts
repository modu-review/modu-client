import {useCallback} from 'react';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';

function useReviewEditor() {
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

  const editorRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !editor) return;

      const handleClick = (e: MouseEvent) => {
        if (!editor.isFocused && node.contains(e.target as Node)) {
          editor.commands.focus('end');
        }
      };

      node.addEventListener('click', handleClick);

      return () => node.removeEventListener('click', handleClick);
    },
    [editor],
  );

  return {editor, editorRef};
}

export default useReviewEditor;
