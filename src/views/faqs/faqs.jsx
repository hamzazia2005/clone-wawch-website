'use client';
import { FaqQuestion } from '@/components';
import { useState } from 'react';

const Faq = ({ data }) => {
  // eslint-disable-next-line no-undef
  const titles = data && data.length > 0 ? [...new Set(data.map((item) => item.title))] : [];
  const [selectedTitle, setSelectedTitle] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const filteredData =
    selectedTitle === 'All'
      ? (data || [])
      : (data || []).filter((item) => item?.title === selectedTitle);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const currentData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTitleSelection = (title) => {
    setSelectedTitle(title);
    setCurrentPage(1);
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='sm:max-w-[900px] w-full px-5 sm:px-12 pt-16'>
        <div className='flex items-center justify-between sm:justify-center gap-5 mb-6 overflow-x-scroll sm:overflow-hidden'>
          {/* <FadeIn key={-1} duration={1}> */}
            <h2
              className={`text-xl font-poppins cursor-pointer ${
                selectedTitle === 'All'
                  ? 'text-secondary font-semibold'
                  : 'text-primary'
              }`}
              onClick={() => handleTitleSelection('All')}
            >
              All
            </h2>
          {/* </FadeIn> */}
          {titles && titles.length > 0 && titles.map((title, index) => (
            // <FadeIn key={index} duration={1}>
              <h2
                key={index}
                className={`text-xl font-poppins cursor-pointer ${
                  selectedTitle === title
                    ? 'text-secondary font-semibold'
                    : 'text-primary'
                }`}
                onClick={() => handleTitleSelection(title)}
              >
                {title}
              </h2>
            // {/* </FadeIn> */}
          ))}
        </div>
        <div className='mb-12'>
          {currentData && currentData.length > 0 ? (
            currentData.map((item, index) => (
              <div key={index}>
                {/* <PopUp duration={1}> */}
                  <FaqQuestion item={item} flag={true} />
                {/* </PopUp> */}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No FAQs found.
            </div>
          )}
        </div>
        {/* Pagination Controls*/}
        {totalPages > 1 && filteredData?.length > 0 && (
          <div className='flex justify-center items-center gap-2 my-4'>
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className='w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded'
              >
                <span>&lt;</span>
              </button>
            )}
            <div className='flex items-center gap-2'>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
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
                  (pageNumber === currentPage + 2 &&
                    currentPage < totalPages - 2)
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
            </div>
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className='w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded'
              >
                <span>&gt;</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
