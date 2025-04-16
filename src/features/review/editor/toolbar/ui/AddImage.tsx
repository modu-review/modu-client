import {Editor} from '@tiptap/react';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  editor: Editor;
};

export default function AddImage({editor}: Props) {
  return (
    <label
      htmlFor="upload-image"
      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-100 cursor-pointer"
    >
      <input id="upload-image" className="hidden" type="file" accept="image/*" />
      <LucideIcon name="Images" className="w-[20px] h-[20px]" />
    </label>
  );
}
