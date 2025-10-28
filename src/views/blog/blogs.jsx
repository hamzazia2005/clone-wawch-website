'use client';
import { BlogCard, Category } from '@/components';
import { BASE_URL, isLocal } from '@/utils/axios_instance';
import Link from 'next/link';
import { FormatDate, GenerateUrl } from '@/utils';

const Blogs = ({ data, detail }) => {
  return (
    <div className='flex justify-center items-center mt-12 md:mt-20'>
      <div className='max-w-[1440px] px-5 sm:px-12 py-12 sm:w-[550px] w-[400px] md:w-[900px] lg:w-full'>
      <div
          data-aos="fade-up"
          data-aos-duration="1000">
        {/* <FadeIn> */}
          <h1 className='text-4xl text-black1 font-plus text-center font-bold my-3'>
            {data?.heading}
          </h1>
          <p className='text-third text-lg text-center font-poppins mx-3 sm:mx-8 lg:mx-40'>
            {data?.description}
          </p>
          </div>
        {/* </FadeIn> */}
        <div className='mt-8 lg:px-8 lg:py-4'>
          {detail?.data?.[0] && (
            // <FadeIn delay={1.5}>
              <div data-aos="fade-up"  data-aos-duration="1000" data-aos-delay="500"  className='flex gap-6  p-4 md:p-6 flex-col md:flex-row md:items-center border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_20px_2px_#dcdcdc] transition-all duration-300 rounded-lg'>
                <div className='md:w-[50%]'>
                  {detail?.data?.[0]?.category?.title && (
                    <Category
                      text={detail?.data?.[0]?.category?.title}
                      color={detail?.data?.[0]?.catagory_color}
                    />
                  )}
                  <Link href={GenerateUrl(detail?.data?.[0]?.slug)}>
                    <h2 className='text-xl sm:text-2xl md:text-3xl text-black1 hover:text-secondary font-plus font-semibold mt-4 mb-8 cursor-pointer'>
                      {detail?.data?.[0]?.title}
                    </h2>
                  </Link>
                  <div className='flex md:flex-col justify-between items-center md:justify-start md:items-start'>
                    <p className='text-[#929EB8] md:mb-6'>
                      {FormatDate(detail?.data?.[0]?.createdAt)}
                    </p>
                    <Link href={GenerateUrl(detail?.data?.[0]?.slug)}>
                      <button className='text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:p-2 hover:border-none hover:hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] hover:rounded-lg border-black py-2 transition-all duration-200'>
                        {detail?.data?.[0]?.read_now}
                      </button>
                    </Link>
                  </div>
                </div>
                <Link
                  className={`md:w-[50%] order-first md:order-last min-h-[200px] sm:min-h-[280px] w-full rounded-lg`}
                  href={GenerateUrl(detail?.data?.[0]?.slug)}
                  style={{
                    backgroundImage: `url(${
                      detail?.data?.[0]?.image && detail?.data?.[0]?.image.length > 0 && detail?.data?.[0]?.image[0]?.url
                        ? isLocal
                          ? BASE_URL + detail?.data?.[0]?.image[0]?.url
                          : detail?.data?.[0]?.image[0]?.url
                        : '/assets/placeholder.png'
                    })`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            // </FadeIn>
          )}
          <div data-aos="fade-up"  data-aos-duration="1000" data-aos-delay="1000" className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {detail?.data?.slice(1).map((item, index) => (
              <div data-aos="zoom-in"  data-aos-duration="1000" data-aos-delay="500" key={index}>
              {/* // <PopUp key={index} check={true} isBounce={true}> */}
                <BlogCard key={index} item={item} flag={true} />
              {/* // </PopUp> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
