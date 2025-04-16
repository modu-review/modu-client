import {Editor} from '@tiptap/react';
import {alignOptions, headingOptions, markOptions, structureOptions} from '../consts/toolbarConfig';
import ToolbarGroup from './ToolbarGroup';
import ToolbarButton from './ToolbarButton';
import ToolbarLine from './ToolbarLine';
import AddLink from './AddLink';
import AddImage from './AddImage';

type Props = {
  editor: Editor;
};

export default function Toolbar({editor}: Props) {
  return (
    <section className="bg-white w-full flex flex-wrap justify-center items-center gap-2">
      <ToolbarGroup>
        {headingOptions.map(({icon, action, isActiveType, isActiveAttrs}) => (
          <ToolbarButton
            key={icon}
            icon={icon}
            onClick={() => action(editor)}
            iconType="node"
            active={editor.isActive(isActiveType, isActiveAttrs)}
          />
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {markOptions.map(({icon, action, isActiveType}) => (
          <ToolbarButton
            key={icon}
            icon={icon}
            onClick={() => action(editor)}
            iconType="marks"
            active={editor.isActive(isActiveType)}
          />
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {structureOptions.map(({icon, action, isActiveType}) => (
          <ToolbarButton
            key={icon}
            icon={icon}
            onClick={() => action(editor)}
            iconType="node"
            active={editor.isActive(isActiveType)}
          />
        ))}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        <AddImage editor={editor} />
        <AddLink editor={editor} />
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {alignOptions.map(({icon, action, isActiveAttrs}) => (
          <ToolbarButton
            key={icon}
            icon={icon}
            onClick={() => action(editor)}
            iconType="node"
            active={editor.isActive(isActiveAttrs)}
          />
        ))}
      </ToolbarGroup>
    </section>
  );
}
