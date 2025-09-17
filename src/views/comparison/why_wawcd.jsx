import { BASE_URL, isLocal } from '@/utils/axios_instance';
import Image from 'next/image';

const WhyWawcd = ({ data }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-center items-center'>
      <div className='max-w-[1440px] w-full px-4 sm:px-12 py-12'>
        {data?.map((item, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row gap-8 md:justify-between md:items-center'
          >
            <div>
              <h3 className='mb-6 mt-8 md:mt-0 text-black leading-snug font-plus text-[30px] sm:text-[36px] font-semibold'>
                {item?.heading}
              </h3>
              <p className='font-poppins text-black'>
                {item?.description}
              </p>
            </div>
            {item?.image?.url && (
              <Image
                src={
                  item?.image?.url
                    ? isLocal
                      ? BASE_URL +
                        item?.image?.url
                      : item?.image?.url
                    : '/assets/placeholder.png'
                }
                width={300}
                height={300}
                //priority={true}
                alt='numbers'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyWawcd;
