'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center">나만의 게시판</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/board">
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">자유 게시판</h2>
            <p className="text-lg text-white">자유롭게 글을 작성하고 소통해보세요.</p>
          </div>
        </Link>
        <Link href="/image-board">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">이미지 게시판</h2>
            <p className="text-lg text-white">이미지와 함께 글을 작성해보세요.</p>
          </div>
        </Link>
        <Link href="https://www.shin-sangwoo.com">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">신상우 포트폴리오</h2>
            <p className="text-lg text-white">제 포트폴리오를 확인해보세요.</p>
          </div>
        </Link>
        <Link href="https://github.com/Shinsangwoo97">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">GitHub</h2>
            <p className="text-lg text-white">GitHub에서 저의 프로젝트를 확인해보세요.</p>
          </div>
        </Link>
        {/* <Link href="/music">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <h2 className="text-2xl font-bold text-white mb-2">음악 플레이어</h2>
            <p className="text-lg text-white">음악을 들으며 휴식하세요.</p>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
