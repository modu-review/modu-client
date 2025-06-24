import {Editor} from '@/features/review/editor';
import checkSession from '@/shared/lib/utils/checkSession';

export default async function NewReviewPage() {
  await checkSession();

  return (
    <section className="fixed inset-0 w-full h-full bg-white">
      <Editor />
    </section>
  );
}
