import {ErrorBoundary} from 'react-error-boundary';
import {GlobalErrorBoundary} from '@/widgets/errors/global-error-boundary';

type Props = {
  children: React.ReactNode;
};

export default function UnPredictableErrorBoundary({children}: Props) {
  return <ErrorBoundary FallbackComponent={GlobalErrorBoundary}>{children}</ErrorBoundary>;
}
