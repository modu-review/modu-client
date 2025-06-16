import {ToolbarConfig} from '../model/type';

const headingOptions: ToolbarConfig[] = [
  {
    icon: 'Heading1',
    action: editor => editor.chain().focus().toggleHeading({level: 1}).run(),
    stateKey: 'isHeading1',
    text: '제목1',
  },
  {
    icon: 'Heading2',
    action: editor => editor.chain().focus().toggleHeading({level: 2}).run(),
    stateKey: 'isHeading2',
    text: '제목2',
  },
  {
    icon: 'Heading3',
    action: editor => editor.chain().focus().toggleHeading({level: 3}).run(),
    stateKey: 'isHeading3',
    text: '제목3',
  },
];

const markOptions: ToolbarConfig[] = [
  {
    icon: 'Bold',
    action: editor => editor.chain().focus().toggleBold().run(),
    stateKey: 'isBold',
    text: '굵게',
  },
  {
    icon: 'Italic',
    action: editor => editor.chain().focus().toggleItalic().run(),
    stateKey: 'isItalic',
    text: '기울임',
  },
  {
    icon: 'Strikethrough',
    action: editor => editor.chain().focus().toggleStrike().run(),
    stateKey: 'isStrike',
    text: '취소선',
  },
];

const structureOptions: ToolbarConfig[] = [
  {
    icon: 'TextQuote',
    action: editor => editor.chain().focus().toggleBlockquote().run(),
    stateKey: 'isBlockquote',
    text: '인용',
  },
  {
    icon: 'List',
    action: editor => editor.chain().focus().toggleBulletList().run(),
    stateKey: 'isBulletList',
    text: '목록',
  },
  {
    icon: 'ListOrdered',
    action: editor => editor.chain().focus().toggleOrderedList().run(),
    stateKey: 'isOrderedList',
    text: '번호 목록',
  },
];

const alignOptions: ToolbarConfig[] = [
  {
    icon: 'AlignLeft',
    action: editor => editor.chain().focus().setTextAlign('left').run(),
    stateKey: 'isAlignLeft',
    text: '왼쪽 정렬',
  },
  {
    icon: 'AlignCenter',
    action: editor => editor.chain().focus().setTextAlign('center').run(),
    stateKey: 'isAlignCenter',
    text: '가운데 정렬',
  },
  {
    icon: 'AlignRight',
    action: editor => editor.chain().focus().setTextAlign('right').run(),
    stateKey: 'isAlignRight',
    text: '오른쪽 정렬',
  },
];

export {headingOptions, markOptions, structureOptions, alignOptions};
