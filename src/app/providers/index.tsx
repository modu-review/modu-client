import GlobalErrorDetector from './GlobalErrorDetector';
import ReactQueryProvider from './ReactQueryProvider';

type Props = {
  children: React.ReactNode;
};

const Providers = ({children}: Props) => {
  return (
    <GlobalErrorDetector>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </GlobalErrorDetector>
  );
};

export default Providers;
