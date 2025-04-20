import {z} from 'zod';
import {CATEGORY_LIST} from '../../shared/consts/categoryList';
import {FormSchema} from '../consts/rule';

export type CategoryValue = (typeof CATEGORY_LIST)[number]['value'];

export type FormSchemaType = z.infer<typeof FormSchema>;

export type SubmitAction = 'preview' | 'save';

export type EditorSerializedContent = {
  html: string;
};

export type EditorContentGetter = () => EditorSerializedContent;

export type EditorActiveState = {
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isBold: boolean;
  isItalic: boolean;
  isStrike: boolean;
  isBlockquote: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
  isLink: boolean;
};
