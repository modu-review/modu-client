type Props = {
  children: React.ReactNode;
};

export default function ViewerModal({children}: Props) {
  return <section className="z-30 bg-white w-4/5 max-w-5xl h-[90%] rounded-md">{children}</section>;
}
