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
      <GlobalErrorDetector>
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </GlobalErrorDetector>
    </UnPredictableErrorBoundary>
  );
};

export default Providers;
