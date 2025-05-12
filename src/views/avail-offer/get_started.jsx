'use client';

const GetStarted = ({ data }) => {
  return (
    <div className='flex justify-center mt-24 py-20 bg-avail_banner bg-center bg-cover'>
      <div className='max-w-[1440px] w-full'>
        <h1 className='text-white text-[40px] sm:text-[64px] font-semibold font-plus text-center mt-2 mx-3'>
          {data?.heading}
        </h1>
        <h2 className='text-[#b4fe9db8] text-[40px] sm:text-[64px] font-semibold font-plus text-center mx-3'>
          {data?.heading2}
        </h2>
        <p className='text-white leading-7 font-medium text-center mb-4 mt-2 font-poppins mx-3 sm:mx-8 lg:mx-48'>
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
