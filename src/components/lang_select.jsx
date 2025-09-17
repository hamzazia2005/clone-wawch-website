'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context';

const LangSelect = () => {
  const { lang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(lang || 'en');
  const data = ['en', 'ar', 'pt', 'fr'];
  const pathname = usePathname();

  useEffect(() => {
    setSelectedOption(lang || 'en');
  }, [pathname, lang]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Store the selected language in localStorage
    localStorage.setItem('lang', option);
  };

  const cleanPathname = (path) => {
    // Split the pathname into segments
    let segments = path.split('/').filter((segment) => segment);
    // Filter out any segment that matches a language code
    segments = segments.filter((segment) => !data.includes(segment));
    return '/' + segments.join('/');
  };

  return (
    <div className='relative'>
      <div
        className='flex justify-between items-center bg-primary border border-[#D0D5DD] rounded-md text-[#fff] placeholder-[#fff]  shadow-sm px-4 py-[11px] gap-2 cursor-pointer'
        onClick={toggleDropdown}
      >
        {selectedOption}
        <Image
          src='/assets/dropdown_white.svg'
          alt='dropdown'
          //priority={true}
          width={12}
          height={12}
          className={`${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <ul
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute z-10 w-full bg-primary border border-[#D0D5DD] rounded-md text-[#fff] shadow-lg max-h-60 overflow-auto`}
      >
        {data.map((option) => (
          <Link
          href={`${
            pathname.includes('/blog/') || pathname.includes('/author/')
              ? pathname
              : '/' + option + (cleanPathname(pathname) === '/' ? '' : cleanPathname(pathname))
          }`}
          key={option}
        >
          <li
            onClick={() => handleOptionClick(option)}
            className='px-4 py-2 hover:bg-[#647867c0] cursor-pointer'
          >
            {option}
          </li>
        </Link>        
        ))}
      </ul>
    </div>
  );
};

export default LangSelect;