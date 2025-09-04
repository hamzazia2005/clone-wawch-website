'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { AuthorBlogs, Author, PopularArticles, ReviewSlider } from '.';
import 'swiper/css';


const AuthorPage = ({
  authors,
  details,
  reviews,
  banner,
  reviews_banner,
  articles_banner,
}) => {
  const [selectedAuthorId, setSelectedAuthorId] = React.useState(null);
  const authorBlogsRef = useRef(null);

  const handleAuthorSelection = (authorId) => {
    setSelectedAuthorId(authorId);
  };

  const filteredBlogs = selectedAuthorId
    ? (details?.data || []).filter(
        (blog) => blog?.author?.id === selectedAuthorId
      )
    : [];
  setTimeout(() => {
    authorBlogsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 100);

  return (
    <div>
      <div className='flex flex-col justify-center mt-24 py-20 bg-author bg-cover bg-center'>
        <h1 className='text-primary text-[52px] sm:text-[64px] font-semibold font-plus text-center mt-2'>
          {banner?.title}
        </h1>
        <p className='text-third leading-7 font-medium text-center mb-4 mt-2 font-poppins mx-3 sm:mx-8 lg:mx-48'>
          {banner?.description}
        </p>
      </div>
      <div className='px-5 sm:px-12'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className=''
        >
          {authors?.data?.map((author) => (
            <SwiperSlide key={author.id}>
              <Author
                author={author}
                handleAuthorSelection={handleAuthorSelection}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={authorBlogsRef}>
          {selectedAuthorId && filteredBlogs.length > 0 && (
            <AuthorBlogs
              detail={filteredBlogs}
              page_title={reviews_banner?.data?.blog_title}
            />
          )}
        </div>
        <PopularArticles details={details} articles_banner={articles_banner} />
        <ReviewSlider reviews={reviews} reviews_banner={reviews_banner} />
      </div>
    </div>
  );
};

export default AuthorPage;
