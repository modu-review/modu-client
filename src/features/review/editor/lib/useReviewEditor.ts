import {useCallback} from 'react';
import {useEditor, useEditorState} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import {useUpdateGlobalError} from '@/entities/error';
import ImageUploadNode from '../extension/image-upload';
import handleImageUpload from './handleImageUpload';
import validateLinkUrl from './validateLinkUrl';

function useReviewEditor(initialContent?: string) {
  const updateError = useUpdateGlobalError();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'custom-editor-image',
        },
      }),
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: 5 * 1024 * 1024,
        upload: handleImageUpload,
        onError: updateError,
      }),
      TextAlign.configure({types: ['heading', 'paragraph'], defaultAlignment: 'left'}),
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'cursor-pointer text-blue-500 hover:text-blue-600',
        },
        isAllowedUri: (url, ctx) => validateLinkUrl({url, ctx, onError: updateError}),
        shouldAutoLink: url => url.startsWith('https://'),
      }).extend({
        inclusive: false,
      }),
    ],
    editorProps: {
      scrollThreshold: 100,
      scrollMargin: 100,
      attributes: {
        class:
          'prose prose-p:my-3 prose-h1:font-bold lg:prose-lg focus:outline-none prose-h1:text-[1.9em] md:prose-h1:text-[2.1em]',
      },
    },
    immediatelyRender: false,
    autofocus: true,
    shouldRerenderOnTransaction: false,
    content: initialContent,
  });

  const editorState = useEditorState({
    editor,
    selector: snapshot => {
      const {editor} = snapshot;

      if (!editor) return null;

      return {
        isHeading1: editor.isActive('heading', {level: 1}),
        isHeading2: editor.isActive('heading', {level: 2}),
        isHeading3: editor.isActive('heading', {level: 3}),
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isStrike: editor.isActive('strike'),
        isBlockquote: editor.isActive('blockquote'),
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
        isAlignLeft: editor.isActive({textAlign: 'left'}),
        isAlignCenter: editor.isActive({textAlign: 'center'}),
        isAlignRight: editor.isActive({textAlign: 'right'}),
        isLink: editor.isActive('link'),
      };
    },
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

  return {editor, editorState, editorRef};
}

export default useReviewEditor;
