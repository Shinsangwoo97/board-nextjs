'use client';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../components/Input';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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

  return (
    <div>
      <div>
        <div className='p-6'>
          <div className='font-bold flex flex-col items-center pt-10'>
            <div className='text-3xl italic'>신상</div>
            <div className='text-sm'>shinsang</div>
          </div>
          <div className='flex flex-col items-center pt-10 '>
            {/* 이메일 입력창 */}
            <div className='w-full sm:max-w-md'>
              <div
                className={emailError ? 'text-red-500 font-bold' : 'font-bold'}
              >
                이메일
              </div>
              <Input
                className={emailError ? 'border-red-500' : undefined}
                placeholder='ex) newplay@ground.co.kr'
                type='email'
                autoComplete='off'
                value={email}
                onChange={handleEmailChange}
                onSubmit={login_button_click}
                error={emailError}
              />
              {emailError && (
                <div className='text-red-500 text-sm'>이메일 에러메시지</div>
              )}
            </div>
            {/* 비밀번호 입력창 */}
            <div className='w-full sm:max-w-md'>
              <div
                className={
                  passwordError ? 'text-red-500 font-bold' : 'font-bold'
                }
              >
                비밀번호
              </div>
              <Input
                className={passwordError ? 'border-red-500' : undefined}
                placeholder=''
                type='password'
                autoComplete='off'
                value={password}
                onChange={handlePasswordChange}
                onSubmit={login_button_click}
                error={passwordError}
              />
              {passwordError && (
                <div className='text-red-500 text-sm'>비밀번호 에러 메세지</div>
              )}
            </div>
            {/* 로그인 버튼 */}
            <button
              type='submit'
              className='w-full mt-4 p-4 border-solid border-2 font-bold rounded-xl sm:max-w-md'
              onClick={login_button_click}
            >
              로그인
            </button>
            {/* 회원가입 및 이메일,비밀번호 찾기 */}
            <div className='opacity-50 mt-5 flex inset-x-0 bottom-0 text-xs gap-2'>
              <button
                className='underline'
                // onClick={() => router.push(`/document/privacy_statement`)}
              >
                회원가입 및 이메일, 비밀번호 찾기
              </button>
              <div>|</div>
              <button
                // onClick={() => router.push(`/document/general_termsand_conditions`)}
                className='underline'
              >
                비밀번호 찾기
              </button>
              <div>|</div>
              <button
                // onClick={() => router.push(`/document/general_termsand_conditions`)}
                className='underline'
              >
                회원가입
              </button>
            </div>
            <div className='m-6'>
              <div>
                {/* 이주소는 만들어줘야함 */}
                <Link href='https:/kauth.kakao.com/oauth/authorize?client_id=c7c24feb0cd407c889411dd192a5b7a8&redirect_uri=http://localhost:8080/oauth/kakao&response_type=code'>
                  <Image
                    src={`/icon/kakao_login.png`}
                    alt='카카오 로그인'
                    // loading="lazy"
                    className='w-80 h-16 object-cover object-center rouneded rounded-xl'
                    priority={true}
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=account_email
// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code-info
