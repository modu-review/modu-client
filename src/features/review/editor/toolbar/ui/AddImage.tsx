import {Editor} from '@tiptap/react';
import {LucideIcon} from '@/shared/ui/icons';
import ToolbarTooltip from './ToolbarTooltip';

type Props = {
  editor: Editor;
};

export default function AddImage({editor}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const tempUrl = URL.createObjectURL(file);

    editor.chain().focus().setImage({src: tempUrl}).run();
  };

  return (
    <ToolbarTooltip text="이미지 추가">
      <label
        htmlFor="upload-image"
        className="w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-100 cursor-pointer"
      >
        <input id="upload-image" className="hidden" type="file" accept="image/*" onChange={handleChange} />
        <LucideIcon name="Images" className="w-[20px] h-[20px]" />
      </label>
    </ToolbarTooltip>
  );
}
