import {SERVER_ERROR_MESSAGE} from '../consts/errorMessage';
import isRequestError from './isRequestError';

// 서버 에러가 예측 가능한지 확인합니다.
function isPredictableServerError(error: Error) {
  if (isRequestError(error) && error.errorCode === 'INTERNAL_SERVER_ERROR') return false;

  return isRequestError(error) && SERVER_ERROR_MESSAGE[error.errorCode] !== undefined;
}

export default isPredictableServerError;
