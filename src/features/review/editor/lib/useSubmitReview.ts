import {useCallback, useRef} from 'react';
import {EditorContentGetter, FormSchemaType, SubmitAction} from '../model/type';
import {ReviewContent, ReviewPayload} from '@/entities/review';
import {useUserEmail, useUserId} from '@/entities/auth';
import {createClientError} from '@/shared/lib/utils/client-error';

type Props = {
  onPreview: (data: ReviewContent) => void;
  onSave: (data: ReviewPayload) => void;
};

function useSubmitReview({onPreview, onSave}: Props) {
  const editorContentGetterRef = useRef<EditorContentGetter>(() => ({html: '', json: {}}));
  const actionRef = useRef<SubmitAction>('preview');

  const userEmail = useUserEmail();
  const userId = useUserId();

  const handleSetActionPreview = useCallback(() => {
    actionRef.current = 'preview';
  }, []);

  const handleSetActionSave = useCallback(() => {
    actionRef.current = 'save';
  }, []);

  const handleSetContentGetter = (getter: EditorContentGetter) => {
    editorContentGetterRef.current = getter;
  };

  const handleSubmit = (formValues: FormSchemaType) => {
    if (!userEmail || !userId) {
      throw createClientError('LOGIN_REQUIRED');
    }

    const {current: type} = actionRef;
    const {current: getContent} = editorContentGetterRef;

    const {html} = getContent();

    const commonPayload = {
      ...formValues,
      content: html,
    };

    switch (type) {
      case 'preview':
        return onPreview({...commonPayload, author_id: userId, author_email: userEmail, created_at: '0000-00-00'});
      case 'save':
        return onSave({...commonPayload, authorEmail: userEmail});
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`허용되지 않은 저장 타입입니다. type: ${_exhaustiveCheck}`);
    }
  };

  return {handleSetActionPreview, handleSetActionSave, handleSetContentGetter, handleSubmit};
}

export default useSubmitReview;
