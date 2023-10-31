'use client';
import DarkModeBtn from './DarkModeBtn';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5 px-5 flex items-center justify-between'>
      <Link href='/'>
        <h4 className='font-popins font-bold text-xl'>신상</h4>
      </Link>
      <div className='flex m-2'>
        <div className='mr-2'>
          <DarkModeBtn />
        </div>
        <Link href='/login' className='ml-4'>
          로그인
        </Link>
      </div>
    </header>
  );
};
export default Header;
