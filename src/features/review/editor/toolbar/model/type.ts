import {icons} from 'lucide-react';
import {Editor} from '@tiptap/react';

export type ToolbarBase = {
  icon: keyof typeof icons;
  action: (editor: Editor) => void;
  isActiveType: string;
};

export type ToolbarHeading = ToolbarBase & {
  isActiveAttrs: Record<string, number>;
};

export type ToobarAlign = Omit<ToolbarBase, 'isActiveType'> & {
  isActiveAttrs: Record<string, string>;
};
