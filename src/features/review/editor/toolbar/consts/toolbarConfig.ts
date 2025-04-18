import {ToobarAlign, ToolbarBase, ToolbarHeading, ToolbarStructure} from '../model/type';

const headingOptions: ToolbarHeading[] = [
  {
    icon: 'Heading1',
    action: editor => editor.chain().focus().toggleHeading({level: 1}).run(),
    isActiveType: 'heading',
    isActiveAttrs: {level: 1},
    text: '제목1',
  },
  {
    icon: 'Heading2',
    action: editor => editor.chain().focus().toggleHeading({level: 2}).run(),
    isActiveType: 'heading',
    isActiveAttrs: {level: 2},
    text: '제목2',
  },
  {
    icon: 'Heading3',
    action: editor => editor.chain().focus().toggleHeading({level: 3}).run(),
    isActiveType: 'heading',
    isActiveAttrs: {level: 3},
    text: '제목3',
  },
];

const markOptions: ToolbarBase[] = [
  {
    icon: 'Bold',
    action: editor => editor.chain().focus().toggleBold().run(),
    isActiveType: 'bold',
    text: '굵게',
  },
  {
    icon: 'Italic',
    action: editor => editor.chain().focus().toggleItalic().run(),
    isActiveType: 'italic',
    text: '기울임',
  },
  {
    icon: 'Strikethrough',
    action: editor => editor.chain().focus().toggleStrike().run(),
    isActiveType: 'strike',
    text: '취소선',
  },
];

const structureOptions: ToolbarStructure[] = [
  {
    icon: 'TextQuote',
    action: editor => editor.chain().focus().toggleBlockquote().run(),
    isActiveType: 'blockquote',
    text: '인용',
  },
  {
    icon: 'List',
    action: editor => editor.chain().focus().toggleBulletList().run(),
    isActiveType: 'bulletList',
    text: '목록',
  },
  {
    icon: 'ListOrdered',
    action: editor => editor.chain().focus().toggleOrderedList().run(),
    isActiveType: 'orderedList',
    text: '번호 목록',
  },
  {
    icon: 'Minus',
    action: editor => editor.chain().focus().setHorizontalRule().run(),
    text: '구분선',
  },
];

const alignOptions: ToobarAlign[] = [
  {
    icon: 'AlignLeft',
    action: editor => editor.chain().focus().setTextAlign('left').run(),
    isActiveAttrs: {textAlign: 'left'},
    text: '왼쪽 정렬',
  },
  {
    icon: 'AlignCenter',
    action: editor => editor.chain().focus().setTextAlign('center').run(),
    isActiveAttrs: {textAlign: 'center'},
    text: '가운데 정렬',
  },
  {
    icon: 'AlignRight',
    action: editor => editor.chain().focus().setTextAlign('right').run(),
    isActiveAttrs: {textAlign: 'right'},
    text: '오른쪽 정렬',
  },
];

export {headingOptions, markOptions, structureOptions, alignOptions};
