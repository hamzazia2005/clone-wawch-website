'use client';
import { useParams, useRouter } from 'next/navigation';
import { Category, BlogCard, Heading, BlocksRender } from '@/components';
import Image from 'next/image';
import { BASE_URL, isLocal } from '@/utils/axios_instance';
import { FadeIn, PopUp } from '@/animations';
import { FormatDate } from '@/utils';

const Detail = ({ data, detail, blog_headings }) => {
  const params = useParams();
  const router = useRouter();

  if (!data) {
    router.push('/404');
    return <div></div>;
  }
  const author = data?.author;
  const profileImage =
    author?.image?.[0].url || '/assets/profile_pic.png';

  return (
    <div className='flex justify-center items-center mt-20'>
      <div className='max-w-[1440px] px-5 sm:px-12 py-12 flex flex-col w-[500px] sm:w-[700px] md:w-full'>
        {/* <FadeIn> */}
        <div className='flex flex-col items-center'>
          {data?.category && (
            <div className='flex items-center gap-2 justify-center'>
              <p className='text-black text-lg font-poppins font-medium'>
                {blog_headings?.category_label}:
              </p>
              <Category text={data?.category} color={data?.catagory_color} />
            </div>
          )}
          <h1 className='text-[40px] text-black1 font-plus text-center font-bold my-3 md:w-[70%] mt-4 mb-5'>
            {data?.title}
          </h1>
          <p className='text-gray1 text-lg font-poppins font-medium'>
            {FormatDate(data?.publishedAt)}
          </p>
        </div>
        {/* </FadeIn> */}
        {/* <PopUp> */}
        <Image
          src={
            data?.image[0]?.url
              ? isLocal
                ? BASE_URL + data?.image[0]?.url
                : data?.image[0]?.url
              : '/assets/placeholder.png'
          }
          priority={true}
          alt='blog'
          width={950}
          height={400}
          loading='eager'
          style={{
            objectFit: 'cover',
          }}
          className='rounded-lg cursor-pointer mt-12 mx-auto'
        />
        {/* </PopUp> */}
        <div className='flex justify-center py-12'>
          <div className='md:w-[70%]'>
            {data?.is_html ? (
              // <FadeIn>
                <div className='test-class'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.blog_detail_html,
                    }}
                  ></div>
                </div>
              // </FadeIn>
            ) : (
              <BlocksRender data={data?.blog_detail_text} />
            )}
          </div>
        </div>
        <div className='flex justify-center pb-16'>
          <div className='md:w-[90%]'>
            {data?.author?.title && (
              <>
                <div className='border-t border-b py-6 space-y-6'>
                  <Heading text={blog_headings?.author_heading} />
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                    <div className='flex items-center gap-4 '>
                      <Image
                        src={profileImage}
                        alt='Author Profile Picture'
                        width={56}
                        height={56}
                        className='w-14 h-14 rounded-full object-cover object-center bg-gray-300'
                      />

                      <div>
                        <p className='font-plus font-bold text-base'>
                          {author?.title.slice(0, 20)}
                        </p>
                        <p className='font-poppins text-xs text-gray-600'>
                          {author?.designation}
                        </p>
                      </div>
                    </div>

                    <div className='md:max-w-[70%]'>
                      <p className='font-poppins text-sm text-gray-600 leading-relaxed text-justify'>
                        {author?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Heading text={data?.more_blog} />
            <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {detail
                ?.filter((item) => item?.slug !== params.slug)
                ?.slice(0, 3)
                ?.map((item, index) => (
                  <PopUp
                    key={index}
                    check={true}
                    delay={index * 1}
                    isBounce={true}
                  >
                    <BlogCard item={item} flag={true} />
                  </PopUp>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
