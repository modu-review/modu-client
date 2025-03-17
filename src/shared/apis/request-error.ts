import {TBody, TMethod} from './api-service';

// API 요청 중 발생하는 에러 객체 타입
type TRequestError = Error & {
  status: number;
  endpoint: string;
  method?: TMethod;
  requestBody: TBody;
  errorCode: string;
  message: string;
};

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

export default RequestError;
