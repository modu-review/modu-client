import {RequestError} from '@/shared/apis/request-error';
import {captureException, SeverityLevel, withScope} from '@sentry/nextjs';

type ReportErrorToSentry = {
  error: RequestError | Error;
  level?: SeverityLevel;
  type: 'API' | 'Rendering';
};

export function reportErrorToSentry({level = 'error', error, type}: ReportErrorToSentry) {
  withScope(scope => {
    scope.setLevel(level);
    scope.setTag('error_type', `${type} - ${error.name}`);

    if (error instanceof RequestError) {
      const {name, message, endpoint, status, requestBody, method} = error;
      scope.setTags({
        title: name,
        message,
        endpoint,
        status,
        requestBody: JSON.stringify(requestBody),
        method,
      });
    } else {
      const {name, message} = error;
      scope.setTags({
        title: name,
        message,
      });
    }

    captureException(error);
  });
}
