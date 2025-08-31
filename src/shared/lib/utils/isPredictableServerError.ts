import {SERVER_ERROR_MESSAGE} from '../consts/errorMessage';
import isRequestError from './isRequestError';

function isPredictableServerError(error: Error) {
  return isRequestError(error) && SERVER_ERROR_MESSAGE[error.name] !== undefined;
}

export default isPredictableServerError;
