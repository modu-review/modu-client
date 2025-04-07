import AuthProvider from './AuthProvider';
import GlobalErrorDetector from './GlobalErrorDetector';
import ReactQueryProvider from './ReactQueryProvider';

type Props = {
  children: React.ReactNode;
};

const Providers = ({children}: Props) => {
  return (
    <AuthProvider>
      <GlobalErrorDetector>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </GlobalErrorDetector>
    </AuthProvider>
  );
};

export default Providers;
