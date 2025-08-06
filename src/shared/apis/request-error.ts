import {TErrorHandling, TRequestError, WithErrorHandling} from './request-type';

// API 요청 중 발생한 에러의 정보가 담긴 커스텀 에러 클래스
class RequestError extends Error {
  requestBody;
  status;
  endpoint;
  method;

  constructor({name, message, status, endpoint, method, requestBody}: TRequestError) {
    super(message);

    this.name = name;
    this.status = status;
    this.endpoint = endpoint;
    this.method = method;
    this.requestBody = requestBody;
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
