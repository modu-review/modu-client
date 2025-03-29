import {RequestError} from '@/shared/apis/request-error';

// RequestError 타입인지 확인합니다.
function isRequestError(error: Error): error is RequestError {
  return error instanceof RequestError;
}

export default isRequestError;
