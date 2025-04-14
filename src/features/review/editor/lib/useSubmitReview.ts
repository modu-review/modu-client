import {useRef} from 'react';
import {Editor} from '@tiptap/react';
import {ReviewContent} from '../../shared/model/type';
import {FormSchemaType, SubmitAction} from '../model/type';
import {useUserId} from '@/entities/auth';
import {createClientError} from '@/shared/lib/utils/client-error';

type Props = {
  editor: Editor | null;
  onPreview: (data: ReviewContent) => void;
  onSave: (data: Omit<ReviewContent, 'created_at'>) => void;
};

function useSubmitReview({editor, onPreview, onSave}: Props) {
  const actionRef = useRef<SubmitAction>('preview');
  const userId = useUserId();

  const handleSetAction = (action: SubmitAction) => {
    actionRef.current = action;
  };

  const handleSubmit = (formValues: FormSchemaType) => {
    if (!editor) {
      return null;
    }

    if (!userId) {
      throw createClientError('LOGIN_REQUIRED');
    }

    const {current: type} = actionRef;

    const commonPayload = {
      ...formValues,
      author: userId,
    };

    switch (type) {
      case 'preview':
        const previewContent = editor.getHTML();
        onPreview({...commonPayload, created_at: '0000-00-00', content: previewContent});

        break;
      case 'save':
        const saveContent = editor.getJSON();
        onSave({...commonPayload, content: saveContent});

        break;
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`허용되지 않은 저장 타입입니다. type: ${_exhaustiveCheck}`);
    }
  };

  return {handleSetAction, handleSubmit};
}

export default useSubmitReview;
