import Link from 'next/link';

type Props = {
  title: string;
  linkText: string;
  linkHref: string;
};

export default function Empty({linkText, linkHref, title}: Props) {
  return (
    <section className="w-full h-[290px] md:h-[380px] pb-10 md:pb-0 flex flex-col justify-center items-center">
      <p className="text-lg md:text-xl font-semibold mb-2 text-boldBlue">{title}</p>
      <Link
        href={linkHref}
        className="text-sm text-white md:font-semibold border-2 border-boldBlue px-3 py-1.5 rounded-md bg-boldBlue hover:bg-lightBlue hover:text-boldBlue transition-colors"
      >
        {linkText}
      </Link>
    </section>
  );
}
