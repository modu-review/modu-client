import {useEffect} from 'react';
import {useReviewEditor} from '../lib';
import {Toolbar} from '../toolbar';
import {EditorContent} from '@tiptap/react';
import {EditorContentGetter} from '../model/type';

type Props = {
  onMount: (getter: EditorContentGetter) => void;
};

export default function EditorContainer({onMount}: Props) {
  const {editor, editorRef} = useReviewEditor();

  useEffect(() => {
    if (!editor) return;

    onMount(() => ({
      html: editor.getHTML(),
      json: editor.getJSON(),
    }));
  }, [editor, onMount]);

  if (!editor) return null;

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent spellCheck="false" className="p-5 h-full overflow-auto" ref={editorRef} editor={editor} />
    </>
  );
}
