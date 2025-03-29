import {TErrorHandling, TRequestError, WithErrorHandling} from './request-type';

// API 요청 중 발생한 에러의 정보가 담긴 커스텀 에러 클래스
class RequestError extends Error {
  requestBody;
  status;
  endpoint;
  method;
  errorCode;

  constructor({status, endpoint, method, requestBody, errorCode, message, name}: TRequestError) {
    super(errorCode);

    this.status = status;
    this.endpoint = endpoint;
    this.method = method;
    this.requestBody = requestBody;
    this.errorCode = errorCode;
    this.message = message;
    this.name = name;
  }
}

class RequestGetError extends RequestError {
  errorHandlingType: TErrorHandling;

  constructor({errorHandlingType = 'errorBoundary', ...rest}: WithErrorHandling<TRequestError>) {
    super(rest);

    this.errorHandlingType = errorHandlingType;
  }
}

export {RequestError, RequestGetError};
