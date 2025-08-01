'use client';

import {Modal, useModal} from '@/shared/ui/modal';
import React from 'react';
import {useForm} from 'react-hook-form';
import AlertModal from './AlertModal';
import {Form} from '@/shared/shadcnComponent/ui/form';
import {Button} from '@/shared/shadcnComponent/ui/button';
import FormInputField from './FormInputField';

type Form = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const form = useForm<Form>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  const {reset, getValues} = form;

  // 취소버튼 눌렀을 시
  const handleCancel = () => {
    handleModalClose();
  };

  // 확인버튼 눌렀을 시
  const handleConfirm = async () => {
    const data = getValues();
    console.log('Form data submitted:', data);
    try {
      await fetch('/api/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Slack 전송완료');
    } catch (error) {
      console.error('Slack 전송 실패:', error);
    }
    reset(); // 폼 초기화
    handleModalClose(); // 모달 닫기
  };

  const onValid = (data: Form) => {
    if (!data) return;
    handleModalOpen(); //모달 열기
  };

  return (
    <div className="w-full max-w-md mt-6 p-6 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="flex flex-col space-y-4 w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Me </h2>
          <FormInputField
            control={form.control}
            name="name"
            label="이름"
            placeholder="이름을 입력해주세요."
            rules={{required: '이름을 입력해주세요.'}}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <FormInputField
            control={form.control}
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            rules={{
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            }}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <FormInputField
            control={form.control}
            name="message"
            label="문의 내용"
            isTextarea
            placeholder="문의 내용을 입력해주세요."
            rules={{required: '문의 내용을 입력해주세요.'}}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Button
            type="submit"
            className="bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition"
          >
            전송
          </Button>
        </form>
      </Form>
      {openModal && (
        <Modal onClose={handleModalClose}>
          <AlertModal onCancel={handleCancel} onConfirm={handleConfirm} message={'전송을 완료하시겠습니까?'} />
        </Modal>
      )}
    </div>
  );
}
