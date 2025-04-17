import {ToobarAlign, ToolbarBase, ToolbarHeading, ToolbarStructure} from '../model/type';

const headingOptions: ToolbarHeading[] = [
  {
    icon: 'Heading1',
    action: editor => editor.chain().focus().toggleHeading({level: 1}).run(),
    isActiveType: 'heading',
    isActiveAttrs: {level: 1},
  },
  {
    icon: 'Heading2',
    action: editor => editor.chain().focus().toggleHeading({level: 2}).run(),
    isActiveType: 'heading',
    isActiveAttrs: {level: 2},
  },
  {
    icon: 'Heading3',
    action: editor => editor.chain().focus().toggleHeading({level: 3}).run(),
    isActiveType: 'heading',
    isActiveAttrs: {level: 3},
  },
];

const markOptions: ToolbarBase[] = [
  {
    icon: 'Bold',
    action: editor => editor.chain().focus().toggleBold().run(),
    isActiveType: 'bold',
  },
  {
    icon: 'Italic',
    action: editor => editor.chain().focus().toggleItalic().run(),
    isActiveType: 'italic',
  },
  {
    icon: 'Strikethrough',
    action: editor => editor.chain().focus().toggleStrike().run(),
    isActiveType: 'strike',
  },
];

const structureOptions: ToolbarStructure[] = [
  {
    icon: 'TextQuote',
    action: editor => editor.chain().focus().toggleBlockquote().run(),
    isActiveType: 'blockquote',
  },
  {
    icon: 'List',
    action: editor => editor.chain().focus().toggleBulletList().run(),
    isActiveType: 'bulletList',
  },
  {
    icon: 'ListOrdered',
    action: editor => editor.chain().focus().toggleOrderedList().run(),
    isActiveType: 'orderedList',
  },
  {
    icon: 'Minus',
    action: editor => editor.chain().focus().setHorizontalRule().run(),
  },
];

const alignOptions: ToobarAlign[] = [
  {
    icon: 'AlignLeft',
    action: editor => editor.chain().focus().setTextAlign('left').run(),
    isActiveAttrs: {textAlign: 'left'},
  },
  {
    icon: 'AlignCenter',
    action: editor => editor.chain().focus().setTextAlign('center').run(),
    isActiveAttrs: {textAlign: 'center'},
  },
  {
    icon: 'AlignRight',
    action: editor => editor.chain().focus().setTextAlign('right').run(),
    isActiveAttrs: {textAlign: 'right'},
  },
];

export {headingOptions, markOptions, structureOptions, alignOptions};
