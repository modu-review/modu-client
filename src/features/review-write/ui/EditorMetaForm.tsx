import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormSchema} from '../consts/rule';
import {CATEGORY_LIST} from '../consts/categoryList';
import {FormSchemaType} from '../model/type';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/shared/shadcnComponent/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/shared/shadcnComponent/ui/select';
import {Input} from '@/shared/shadcnComponent/ui/input';

type Props = {
  onSubmit: (values: FormSchemaType) => void;
};

export default function EditorMetaForm({onSubmit}: Props) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      category: undefined,
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 mb-2 px-2" id="editor-meta-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-xl py-2 border-none focus:outline-none"
                  spellCheck="false"
                  placeholder="제목을 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[160px] focus:outline-none outline-none selection:outline-none">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORY_LIST.map(({value, label}) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
