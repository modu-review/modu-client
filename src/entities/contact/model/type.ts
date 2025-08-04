import {z} from 'zod';
import {contactFormSchema} from './../consts/rule';

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

export type ContactFormField = {
  name: 'name' | 'email' | 'message';
  label: string;
  placeholder: string;
  isTextarea: boolean;
};
