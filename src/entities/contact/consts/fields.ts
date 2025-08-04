import {ContactFormField} from '../model/type';

export const FORM_FIELDS: ContactFormField[] = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력해주세요.',
    isTextarea: false,
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
    isTextarea: false,
  },
  {
    name: 'message',
    label: '메시지',
    placeholder: '메시지를 입력해주세요.',
    isTextarea: true,
  },
];
