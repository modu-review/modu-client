import {z} from 'zod';
import {JSONContent} from '@tiptap/react';
import {CATEGORY_LIST} from '../../shared/consts/categoryList';
import {FormSchema} from '../consts/rule';

export type CategoryValue = (typeof CATEGORY_LIST)[number]['value'];

export type FormSchemaType = z.infer<typeof FormSchema>;

export type SubmitAction = 'preview' | 'save';

export type EditorSerializedContent = {
  html: string;
  json: JSONContent;
};

export type EditorContentGetter = () => EditorSerializedContent;
