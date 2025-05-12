'use client';

import { ReviewContainer } from '@/components';
import React, { useRef } from 'react';
import Slider from 'react-slick';

const ReviewSlider = ({ reviews, reviews_banner }) => {
  const SliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className='mx-auto my-3 sm:my-10'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center my-4 font-plus'>
        {reviews_banner?.data?.attributes?.title}
      </h2>
      <p className='text-sm sm:text-base text-center text-gray-500 max-w-2xl mx-auto mb-8 font-poppins'>
        {reviews_banner?.data?.attributes?.description}
      </p>
      <div className='grid grid-cols-12 mt-4 overflow-hidden'>
        <div className='col-span-12'>
          <Slider ref={SliderRef} {...settings}>
            {reviews?.data?.map((item, index) => (
              <ReviewContainer key={index} item={item.attributes} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;
