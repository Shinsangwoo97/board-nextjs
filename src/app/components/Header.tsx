import DarkModeBtn from './DarkModeBtn';
import Link from 'next/link';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


const Header = () => {
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
  }

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSongName, setCurrentSongName] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSrcList = [
    "/music/Kostia_Deep_-_Pink_Clouds.mp3",
    "/music/Blueside_Music_-_Reggaeton_Afro_Pop.mp3",
    "/music/Vitality_-_Reckless_Roller.mp3"
    // Add more songs here
  ];

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    // Function to shuffle the songs
    const shuffleSongs = () => {
      const shuffledSongs = [...audioSrcList].sort(() => Math.random() - 0.5);
      return shuffledSongs;
    };

    const shuffledSongs = shuffleSongs();
    setCurrentSongIndex(0);
    setCurrentSongName(getSongName(shuffledSongs[0]));
    audioRef.current?.setAttribute('src', shuffledSongs[0]);
  }, []);

  const getSongName = (src: string) => {
    const startIndex = src.lastIndexOf('/') + 1;
    const endIndex = src.lastIndexOf('.mp3');
    return src.substring(startIndex, endIndex).replace(/_/g, ' ');
  };

  const handlePlayMusic = () => {
    if (isPlaying) {
      // Stop the music
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Play the music
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    let newIndex = currentSongIndex + 1;
    if (newIndex >= audioSrcList.length) {
      newIndex = 0; // Wrap around to the first song
    }
    setCurrentSongIndex(newIndex);
    setCurrentSongName(getSongName(audioSrcList[newIndex]));
    audioRef.current?.setAttribute('src', audioSrcList[newIndex]);
    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  const handlePrevSong = () => {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) {
      newIndex = audioSrcList.length - 1;
    }
    setCurrentSongIndex(newIndex);
    setCurrentSongName(getSongName(audioSrcList[newIndex]));
    audioRef.current?.setAttribute('src', audioSrcList[newIndex]);
    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  const handlePlaySong = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentSongName(getSongName(audioSrcList[index]));
    audioRef.current?.setAttribute('src', audioSrcList[index]);
    if (isPlaying) {
      audioRef.current?.play();
    }
  };

  return (
    <header className={`py-5 px-10 flex items-center justify-between bg-transparent`}>
      <Link href='/'>
        <h4 className='font-popins font-bold text-2xl'>신상 프로젝트</h4>
      </Link>
      <div className='flex items-center space-x-6'>
        <div className="flex items-center">
          <div className="text-sm font-semibold mr-2">{currentSongName}</div>
          {/* Music Play Button */}
          <button
            onClick={handlePlayMusic}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-2 border-white transition duration-300 ease-in-out ${isDarkMode ? 'text-white hover:bg-white hover:text-black' : 'text-black hover:bg-gray-200'}`}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15.586A2 2 0 006 17v4a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2h1a2 2 0 012 2v12.586zM15 9a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          {/* Next Song Button */}
          <button
            onClick={handleNextSong}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-2 border-white transition duration-300 ease-in-out ${isDarkMode ? 'text-white hover:bg-white hover:text-black' : 'text-black hover:bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Dark Mode Button */}
        <DarkModeBtn />
        {token ? (
          <Link href='/profile'>
          <div className='flex items-center space-x-2'>
            {user_image && (
              <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                <Image
                  src={user_image}
                  layout='fill'
                  objectFit='cover'
                  alt='프로필 이미지'
                />
              </div>
            )}
            <div className='text-sm font-semibold'>{user_nickname}</div>
          </div>
          </Link>
        ) : (
          <Link href='/login'>
            <h4 className='text-sm font-semibold hover:underline'>로그인</h4>
          </Link>
        )}
      </div>
      {/* Audio Element for Music */}
      <audio id="audio" src={audioSrcList[currentSongIndex]} ref={audioRef} onEnded={handleNextSong}></audio>
    </header>
  );
};

export default Header;
