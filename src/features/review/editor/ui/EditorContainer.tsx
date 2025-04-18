import {useEffect} from 'react';
import {useReviewEditor} from '../lib';
import {Toolbar} from '../toolbar';
import {EditorContent} from '@tiptap/react';
import {EditorContentGetter} from '../model/type';

type Props = {
  onMount: (getter: EditorContentGetter) => void;
};

export default function EditorContainer({onMount}: Props) {
  const {editor, editorState, editorRef} = useReviewEditor();

  useEffect(() => {
    if (!editor) return;

    onMount(() => ({
      html: editor.getHTML(),
      json: editor.getJSON(),
    }));
  }, [editor, onMount]);

  if (!editor || !editorState) return null;

  return (
    <>
      <Toolbar editor={editor} editorState={editorState} />
      <EditorContent spellCheck="false" className="p-5 h-full overflow-auto" ref={editorRef} editor={editor} />
    </>
  );
}
