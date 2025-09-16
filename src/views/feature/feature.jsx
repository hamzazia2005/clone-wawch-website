'use client';
import { BASE_URL, isLocal } from '@/utils/axios_instance';
import { FormatDate } from '@/utils';
import { useAppContext } from '@/context';
import Link from 'next/link';
import Image from 'next/image';

const Detail = ({ data, heading }) => {
 const { lang } = useAppContext();

  return (
  <div className="flex justify-center items-center mt-20">
    <div className="max-w-[900px] w-full px-5 sm:px-12 py-12">
      <h1 className="text-black text-[52px] sm:text-[64px] font-semibold font-plus text-center mb-12">
        {heading}
      </h1>

      <div data-aos="fade-up" data-aos-duration="1000" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data?.map((item, index) => (
          <div data-aos="zoom-in" data-aos-duration="500" data-aos-delay="500" key={index}>
            <Link
              key={index}
              href={lang? `/${lang}/feature/${item?.slug}`:`/feature/${item?.slug}`}
              className='flex flex-col gap-8 p-2 sm:p-4 mb-8 border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_20px_2px_#dcdcdc] transition-all rounded-lg'
            >
              <Image
                src={
                  item?.image?.url
                    ? isLocal
                      ? BASE_URL + item?.image?.url
                      : item?.image?.url
                    : "/assets/placeholder.png"
                }
                alt="feature"
                className="rounded-md w-full h-[200px] object-cover object-center"
                width={754}
                height={492}
              />

              <div className="flex flex-col justify-between">
                <p className="text-gray1">{item?.guides}</p>
                <h2 className="text-2xl md:text-3xl text-black1 leading-tight font-poppins font-semibold hover:text-secondary my-3">
                  {item?.title}
                </h2>
                <p className="text-gray1">
                  {FormatDate(item?.createdAt)}
                </p>
              </div>
            </Link>
            </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Detail;
