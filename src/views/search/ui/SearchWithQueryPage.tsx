type Props = {
  params: Promise<{query: string}>;
};

export default async function SearchWithQueryPage({params}: Props) {
  const {query} = await params;

  return <section>{decodeURIComponent(query)} 검색 페이지</section>;
}
