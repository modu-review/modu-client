import {Editor} from '@tiptap/react';
import {alignOptions, headingOptions, markOptions, structureOptions} from '../consts/toolbarConfig';
import ToolbarGroup from './ToolbarGroup';
import ToolbarButton from './ToolbarButton';
import ToolbarLine from './ToolbarLine';
import AddLink from './AddLink';
import AddImage from './AddImage';
import ToolbarTooltip from './ToolbarTooltip';

type Props = {
  editor: Editor;
};

export default function Toolbar({editor}: Props) {
  return (
    <section className="border-b py-2 md:pb-3 w-full flex flex-wrap justify-center items-center gap-2">
      <ToolbarGroup>
        {headingOptions.map(({icon, action, isActiveType, isActiveAttrs, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton
              icon={icon}
              onClick={() => action(editor)}
              iconType="node"
              active={editor.isActive(isActiveType, isActiveAttrs)}
            />
          </ToolbarTooltip>
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {markOptions.map(({icon, action, isActiveType, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton
              icon={icon}
              onClick={() => action(editor)}
              iconType="marks"
              active={editor.isActive(isActiveType)}
            />
          </ToolbarTooltip>
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {alignOptions.map(({icon, action, isActiveAttrs, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton
              icon={icon}
              onClick={() => action(editor)}
              iconType="node"
              active={editor.isActive(isActiveAttrs)}
            />
          </ToolbarTooltip>
        ))}
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
        {structureOptions.map(({icon, action, isActiveType, text}) => (
          <ToolbarTooltip key={icon} text={text}>
            <ToolbarButton
              icon={icon}
              onClick={() => action(editor)}
              iconType="node"
              {...(isActiveType && {active: editor.isActive(isActiveType)})}
            />
          </ToolbarTooltip>
        ))}
      </ToolbarGroup>
    </section>
  );
}
