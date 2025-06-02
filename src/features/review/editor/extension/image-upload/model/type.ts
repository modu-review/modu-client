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
  onError?: (error: ClientError) => void;
};
