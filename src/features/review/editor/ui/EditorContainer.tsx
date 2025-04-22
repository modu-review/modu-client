import {useEffect} from 'react';
import {useReviewEditor} from '../lib';
import {Toolbar} from '../toolbar';
import {EditorContent} from '@tiptap/react';
import {EditorContentGetter} from '../model/type';
import {LoadingSpinner} from '@/shared/ui/components';

type Props = {
  onMount: (getter: EditorContentGetter) => void;
  initialContent?: string;
};

export default function EditorContainer({onMount, initialContent}: Props) {
  const {editor, editorState, editorRef} = useReviewEditor(initialContent);

  useEffect(() => {
    if (!editor) return;

    onMount(() => ({
      html: editor.getHTML(),
    }));
  }, [editor, onMount]);

  if (!editor || !editorState) {
    return <LoadingSpinner text="에디터 정보를 불러오고 있어요." />;
  }

  return (
    <>
      <Toolbar editor={editor} editorState={editorState} />
      <EditorContent spellCheck="false" className="p-5 h-full overflow-auto" ref={editorRef} editor={editor} />
    </>
  );
}
