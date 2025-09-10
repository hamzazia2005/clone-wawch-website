'use client';
import { useState } from 'react';
import { BASE_URL, isLocal } from '@/utils/axios_instance';
import Image from 'next/image';
import { BlocksRender } from '@/components';
import { FadeIn } from '@/animations';

const TeamMembers = ({ heading, data, version }) => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(version?.length / itemsPerPage); // Calculate total pages

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVersions = version?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-[1440px] w-full px-4 sm:px-12 py-12'>
        <h2 className='text-black text-center leading-snug text-[30px] sm:text-[48px] mb-8 font-poppins font-semibold'>
          {heading?.heading2}
        </h2>
        <div className='my-16 flex gap-4 justify-center md:justify-between flex-wrap'>
          {data?.map((item, index) => (
            <div
              key={index}
              className='flex gap-2 py-2 px-2 border rounded-lg items-center min-w-[280px] bg-white shadow-[0px_4px_10px_0px_#dcdcdc]'
            >
              <Image
                src={
                  item?.image?.url
                    ? isLocal
                      ? BASE_URL +
                        item?.image?.url
                      : item?.image?.url
                    : '/assets/profile_pic.png'
                }
                width={50}
                height={50}
                alt='numbers'
                style={{ color: 'black' }}
                className='rounded-full'
              />
              <div>
                <h3 className='mt-2 md:mt-0 text-black font-plus text-xl font-semibold'>
                  {item?.name}
                </h3>
                <p className='font-poppins font-medium text-[#606060]'>
                  {item?.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {currentVersions?.map((item, index) => (
          <div key={index}>
            <FadeIn>
              <div className='flex gap-2 mb-2 mt-10 bg-gray-300 p-2 rounded-md'>
                <p className='text-lg font-poppins leading-[160%] font-semibold text-black'>
                  {item?.version}
                </p>
                <p className='text-base font-poppins leading-[160%] font-semibold text-black'>
                  ({item?.date})
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <BlocksRender data={item?.description} />
            </FadeIn>
          </div>
        ))}

        <div className='flex justify-center items-center gap-2 my-4'>
          {currentPage > 1 && (
            <button
              onClick={handlePrevPage}
              className='w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded'
            >
              <span>&lt;</span>
            </button>
          )}

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 flex justify-center items-center rounded ${
                    currentPage === pageNumber
                      ? 'bg-[#47B772] text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            if (
              (pageNumber === currentPage - 2 && currentPage > 3) ||
              (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return (
                <span
                  key={pageNumber}
                  className='w-8 h-8 flex justify-center items-center'
                >
                  ...
                </span>
              );
            }

            return null;
          })}

          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className='w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded'
            >
              <span>&gt;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
