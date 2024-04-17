'use client';
import Link from 'next/link';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const router = useRouter();

  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  let decoded;
  let userId;
  let user_image;
  let user_nickname;

  interface JwtPayload {
    name: string;
    exp: number;
    userId: number;
    USER_NICKNAME: string;
    USER_IMAGE: string;
    // whatever else is in the JWT.
  }

  if (token) {
    decoded = jwtDecode<JwtPayload>(token);
    userId = decoded.userId;
    user_nickname = decoded.USER_NICKNAME;
    user_image = decoded.USER_IMAGE;
  } else {
    // 토큰이 없을 때 홈 페이지로 이동
    router.push('/');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user_image && (
        <div className='relative w-60 h-60 rounded-full overflow-hidden'>
          <Image
            src={user_image}
            layout='fill'
            objectFit='cover'
            alt='프로필 이미지'
          />
        </div>
      )}
      <p className="mt-4 text-xl font-bold">{user_nickname}</p>
      {token && (
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          로그아웃
        </button>
      )}
    </div>
  );
}
