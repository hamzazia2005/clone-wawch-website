'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Tooltip } from '@material-tailwind/react';
import { Category } from '@/components';
import { GenerateUrl, FormatDate } from '@/utils';
import { BASE_URL, isLocal } from '@/utils/axios_instance';

const FeaturedBlogCard = ({ blog }) => {
  return (
    <div className='w-full bg-white rounded-xl p-4 md:p-6 flex flex-col border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_2px_2px_#dcdcdc]'>
      <Link href={GenerateUrl(blog?.slug)}>
        <div>
          <Image
            src={
              blog?.image && blog?.image.length > 0 && blog?.image[0]?.url
                ? isLocal
                  ? BASE_URL + blog?.image[0]?.url
                  : blog?.image[0]?.url
                : '/assets/placeholder.png'
            }
            alt='blog'
            width={500}
            height={300}
            className='rounded-lg w-full object-cover md:h-60 mb-4 cursor-pointer'
          />
          <div className='flex justify-between items-center mb-2 font-plus'>
            <span className='hidden sm:block'>
              {blog?.category && (
                <Category
                  text={blog?.category}
                  color={blog?.catagory_color}
                />
              )}
            </span>
            <p className='text-sm text-gray-400 ml-auto'>
              {FormatDate(blog?.publishedAt)}
            </p>
          </div>
          <Tooltip
            content={blog?.title}
            className='max-w-[310px]'
            placement='bottom'
          >
            <h3 className='text-base sm:text-2xl py-3 font-semibold font-plus text-black1 hover:text-secondary cursor-pointer mb-4 truncate sm:text-wrap'>
              {blog?.title}
            </h3>
          </Tooltip>
        </div>
      </Link>

      <p className='text-gray-600 flex-1 hidden sm:block font-poppins'>
        {blog?.meta_description}
      </p>

      <div className='mt-4 flex justify-end'>
        <Link href={GenerateUrl(blog?.slug)}>
          <button className='text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:px-4 hover:py-2 hover:border-none hover:shadow-lg hover:rounded-lg border-black py-2 duration-200 transition-all'>
            {blog?.read_now}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBlogCard;
