'use client';

import { Count, Progress } from '@/icons';
import Image from 'next/image';

const Author = ({ author, handleAuthorSelection }) => {
  return (
    <div className='max-w-[1440px] w-full  flex justify-center items-center my-3 mx-auto p-4 font-poppins '>
      <div className='flex flex-col items-center justify-center sm:flex-row rounded-xl overflow-hidden max-w-4xl'>
        <div className='relative flex-1'>
          <Image
            src={
              author?.image?.length > 0
                ? author?.image[0]?.url
                : 
                '/assets/author-fallback.svg'
            }
            alt="Author's Image"
            className='w-full h-full object-cover sm:min-h-[600px] p-0 sm:p-4 md:p-8 rounded-lg'
            width={400}
            height={600}
          />

          <div className='absolute top-8 left-6 bg-white p-3 rounded-lg shadow-md hidden md:block'>
            <Progress />
            <p className='text-base font-semibold mt-2'>{`${author?.skills}%`}</p>
            <p className='text-xs text-gray-600'>
              {author?.skill_label}
            </p>
          </div>
          <div className='absolute top-1/3 right-8 bg-white p-3 rounded-lg shadow-md hidden md:block'>
            <Image
              src={'/assets/languages.png'}
              alt='Languages'
              width={20}
              height={20}
            />
            <p className='text-base font-semibold mt-2'>
              {`${author?.languages}+`}
            </p>
            <p className='text-xs text-gray-600'>
              {author?.languages_label}
            </p>
          </div>
          <div className='absolute bottom-8 left-6 bg-white p-3 rounded-lg shadow-md hidden md:block'>
            <Count />
            <p className='text-base font-semibold mt-2'>
              {`${author?.words}K`}
            </p>
            <p className='text-xs text-gray-600'>
              {author?.words_label}
            </p>
          </div>
        </div>

        <div className='flex-1 p-8'>
          <h2 className='font-plus text-xl sm:text-2xl font-bold text-center sm:text-left'>
            {author?.title}
          </h2>
          <p className='text-gray-600 mt-2 text-sm sm:text-base font-poppins'>
            {author?.description}
          </p>

          <div className='mt-6 space-y-3'>
            <div className='w-full py-3 bg-gray-200 text-left px-4 rounded-lg '>
              <h1 className='font-semibold text-sm sm:text-lg'>
                {' '}
                {author?.education_label?.toLocaleUpperCase()}
              </h1>
              <p className='text-xs sm:text-sm'>
                {author?.education}
              </p>
            </div>
            <div className='w-full py-3 bg-gray-200 text-left px-4 rounded-lg'>
              <h1 className='font-semibold  text-sm sm:text-lg'>
                {' '}
                {author?.designation_label?.toLocaleUpperCase()}
              </h1>
              <p className='text-xs sm:text-sm'>
                {author?.designation}
              </p>
            </div>
            <div className='w-full py-3 bg-gray-200 text-left px-4 rounded-lg'>
              <h1 className='font-semibold  text-sm sm:text-lg'>
                {author?.specialization_label?.toLocaleUpperCase()}
              </h1>
              <p className='text-xs sm:text-sm'>
                {author?.specialization}
              </p>
            </div>
            <div className='flex justify-center sm:justify-start'>
              <button
                onClick={() => handleAuthorSelection(author?.id)}
                className='text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:px-4 hover:py-2 hover:border-none hover:shadow-lg hover:rounded-lg border-black py-2 duration-200 transition-all'
              >
                {author?.btn_tx}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
