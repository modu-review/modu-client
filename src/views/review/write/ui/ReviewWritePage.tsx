import {Editor} from '@/features/review-write';
import checkSession from '@/shared/lib/utils/checkSession';

export default async function ReviewWritePage() {
  await checkSession();

  return (
    <section>
      <Editor />
    </section>
  );
}
