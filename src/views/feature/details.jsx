'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BASE_URL, isLocal } from '@/utils/axios_instance';
import { FadeIn } from '@/animations';
import { FormatDate } from '@/utils';
import { BlocksRender } from '@/components';

const Detail = ({ data }) => {
  const router = useRouter();
  if (!data) {
    router.push('/404');
    return <div></div>;
  }

  return (
    <div className='flex justify-center items-center mt-20'>
      <div className='max-w-[1440px] px-5 sm:px-12 py-12 flex flex-col w-[500px] sm:w-[700px] md:w-full'>
        <FadeIn>
          <div className='flex flex-col items-center gap-4 sm:gap-8'>
            <p className='text-gray1 text-lg font-poppins font-medium'>
              {data?.guides}
            </p>
            <h1 className='text-[34px] sm:text-5xl text-black1 font-plus text-center font-bold md:w-[70%]'>
              {data?.title}
            </h1>
            <p className='text-gray1 text-lg font-poppins font-medium'>
              {FormatDate(data?.createdAt)}
            </p>
          </div>
        </FadeIn>

        <Image
          data-aos='zoom-in'
          data-aos-duration='800'
          data-aos-delay='300'
          src={
            data?.image?.url
              ? isLocal
                ? BASE_URL + data?.image?.url
                : data?.image?.url
              : '/assets/placeholder.png'
          }
          alt='img'
          //priority={true}
          width={604}
          height={394}
          style={{
            objectFit: 'cover',
          }}
          className='rounded-lg cursor-pointer mt-12 m-auto w-[70%]'
        />

        <div className='flex justify-center py-12'>
          <div className='md:w-[70%]'>
            {data?.video_iframe && (
              <div className='video-class'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.video_iframe,
                  }}
                ></div>
              </div>
            )}
            <BlocksRender data={data?.feature_details} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
