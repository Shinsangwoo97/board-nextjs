'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href='/login' className='ml-4'>
        내용
      </Link>
    </div>
  );
}
