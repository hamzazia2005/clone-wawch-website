'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Reasons = ({ data }) => {
  const [open, setOpen] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const offset = 500;

    if (section) {
      const offsetTop = section.offsetTop + offset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const formatIndex = (index) => {
    return index < 9 ? `0${index + 1}` : `${index + 1}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById(0);
      const lastSection = document.getElementById(data.length - 1);

      if (firstSection && lastSection) {
        const firstSectionTop = firstSection.offsetTop;
        const lastSectionBottom =
          lastSection.offsetTop + lastSection.offsetHeight;

        const scrollY = window.scrollY;

        if (
          scrollY >= firstSectionTop + 500 &&
          scrollY <= lastSectionBottom + 500
        ) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }

        if (scrollY < firstSectionTop + 500) {
          setIsTop(true);
        } else {
          setIsTop(false);
        }

        // Determine which section is currently in view
        data.forEach((_, index) => {
          const section = document.getElementById(index);
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollY >= sectionTop + 500 && scrollY < sectionBottom + 500) {
            setOpen(index);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  return (
    <div className='flex justify-center items-center w-full mt-12'>
      <div
        className={'max-w-[1440px] w-full px-4 sm:px-12 flex justify-between gap-8 relative pb-12'}
      >
        <div className='hidden md:block md:w-[30%]'>
          <ul
            className={`${
              isFixed ? 'sticky top-32' : isTop ? 'absolute' : 'sticky top-32'
            }`}
          >
            {data.map((item, index) => (
              <li
                key={item.id}
                className={`cursor-pointer text-nowrap w-fit mb-3 pb-2 font-semibold font-poppins text-[15px] ${
                  index === open
                    ? 'border-b-2 border-[#DCF6D4] text-white'
                    : 'text-[#a2a1a6] hover:text-white'
                }`}
                onClick={() => {
                  scrollToSection(index);
                }}
              >
                {formatIndex(index)} {item?.attributes?.title}
              </li>
            ))}
          </ul>
        </div>
        <div className='md:w-[70%]'>
          {data.map((item, index) => (
            <div key={index} id={index} className='mb-12'>
              <div className='lg:w-[70%]'>
                <p className='text-transparent font-semibold text-[90px] font-poppins bg-gradient-to-r from-[#DCF6D4] to-[#49B974] inline-block bg-clip-text'>
                  {formatIndex(index)}
                </p>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl text-white leading-normal sm:leading-normal lg:leading-normal font-poppins font-semibold'>
                  {item?.attributes?.heading}
                </h2>
                <p className='mt-4 text-white font-poppins text-base sm:text-xl leading-loose font-normal'>
                  {item?.attributes?.description}
                </p>
              </div>
              {item?.attributes?.content &&
                item?.attributes?.content.trim() != '' && (
                  <div className='flex justify-end mt-8'>
                    <div className='lg:w-[70%] p-5 border border-[#DCF6D4] rounded-[5px]'>
                      <Image
                        src='/assets/quotation.svg'
                        alt='quotations'
                        width={24}
                        height={24}
                        className='mb-5'
                      />
                      <p
                        className={'text-lg font-poppins leading-[160%] text-white'}
                      >
                        {item?.attributes?.content}
                      </p>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reasons;
