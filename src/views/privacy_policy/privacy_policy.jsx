'use client';
import { FadeIn } from '@/animations';
// import { BlocksRender } from '@/components';
import Legal_BlockRender from '@/components/legal_component';

const PrivacyPolicy = ({ data }) => {
  return (
    <div className='flex justify-center mt-16 py-16'>
      <div className='max-w-[1440px] w-full'>
        <div className='flex justify-center mx-4 sm:mx-8 gap-2'>
          {/* <FadeIn> */}
            <h1 className='text-black text-[48px] sm:text-[55px] font-bold font-plus'>
              WAWCD
            </h1>
          {/* </FadeIn> */}
          {/* <FadeIn> */}
            <h2 className='text-black text-[48px] sm:text-[55px] font-bold font-plus'>
              {data?.heading}
            </h2>
          {/* </FadeIn> */}
        </div>
        <div className='my-6 px-10 w-[70%] m-auto'>
          <Legal_BlockRender data={data?.privacy_detail} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
