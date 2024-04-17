'use client';
import Link from 'next/link';
import Image from 'next/image';


export default function Home() {
  return (
    <div className="container min-w-100px w-auto max-w-900 mx-auto mt-20">
  <div className="card flex flex-col items-center bg-gradient-to-tr from-blue-400 to-red-400 text-xl font-mono p-4 rounded-md text-white" >
    <div className="cover flex flex-col items-center min-w-80px w-auto max-w-880px">
    </div>
    <audio id="song" className="block w-full max-w-md mx-auto" controls>
      </audio>
      <div className="mt-4">
      </div>
  </div>
</div>
  );
}