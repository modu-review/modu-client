import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/shared/shadcnComponent/ui/form';
import {Input} from '@/shared/shadcnComponent/ui/input';
import {Textarea} from '@/shared/shadcnComponent/ui/textarea';
import React from 'react';
import {Control, FieldPath, FieldValues} from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  isTextarea?: boolean;
};

export default function FormInputField<T extends FieldValues>({
  control,
  name,

  label,
  placeholder,
  isTextarea,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel className="text-[17px] font-semibold">{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                aria-label={label}
                className="!text-lg rounded-lg leading-normal p-4 resize-none h-[250px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-[16px]"
              />
            ) : (
              <Input
                {...field}
                placeholder={placeholder}
                aria-label={label}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
