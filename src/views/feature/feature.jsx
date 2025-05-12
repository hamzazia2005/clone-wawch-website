'use client';
import { BASE_URL, isLocal } from '@/utils/axios_instance';
import { PopUp } from '@/animations';
import { FormatDate } from '@/utils';
import { useAppContext } from '@/context';
import Link from 'next/link';
import Image from 'next/image';

const Detail = ({ data, heading }) => {
  const { lang } = useAppContext();

  return (
    <div className='flex justify-center items-center mt-20'>
      <div className='max-w-[900px] w-full px-5 sm:px-12 py-12'>
        <h1 className='text-black text-[52px] sm:text-[64px] font-semibold font-plus text-center mb-12'>
          {heading}
        </h1>
        {data?.map((item, index) => (
          <PopUp key={index} isBounce={true} duration={1}>
            <Link
              href={`/feature/${item?.attributes?.slug}/${lang}`}
              className='flex flex-col md:flex-row gap-8 p-2 sm:p-4 mb-8 border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_20px_2px_#dcdcdc] transition-all rounded-lg'
            >
              <div>
                <Image
                  src={
                    item?.attributes?.image?.data?.attributes?.url
                      ? isLocal
                        ? BASE_URL +
                          item?.attributes?.image?.data?.attributes?.url
                        : item?.attributes?.image?.data?.attributes?.url
                      : '/assets/placeholder.png'
                  }
                  alt='feature'
                  className='rounded-md w-full md:w-[300px] h-full object-cover object-center'
                  width={754}
                  height={492}
                />
              </div>
              <div className='flex flex-col justify-between py-4'>
                <p className=' text-gray1'>{item?.attributes?.guides}</p>
                <h2 className='text-4xl text-black1 leading-[50px] font-poppins font-semibold hover:text-secondary my-4'>
                  {item?.attributes?.title}
                </h2>
                <p className='text-gray1'>
                  {FormatDate(item?.attributes?.createdAt)}
                </p>
              </div>
            </Link>
          </PopUp>
        ))}
      </div>
    </div>
  );
};

export default Detail;
