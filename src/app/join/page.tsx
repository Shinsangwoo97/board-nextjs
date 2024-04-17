// !!!! 이미지 기본이미지 설정 및 오류수정
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiUser } from 'react-icons/fi'; // React Icons에서 사용할 아이콘 import
import axios from 'axios';
import Input from '../components/Input';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  const validateNickname = (nickname: string) => {
    // 닉네임은 한글, 영문자, 숫자로 이루어진 2자 이상 16자 이하의 문자열로 구성됨
    const regex = /^[가-힣a-zA-Z0-9]{2,16}$/;
    return regex.test(nickname);
  }

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return regex.test(password);
  };

  const vaildatePasswordMatchError = () => {
    return password !== confirmPassword;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(!validateNickname(e.target.value));
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setProfileImage(imageFile);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
    // Check if passwords match when the password field changes
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(e.target.value);
    setPasswordMatchError(password !== confirmPasswordValue);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if passwords match before submitting
    
    const post_data = {
      email : email,
      nickname : nickname,
      password : password,
    }

    // 회원가입 정보를 서버로 보내는 로직
    const formData = new FormData();
    formData.append('post_data', JSON.stringify(post_data));
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    let result = await axios.post('http://localhost:8080/api/signup', formData)
      .then((response) => {
        if(response.status === 200 ){
        router.push(`/login`);
        }
      })
      .catch((error : any) => {
        Swal.fire('알림', error.response.data, 'error');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center relative">
            {profileImage ? (
              <div
                className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={handleRemoveImage}
              >
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="프로필 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <label
                htmlFor="profileImage"
                className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <FiUser className="w-20 h-20 text-gray-500" />
                <span className="sr-only">프로필 사진 선택</span>
              </label>
            )}
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleProfileImageChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <Input
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            {emailError && <div className="text-red-500 text-xs mt-1">유효한 이메일을 입력하세요</div>}
          </div>
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <Input
              type="text"
              autoComplete="nickname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
              placeholder="닉네임"
              value={nickname}
              onChange={handleNicknameChange}
              error={nicknameError}
            />
            {nicknameError && <div className="text-red-500 text-xs mt-1">유효한 닉네임을 입력하세요</div>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <Input
              type="password"
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
            />
            {passwordError && <div className="text-red-500 text-xs mt-1">영문, 숫자, 특수문자를 포함한 8~16자리를 입력하세요</div>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <Input
              type="password"
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordMatchError}
            />
            {passwordMatchError && (
              <div className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
