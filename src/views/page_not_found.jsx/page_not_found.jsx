'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { BASE_URL, isLocal } from '@/utils/axios_instance';

const PageNotFound = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <div>
      <div className='w-full h-[100vh] flex items-center px-6 mt-4 justify-center'>
        <Image
          src={
            data?.image?.url
              ? isLocal
                ? BASE_URL + data?.image?.url
                : data?.image?.url
              : '/assets/placeholder.png'
          }
          alt='404'
          //priority={true}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
