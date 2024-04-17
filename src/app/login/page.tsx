'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../components/Input';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const login_button_click = async () => {
    console.log('로그인');
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return regex.test(password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(!validatePassword(value));
  };

  const kakao_login = async () => {
    const KAKAO_AUTH_URL = `https:/kauth.kakao.com/oauth/authorize?client_id=c7c24feb0cd407c889411dd192a5b7a8&redirect_uri=http://localhost:3000/kakao/callback&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-transparent">
      <div className="max-w-md w-full px-6 py-8 bg-transparent border border-gray-300 shadow-md rounded-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">신상 프로젝트</h2>
          <p className="text-sm">Shinsang Project</p>
        </div>
        <form className="mt-8" onSubmit={login_button_click}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <Input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            {emailError && <div className="text-red-500 text-xs mt-1">유효한 이메일을 입력하세요</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <Input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
            />
            {passwordError && <div className="text-red-500 text-xs mt-1">영문, 숫자, 특수문자를 포함한 8~16자리를 입력하세요</div>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            로그인
          </button>
        </form>
        <div className="mt-6 flex justify-center items-center">
          <div className="text-center text-sm">
            <Link href="/join" className="underline">회원가입</Link>
            <span className="mx-2">|</span>
            <Link href="/passwordFind" className="underline">비밀번호 찾기</Link>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-center items-center">
            <button onClick={kakao_login} className="focus:outline-none">
              <Image
                src="/icon/kakao_login.png"
                alt="카카오 로그인"
                width={300}
                height={100}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
