import {ClientError} from '@/shared/lib/utils/client-error';

function isAborted(error: unknown): boolean {
  if (error instanceof ClientError) {
    return error.errorCode === 'UPLOAD_CANCELLED';
  }

  if (error instanceof Error) {
    return error.message === 'Upload cancelled' || error.name === 'AbortError';
  }

  if (error instanceof DOMException) {
    return error.name === 'AbortError';
  }

  return false;
}

export default isAborted;
