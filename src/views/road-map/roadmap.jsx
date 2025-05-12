import Image from 'next/image';
const Roadmap = ({ data }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-[1440px] w-full px-4 sm:px-12 py-12'>
        {data?.roadmap?.map((items, index) => (
          <div key={index} className='mb-16'>
            <div className='flex gap-4 flex-col sm:flex-row items-center mb-12'>
              <p className='font-poppins text-lg font-semibold whitespace-nowrap text-[#606060]'>
                {items?.title}
              </p>
              <div>
                <Image
                  src='/assets/line.svg'
                  alt='line'
                  className='w-full'
                  width={582}
                  height={10}
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='max-w-[800px] w-full'>
                {items?.content?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className='max-w-[500px] w-full mb-6 shadow-[6px_4px_14px_1px_#dcdcdc] flex gap-4 px-4 py-3 bg-white border rounded-[10px]'>
                      <Image
                        src='/assets/time.svg'
                        alt='line'
                        width={30}
                        height={30}
                        className='w-[30px]'
                      />
                      <div>
                        <p className='font-plus font-semibold'>{item?.title}</p>
                        <p className='font-poppins text-[13px] text-[#606060]'>
                          {item?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
