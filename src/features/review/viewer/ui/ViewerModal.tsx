type Props = {
  children: React.ReactNode;
};

export default function ViewerModal({children}: Props) {
  return <section className="z-30 bg-white w-full md:w-4/5 max-w-5xl h-full md:h-[90%] rounded-md">{children}</section>;
}
