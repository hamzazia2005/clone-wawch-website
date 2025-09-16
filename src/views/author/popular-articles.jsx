'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { BlogCard } from '@/components';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PopularArticles = ({ details, articles_banner }) => {
  const swiperRef = useRef();
  return (
    <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col lg:flex-row justify-center items-center overflow-hidden w-full my-3 sm:my-10 p-4 bg-neutral-50 gap-4'>
      <div className='w-full max-w-3xl lg:w-1/3 mb-6 sm:mb-0 text-center lg:text-start'>
        <h2 className='text-2xl sm:text-3xl font-bold font-plus'>
          {articles_banner?.data?.title}
        </h2>
        <p className='text-sm sm:text-base text-gray-500 mt-2 font-poppins'>
          {articles_banner?.data?.description}
        </p>
        <Link
          href={
            articles_banner?.data?.btn_link ||
            'https://wawcd.com/blog/'
          }
        >
          <button className='font-poppins mt-4 text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:px-4 hover:py-2 hover:border-none hover:shadow-lg hover:rounded-lg border-black py-2 duration-200 transition-all'>
            {`${
              articles_banner?.data?.btn_name || 'Learn More'
            } → `}
          </button>
        </Link>
      </div>
      <div className='w-full max-w-sm sm:max-w-lg md:max-w-3xl lg:w-2/3 relative p-1 font-poppins'>
        <ChevronLeft
          size={28}
          className='absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:text-secondary'
          onClick={() => swiperRef.current.slidePrev()}
        />
        <ChevronRight
          size={28}
          className='absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:text-secondary'
          onClick={() => swiperRef.current.slideNext()}
        />
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={12}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          className='px-6'
        >
          {details?.data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='p-2'>
                <BlogCard item={item} flag={false} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularArticles;
