'use client';
import DarkModeBtn from './DarkModeBtn';
import Link from 'next/link';
import { JwtPayload, jwtDecode } from 'jwt-decode';
const axios = require('axios');
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

const Header = () => {
  const router = useRouter();

  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  axios.defaults.headers.common['Authorization'] = `token`;

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
    console.log(decoded);
    userId = decoded.userId;
    user_nickname = decoded.USER_NICKNAME;
    user_image = decoded.USER_IMAGE;
  }

  if (token) {
    return (
      <header className='py-5 px-5 flex items-center justify-between'>
        <Link href='/'>
          <h4 className='font-popins font-bold text-xl'>신상 프로젝트</h4>
        </Link>
        <div className='flex m-2'>
          <div className='mr-2'>
            <DarkModeBtn />
          </div>
          <div>
            <div>
              <Image src={user_image} width={30} height={30} alt='' />
            </div>
            <div>{user_nickname}</div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className='py-5 px-5 flex items-center justify-between'>
        <Link href='/'>
          <h4 className='font-popins font-bold text-xl'>신상 프로젝트</h4>
        </Link>
        <div className='flex m-2'>
          <div className='mr-2'>
            <DarkModeBtn />
          </div>
          <Link href='/login' className='ml-4'>
            로그인{user_nickname}
          </Link>
        </div>
      </header>
    );
  }
};
export default Header;
