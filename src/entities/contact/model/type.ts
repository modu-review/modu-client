import {z} from 'zod';
import {contactFormSchema} from './../consts/rule';

export type contactFormSchemaType = z.infer<typeof contactFormSchema>;
