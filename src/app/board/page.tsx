'use client';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../components/Input';
import { useRouter } from 'next/navigation';

const axios = require('axios');

export default function Home() {
  return (
    <div>
      <Link href='/board/add' className='ml-4'>
        게시물 추가
      </Link>
    </div>
  );
}
