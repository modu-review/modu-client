import {ERROR_MESSAGE} from '../consts/errorMessage';
import {ClientError} from './client-error';

// 약속한 클라이언트 에러인지 확인합니다.
function isClientError(error: Error) {
  return error instanceof ClientError && ERROR_MESSAGE[error.errorCode] !== undefined;
}

export default isClientError;
