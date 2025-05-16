import AuthProvider from './AuthProvider';
import GlobalErrorDetector from './GlobalErrorDetector';
import ReactQueryProvider from './ReactQueryProvider';
import UnPredictableErrorBoundary from './UnPredictableErrorBoundary';

type Props = {
  children: React.ReactNode;
};

const Providers = ({children}: Props) => {
  return (
    <UnPredictableErrorBoundary>
      <AuthProvider>
        <GlobalErrorDetector>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </GlobalErrorDetector>
      </AuthProvider>
    </UnPredictableErrorBoundary>
  );
};

export default Providers;
