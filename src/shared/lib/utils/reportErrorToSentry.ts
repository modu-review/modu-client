import {RequestError} from '@/shared/apis/request-error';
import {captureException, SeverityLevel, withScope} from '@sentry/nextjs';

type ReportErrorToSentry = {
  error: RequestError;
  level?: SeverityLevel;
};

export function reportErrorToSentry({level = 'error', error}: ReportErrorToSentry) {
  withScope(scope => {
    scope.setLevel(level);

    const {name, message, endpoint, status, requestBody, method} = error;
    scope.setTags({
      title: name,
      message,
      endpoint,
      status,
      requestBody: JSON.stringify(requestBody),
      method,
    });

    captureException(error);
  });
}
