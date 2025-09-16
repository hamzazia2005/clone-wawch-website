import Image from 'next/image';
import { isLocal, BASE_URL } from '@/utils/axios_instance';

const TestimonialCard = ({ item }) => {
  const data = item;

  return (
    <div data-aos="fade-up" data-aos-duration="1000" className='p-4 pb-6 border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_20px_2px_#dcdcdc] rounded-lg transition-all duration-300'>
      {data?.video_iframe && (
        <div className='testimonial-video mb-4'>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.video_iframe,
            }}
          ></div>
        </div>
      )}
      {data?.image?.url && (
        <Image
          src={
            data?.image?.url
              ? isLocal
                ? BASE_URL + data?.image?.url
                : data?.image?.url
              : '/assets/placeholder.png'
          }
          alt='image'
          //priority={true}
          width={1000}
          height={1000}
          className='rounded-lg cursor-pointer mb-4 md:h-[190px] lg:h-[230px] object-cover'
        />
      )}
      {data?.heading && (
        <h2 className='text-xl mb-4 text-black1 font-plus font-semibold hover:text-secondary'>
          {data?.heading}
        </h2>
      )}
      {data?.description && (
        <p className='text-black1 mb-4'>{data?.description}</p>
      )}
      <div className='flex gap-3 items-center'>
        <Image
          src={
            data?.profile_image?.url
              ? isLocal
                ? BASE_URL + data?.profile_image?.url
                : data?.profile_image?.url
              : '/assets/profile_pic.png'
          }
          alt='image'
          //priority={true}
          width={40}
          height={40}
          className='rounded-full'
        />
        <div>
          <p className='text-sm text-black1 font-semibold'>{data?.name}</p>
          <p className='text-sm text-[#929EB8]'>{data?.job}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
