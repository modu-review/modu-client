import {FormEvent, useCallback} from 'react';
import {Editor} from '@tiptap/react';
import ToolbarButton from './ToolbarButton';
import {Popover, PopoverContent, PopoverTrigger} from '@/shared/shadcnComponent/ui/popover';
import {Input} from '@/shared/shadcnComponent/ui/input';
import {Button} from '@/shared/shadcnComponent/ui/button';
import ToolbarTooltip from './ToolbarTooltip';

type Props = {
  editor: Editor;
};

export default function AddLink({editor}: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = (formData.get('url') as string).trim();

    const parsedUrl = url.includes(':') ? url : `https://${url}`;
    const chain = editor.chain().focus();

    if (url === null) return;

    if (url === '') {
      chain.extendMarkRange('link').unsetLink().run();

      return;
    }

    const {from, to, empty} = editor.state.selection;

    chain.extendMarkRange('link').setLink({href: parsedUrl});

    if (empty) {
      chain.insertContentAt({from, to}, parsedUrl);
    }

    chain.run();
  };

  const inputRef = useCallback(
    (node: HTMLInputElement) => {
      if (!node) return;

      const previousUrl = editor.getAttributes('link').href;

      if (previousUrl) {
        node.value = previousUrl;
      }
    },
    [editor],
  );

  return (
    <Popover>
      <ToolbarTooltip text="링크 추가">
        <PopoverTrigger asChild>
          <ToolbarButton icon="Link2" iconType="node" active={editor.isActive('link')} />
        </PopoverTrigger>
      </ToolbarTooltip>
      <PopoverContent>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h3 className="font-semibold mb-2 pl-1">링크 등록</h3>
          <Input
            className="focus:outline-none pl-2 py-1 mb-3"
            ref={inputRef}
            type="text"
            name="url"
            aria-label="링크 입력"
            autoFocus
            autoComplete="off"
          />
          <Button className="ml-auto h-8 px-4 bg-boldBlue text-white hover:bg-boldBlue/80" type="submit">
            등록하기
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
