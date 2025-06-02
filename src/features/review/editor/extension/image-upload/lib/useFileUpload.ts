import {useState} from 'react';
import {FileItem, UploadOptions} from '../model/type';
import isAborted from './isAborted';
import {ClientError, createClientError} from '@/shared/lib/utils/client-error';

export default function useFileUpload(options: UploadOptions) {
  const [fileItem, setFileItem] = useState<FileItem | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (file.size > options.maxSize) throw createClientError('MAX_SIZE_EXCEEDED');

    const abortController = new AbortController();

    const newFileItem: FileItem = {
      file,
      progress: 0,
      status: 'uploading',
      abortController,
    };

    setFileItem(newFileItem);

    try {
      const url = await options.upload(
        file,
        (event: {progress: number}) => {
          setFileItem(prev => {
            if (!prev) return null;

            return {
              ...prev,
              progress: event.progress,
            };
          });
        },
        abortController.signal,
      );

      if (!url) throw createClientError('UPLOAD_FAILED');

      setFileItem(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'success',
          url,
          progress: 100,
        };
      });

      return url;
    } catch (error) {
      if (!abortController.signal.aborted) {
        setFileItem(prev => {
          if (!prev) return null;
          return {
            ...prev,
            status: 'error',
            progress: 0,
          };
        });
      }

      if (isAborted(error)) {
        return null;
      }

      options.onError?.(error instanceof ClientError ? error : createClientError('UPLOAD_FAILED'));

      return null;
    }
  };

  const clearFileItem = () => {
    if (!fileItem) return;

    fileItem.abortController.abort();
    setFileItem(null);
  };

  return {
    fileItem,
    uploadFile,
    clearFileItem,
  };
}
