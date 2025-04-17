import {useCallback, useRef} from 'react';
import {ReviewContent} from '../../shared/model/type';
import {EditorContentGetter, FormSchemaType, SubmitAction} from '../model/type';
import {useUserId} from '@/entities/auth';
import {createClientError} from '@/shared/lib/utils/client-error';

type Props = {
  onPreview: (data: ReviewContent) => void;
  onSave: (data: Omit<ReviewContent, 'created_at'>) => void;
};

function useSubmitReview({onPreview, onSave}: Props) {
  const editorContentGetterRef = useRef<EditorContentGetter>(() => ({html: '', json: {}}));
  const actionRef = useRef<SubmitAction>('preview');
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
    if (!userId) {
      throw createClientError('LOGIN_REQUIRED');
    }

    const {current: type} = actionRef;
    const {current: getContent} = editorContentGetterRef;

    const {html, json} = getContent();

    const commonPayload = {
      ...formValues,
      author: userId,
    };

    switch (type) {
      case 'preview':
        return onPreview({...commonPayload, created_at: '0000-00-00', content: html});
      case 'save':
        return onSave({...commonPayload, content: json});
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`허용되지 않은 저장 타입입니다. type: ${_exhaustiveCheck}`);
    }
  };

  return {handleSetActionPreview, handleSetActionSave, handleSetContentGetter, handleSubmit};
}

export default useSubmitReview;
