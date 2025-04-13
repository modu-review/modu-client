import {z} from 'zod';
import {CATEGORY_LIST} from '../../shared/consts/categoryList';
import {FormSchema} from '../consts/rule';

export type CategoryValue = (typeof CATEGORY_LIST)[number]['value'];

export type FormSchemaType = z.infer<typeof FormSchema>;

export type SubmitAction = 'preview' | 'save';
