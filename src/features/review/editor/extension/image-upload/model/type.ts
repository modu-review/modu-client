import { RequestError } from '@/shared/apis/request-error';
import {ClientError} from '@/shared/lib/utils/client-error';

export type UploadFunction = (
  file: File,
  onProgress: (event: {progress: number}) => void,
  abortSignal: AbortSignal,
) => Promise<string>;

export type ImageUploadNodeOptions = {
  accept?: string;
  maxSize?: number;
  upload?: UploadFunction;
  onError?: (error: ClientError | RequestError) => void;
};

export type FileItem = {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  abortController: AbortController;
};

export type UploadOptions = {
  maxSize: number;
  accept: string;
  upload: (file: File, onProgress: (event: {progress: number}) => void, abortSignal: AbortSignal) => Promise<string>;
  onError: (error: ClientError | RequestError) => void;
};
