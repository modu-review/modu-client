type Props = {
  children: React.ReactNode;
};

export function Step({children}: Props) {
  return <div className="flex flex-col h-full justify-between animate-fade-in p-2">{children}</div>;
}
