'use client';
import Image from 'next/image';
const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Image
        src='/assets/loader.gif'
        alt='Loading...'
        width={300}
        height={300}
        unoptimized
        priority
      />
    </div>
  );
};

export default Loader;
