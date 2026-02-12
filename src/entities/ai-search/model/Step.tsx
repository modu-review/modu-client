type Props = {
  children: React.ReactNode;
};

export function Step({children}: Props) {
  return <div className="flex flex-col gap-6 animate-fade-in p-2 pb-6">{children}</div>;
}
