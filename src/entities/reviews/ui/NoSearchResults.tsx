type Props = {
  title: string;
  description: string;
  description2?: string;
};

export default function NoSearchResults({title, description, description2}: Props) {
  return (
    <section className="flex flex-col items-center mt-[80px] md:mt-[130px]">
      <h2 className="text-lg md:text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 text-center">
        <span>{description}</span>
        {description2 && (
          <>
            <br className="md:hidden" />
            <span>{description2}</span>
          </>
        )}
      </p>
    </section>
  );
}
