import {ChangeEvent, useRef} from 'react';
import {NodeViewProps, NodeViewWrapper} from '@tiptap/react';
import useFileUpload from '../lib/useFileUpload';
import {UploadOptions} from '../model/type';
import ImageUploadDragArea from './ImageUploadDragArea';
import ImageUploadDropZone from './ImageUploadDropZone';
import {createClientError} from '@/shared/lib/utils/client-error';

function ImageUploadNode(props: NodeViewProps) {
  const {accept, maxSize} = props.node.attrs;
  const inputRef = useRef<HTMLInputElement>(null);
  const extension = props.extension;

  const uploadOptions: UploadOptions = {
    accept,
    maxSize,
    upload: extension.options.upload,
    onError: extension.options.onError,
  };

  const {fileItem, uploadFile, clearFileItem} = useFileUpload(uploadOptions);

  const handleUpload = async (file: File) => {
    const url = await uploadFile(file);

    if (!url) return;

    const pos = props.getPos();
    const fileName = file.name.replace(/\.[^/.]+$/, '') || 'unknown';

    props.editor
      .chain()
      .focus()
      .deleteRange({from: pos, to: pos + 1})
      .insertContentAt(pos, [
        {
          type: 'image',
          attrs: {
            src: url,
            alt: fileName,
            title: fileName,
          },
        },
      ])
      .insertContentAt(pos + 1, {type: 'paragraph'})
      .run();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      extension.options.onError?.(createClientError('NO_IMAGE_SELECTED'));
      return;
    }

    if (files.length > 1) {
      extension.options.onError?.(createClientError('TOO_MANY_IMAGES_SELECTED'));
      return;
    }

    handleUpload(files[0]);
  };

  const handleClick = () => {
    if (inputRef.current && !fileItem) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  return (
    <NodeViewWrapper className="image-upload-box not-prose py-5" tabIndex={0} onClick={handleClick}>
      {!fileItem ? (
        <ImageUploadDragArea onFile={handleUpload} onError={uploadOptions.onError}>
          <ImageUploadDropZone maxSize={maxSize} />
          <input className="hidden" ref={inputRef} name="file" accept={accept} type="file" onChange={handleChange} />
        </ImageUploadDragArea>
      ) : (
        <div>{/** Todo: 이미지 업로드 상태 표시 */}</div>
      )}
    </NodeViewWrapper>
  );
}

export {ImageUploadNode};
