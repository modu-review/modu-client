import React from 'react';

export default function ContactPage() {
  return (
    <div className="w-full max-w-md mt-6 p-6 bg-white rounded-lg shadow-md">
      <form className="flex flex-col space-y-4 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Me </h2>
        <label htmlFor="name">이름: </label>
        <input
          type="text"
          name="name"
          id="name"
          autoFocus
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <label htmlFor="email">이메일: </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <label htmlFor="message">문의 내용: </label>
        <textarea
          rows={10}
          id="message"
          name="message"
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button type="submit" className="bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition">
          전송
        </button>
      </form>
    </div>
  );
}
