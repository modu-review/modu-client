import ReactQueryProvider from './ReactQueryProvider';

type Props = {
  children: React.ReactNode;
};

const Providers = ({children}: Props) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
