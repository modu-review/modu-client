'use client';

import React from 'react';
import {useForm} from 'react-hook-form';

type Form = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>({});

  const onValid = async (data: Form) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="w-full max-w-md mt-6 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col space-y-4 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Me </h2>
        <label htmlFor="name">이름: </label>
        <input
          {...register('name', {required: '이름을 입력해주세요. '})}
          type="text"
          id="name"
          autoFocus
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        <label htmlFor="email">이메일: </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^\S+@\S+$/i,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label htmlFor="message">문의 내용: </label>
        <textarea
          rows={10}
          id="message"
          {...register('message', {required: '문의 내용을 입력해주세요.'})}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        <button type="submit" className="bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition">
          전송
        </button>
      </form>
    </div>
  );
}
