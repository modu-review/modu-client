'use client';

import {useRef} from 'react';
import {EditorContent} from '@tiptap/react';
import useReviewEditor from '../lib/useReviewEditor';
import {Toolbar} from '../toolbar';
import EditorMetaForm from './EditorMetaForm';
import {FormSchemaType, SubmitAction} from '../model/type';
import {Button} from '@/shared/shadcnComponent/ui/button';
import {useUserId} from '@/entities/auth';

export default function Editor() {
  const {editor, editorRef} = useReviewEditor();
  const actionRef = useRef<SubmitAction>('preview');
  const userId = useUserId();

  if (!editor) {
    return null;
  }

  const handleSubmit = (formValues: FormSchemaType) => {
    const {current: type} = actionRef;

    const commonPayload = {
      ...formValues,
      author: userId,
    };

    switch (type) {
      case 'preview':
        const previewContent = editor.getHTML();
        console.log({...commonPayload, content: previewContent});

        break;
      case 'save':
        const saveContent = editor.getJSON();
        console.log({...commonPayload, content: saveContent});

        break;
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`허용되지 않은 저장 타입입니다. type: ${_exhaustiveCheck}`);
    }
  };

  const handleSetAction = (action: SubmitAction) => {
    actionRef.current = action;
  };

  return (
    <section className="w-full h-[80vh] flex flex-col relative shadow-lg">
      <header>
        <EditorMetaForm onSubmit={handleSubmit} />
        <Toolbar editor={editor} />
      </header>
      <EditorContent ref={editorRef} spellCheck="false" className="p-5 h-full overflow-auto" editor={editor} />
      <section className="w-full bg-white border-t border-gray-300 p-4 flex justify-end items-center gap-3">
        <Button form="editor-meta-form" type="submit" onClick={() => handleSetAction('preview')}>
          미리보기
        </Button>
        <Button form="editor-meta-form" type="submit" onClick={() => handleSetAction('save')}>
          저장하기
        </Button>
      </section>
    </section>
  );
}
