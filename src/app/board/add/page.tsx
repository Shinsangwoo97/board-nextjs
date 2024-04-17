'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const axios = require('axios');

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<any>({});
  const imageEl = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const imageUpload = (e: any) => {
    const imageTpye = e.target.files[0].type.includes('image');
    setImage({
      url: URL.createObjectURL(e.target.files[0]),
      image: imageTpye,
      file: e.target.files[0],
    });
  };
  const handleSubmit = async () => {
    const post_data = {
      title: title,
      content: content,
    };

    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("post_data", JSON.stringify(post_data));

    try {
      let result = await axios.post(
        'http://localhost:8080/api/board/add',
        formData
      );
      if (result.data.success === 0) {
        Swal.fire('알림', result.data.message);
        return;
      }
      if (result.data.success === 1) {
        router.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div>제목</div>
        <input
          type='text'
          className='border h-9 w-full border-gray-400 mt-2 text-center'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <div>내용</div>
        <input
          type='text'
          className='border h-60 w-full border-gray-400 mt-2 text-center'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div>사진 첨부</div>
        <input
          type='file'
          accept='image/png , image/jpg, image/jpeg'
          onChange={imageUpload}
          ref={imageEl}
          className='hidden'
        />
        <button
          className='border border-zinc-300 rounded py-2 px-5 mb-5 mt-1'
          onClick={() => imageEl.current?.click()}
        >
          Upload
        </button>
        <button
          className='bg-green-500 px-10 py-3 rounded-full mr-3'
          onClick={handleSubmit}
        >
          SAVE
        </button>
        <div className='w-[300px] h-[300px] bg-slate-200'>
          <Image
            src={image?.url}
            className='w-full h-full object-contain'
            alt=''
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
