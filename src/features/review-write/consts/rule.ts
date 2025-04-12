import {z} from 'zod';
import {CATEGORY_VALUES} from './categoryList';

export const FormSchema = z.object({
  title: z
    .string({
      required_error: '제목은 필수 입력 사항입니다.',
    })
    .min(3, '제목은 3자 이상 입력해주세요.')
    .max(40, '제목은 40자 이하만 입력 가능합니다.'),
  category: z.enum(CATEGORY_VALUES, {
    required_error: '카테고리는 필수 입력 사항입니다.',
    invalid_type_error: '존재하지 않는 카테고리입니다.',
  }),
});
