import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

export default function Avatar({src, alt}: Props) {
  return (
    <div className="rounded-full flex justify-center items-center min-w-10 h-10 md:min-w-11 md:h-11 bg-boldBlue">
      <Image
        className="rounded-full bg-white object-cover w-9 h-9 md:w-10 md:h-10"
        src={src}
        alt={alt}
        width={40}
        height={40}
      />
    </div>
  );
}
