import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/shared/shadcnComponent/ui/form';
import {Input} from '@/shared/shadcnComponent/ui/input';
import {Textarea} from '@/shared/shadcnComponent/ui/textarea';
import React from 'react';
import {Control, FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  isTextarea?: boolean;
  className?: string;
  rules?: RegisterOptions<T>;
};

export default function FormInputField<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  isTextarea,
  className,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({field}) => (
        <FormItem>
          <FormLabel className="text-[17px] font-semibold">{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea {...field} placeholder={placeholder} className={className} />
            ) : (
              <Input {...field} placeholder={placeholder} className={className} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
