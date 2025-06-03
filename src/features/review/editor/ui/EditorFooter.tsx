import {useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/shared/shadcnComponent/ui/button';

type Props = {
  onPreview: () => void;
  onSave: () => void;
  isPending: boolean;
};

export default function EditorFooter({onPreview, onSave, isPending}: Props) {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <section className="w-full bg-white border-t border-gray-300 p-4 flex items-center justify-between">
      <Button variant="link" onClick={handleGoBack}>
        나가기
      </Button>
      <div className="flex gap-3">
        <Button
          className="border border-boldBlue bg-white text-boldBlue hover:bg-gray-100"
          form="editor-meta-form"
          type="submit"
          disabled={isPending}
          onClick={onPreview}
        >
          미리보기
        </Button>
        <Button
          className="bg-boldBlue hover:bg-boldBlue/80"
          form="editor-meta-form"
          type="submit"
          disabled={isPending}
          onClick={onSave}
        >
          저장하기
        </Button>
      </div>
    </section>
  );
}
