import {z} from 'zod';
import {FormSchema} from '../consts/rule';
import {Category} from '@/entities/review';

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

export type EditorInitialData = {
  title?: string;
  category?: Category;
  content?: string;
};
