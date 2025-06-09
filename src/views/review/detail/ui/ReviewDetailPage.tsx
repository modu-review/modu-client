type Props = {
  params: Promise<{reviewId: string}>;
};

export default async function ReviewDetailPage({params}: Props) {
  const {reviewId} = await params;
  return (
    <section>
      <h2>{reviewId} 상세보기</h2>
    </section>
  );
}
