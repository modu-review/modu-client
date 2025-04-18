import {Editor} from '@tiptap/react';
import {alignOptions, headingOptions, markOptions, structureOptions} from '../consts/toolbarConfig';
import ToolbarGroup from './ToolbarGroup';
import ToolbarButton from './ToolbarButton';
import ToolbarLine from './ToolbarLine';
import AddLink from './AddLink';
import AddImage from './AddImage';
import ToolbarTooltip from './ToolbarTooltip';
import {EditorActiveState} from '../../model/type';

type Props = {
  editor: Editor;
  editorState: EditorActiveState;
};

export default function Toolbar({editor, editorState}: Props) {
  return (
    <section className="border-b py-2 md:pb-3 w-full flex flex-wrap justify-center items-center gap-2">
      <ToolbarGroup>
        {headingOptions.map(({icon, action, stateKey, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton icon={icon} onClick={() => action(editor)} iconType="node" active={editorState[stateKey]} />
          </ToolbarTooltip>
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {markOptions.map(({icon, action, stateKey, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton icon={icon} onClick={() => action(editor)} iconType="marks" active={editorState[stateKey]} />
          </ToolbarTooltip>
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {alignOptions.map(({icon, action, stateKey, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton icon={icon} onClick={() => action(editor)} iconType="node" active={editorState[stateKey]} />
          </ToolbarTooltip>
        ))}
        <ToolbarButton icon="Minus" iconType="node" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        <AddImage editor={editor} />
        <ToolbarTooltip text="링크 추가">
          <AddLink editor={editor} />
        </ToolbarTooltip>
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {structureOptions.map(({icon, action, stateKey, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton icon={icon} onClick={() => action(editor)} iconType="node" active={editorState[stateKey]} />
          </ToolbarTooltip>
        ))}
      </ToolbarGroup>
    </section>
  );
}
