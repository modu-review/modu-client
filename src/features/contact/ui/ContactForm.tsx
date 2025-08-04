'use client';

import {AlertModal, Modal, useModal} from '@/shared/ui/modal';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Form} from '@/shared/shadcnComponent/ui/form';
import {Button} from '@/shared/shadcnComponent/ui/button';
import FormInputField from './FormInputField';
import {sendSlackMessage} from '@/shared/apis/sendSlackMessage';
import {motion} from 'framer-motion';
import SubmittedContactFormAnimation from './SubmittedContactFormAnimation';
import {zodResolver} from '@hookform/resolvers/zod';
import {contactFormSchema, ContactFormSchemaType} from '@/entities/contact';

export default function ContactForm() {
  const {openModal, handleModalOpen, handleModalClose} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
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
    try {
      await sendSlackMessage(data);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      reset(); // 폼 초기화
      handleModalClose(); // 모달 닫기
    } catch (error) {
      console.error('Slack 메시지 전송 실패:', error);
    }
  };

  const onValid = (data: ContactFormSchemaType) => {
    if (!data) return;
    handleModalOpen(); //모달 열기
  };

  return (
    <>
      <motion.div
        initial={{scale: 0.95, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: 0.5}}
        className="bg-white w-full max-w-4xl p-16  flex items-start rounded-3xl shadow-xl relative overflow-hidden"
      >
        {isSubmitted && <SubmittedContactFormAnimation />}
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onValid)}
            key="form"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            className="flex flex-col justify-between h-full space-y-6 w-full"
          >
            <motion.h2
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1}}
              className="text-4xl font-bold m-4 mb-10 text-boldBlue text-center"
            >
              문의하기
            </motion.h2>
            <FormInputField
              control={form.control}
              name="name"
              label="이름"
              placeholder="이름을 입력해주세요."
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <FormInputField
              control={form.control}
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <FormInputField
              control={form.control}
              name="message"
              label="문의 내용"
              isTextarea
              placeholder="문의 내용을 입력해주세요."
              className="!text-lg rounded-lg leading-normal p-4 resize-none h-[250px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-[16px]"
            />
            <Button
              type="submit"
              className="bg-boldBlue !mt-20 text-white font-extrabold py-6 rounded-xl hover:bg-gray-700 transition"
            >
              전송
            </Button>
          </motion.form>
        </Form>
      </motion.div>
      {openModal && (
        <Modal onClose={handleModalClose}>
          <AlertModal onCancel={handleCancel} onConfirm={handleConfirm} message={'전송을 완료하시겠습니까?'} />
        </Modal>
      )}
    </>
  );
}
