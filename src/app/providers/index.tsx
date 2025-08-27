import AuthProvider from './AuthProvider';
import GlobalErrorDetector from './GlobalErrorDetector';
import NotificationProvider from './NotificationProvider';
import ReactQueryProvider from './ReactQueryProvider';
import UnPredictableErrorBoundary from './UnPredictableErrorBoundary';

type Props = {
  children: React.ReactNode;
};

const Providers = ({children}: Props) => {
  return (
    <UnPredictableErrorBoundary>
      <GlobalErrorDetector>
        <ReactQueryProvider>
          <AuthProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </GlobalErrorDetector>
    </UnPredictableErrorBoundary>
  );
};

export default Providers;
