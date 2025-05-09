import {ERROR_MESSAGE} from '../consts/errorMessage';

export type ClientErrorCode = keyof typeof ERROR_MESSAGE;

class ClientError extends Error {
  errorCode: ClientErrorCode;

  constructor(code: ClientErrorCode) {
    super(ERROR_MESSAGE[code]);

    this.errorCode = code;
  }
}

// 클라이언트 에러를 생성합니다.
function createClientError(code: ClientErrorCode) {
  return new ClientError(code);
}

export {ClientError, createClientError};
