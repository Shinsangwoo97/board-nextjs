'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href='/board' className='ml-4'>
        자유 게시판
      </Link>
    </div>
  );
}
