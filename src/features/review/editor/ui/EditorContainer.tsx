import {useEffect} from 'react';
import {useReviewEditor} from '../lib';
import {Toolbar} from '../toolbar';
import {EditorContent} from '@tiptap/react';
import {EditorContentGetter} from '../model/type';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  onMount: (getter: EditorContentGetter) => void;
};

export default function EditorContainer({onMount}: Props) {
  const {editor, editorState, editorRef} = useReviewEditor();

  useEffect(() => {
    if (!editor) return;

    onMount(() => ({
      html: editor.getHTML(),
    }));
  }, [editor, onMount]);

  if (!editor || !editorState) {
    return (
      <section className="w-full h-full flex flex-col justify-center items-center animate-pulse">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">에디터 정보를 불러오고 있어요.</h2>
        <LucideIcon name="Disc3" className="animate-spin w-[40px] h-[40px] md:w-[45px] md:h-[45px]" />
      </section>
    );
  }

  return (
    <>
      <Toolbar editor={editor} editorState={editorState} />
      <EditorContent spellCheck="false" className="p-5 h-full overflow-auto" ref={editorRef} editor={editor} />
    </>
  );
}
