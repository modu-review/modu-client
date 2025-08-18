import {isDevelopment} from './env';
import {ClientError} from './client-error';
import {reportErrorToSentry} from './reportErrorToSentry';
import {RequestError} from '@/shared/apis/request-error';

export function reportError(error: RequestError | ClientError) {
  // 개발 완료 후 주석 해제.
  //   if (isDevelopment) return;

  if (error instanceof ClientError) return;

  // 500번대 에러는 예측 불가능한 에러로 센트리에 fatal 레벨로 보고해 즉시 슬랙으로 알림
  if (error.status >= 500 && error.status < 600) {
    reportErrorToSentry({level: 'fatal', error});
  }
}
