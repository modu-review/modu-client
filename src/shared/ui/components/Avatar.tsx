import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  rounded?: 'rounded-full' | 'rounded-xl';
};

export default function Avatar({src, alt, rounded = 'rounded-full'}: Props) {
  return (
    <div className={`flex justify-center items-center min-w-10 h-10 md:min-w-11 md:h-11 bg-boldBlue ${rounded}`}>
      <Image
        className={`bg-white object-cover w-9 h-9 md:w-10 md:h-10 ${rounded}`}
        src={src}
        alt={alt}
        width={40}
        height={40}
      />
    </div>
  );
}
