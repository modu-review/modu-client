import {LucideIcon} from '../icons';

type Props = {
  text?: string;
};

export default function LoadingSpinner({text}: Props) {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center animate-pulse">
      {text && <p className="text-xl md:text-2xl font-semibold mb-4">{text}</p>}
      <LucideIcon name="Disc3" className="animate-spin w-[40px] h-[40px] md:w-[45px] md:h-[45px]" />
    </section>
  );
}
