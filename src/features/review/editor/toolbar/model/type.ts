import {EditorActiveState} from './../../model/type';
import {icons} from 'lucide-react';
import {Editor} from '@tiptap/react';

type ActiveStateKey = keyof EditorActiveState;

export type ToolbarConfig = {
  icon: keyof typeof icons;
  action: (editor: Editor) => void;
  stateKey: ActiveStateKey;
  text: string;
};
