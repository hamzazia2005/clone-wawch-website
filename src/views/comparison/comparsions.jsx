const Comparsions = ({ data }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-[1440px] w-full px-4 py-12'>
        <h3 className='md:px-24 mt-12 text-black text-center leading-snug text-[30px] sm:text-[48px] mb-8 font-poppins font-semibold'>
          {data?.heading}
        </h3>
        <p className='md:px-48 mb-24 text-black text-center font-poppins'>
          {data?.description}
        </p>
        <div>
          {data?.comparison?.map((item, index) => (
            <div key={index}>
              <h4
                id={index + 6}
                className='md:px-24 my-12 text-black text-center text-3xl sm:text-4xl font-poppins font-semibold'
              >
                {item?.title}
              </h4>
              <div className='overflow-auto min-w-full'>
                <table className='w-[1000px] md:w-full'>
                  <tbody>
                    {item?.content?.map((compare, index) => (
                      <tr key={index} className='flex gap-4'>
                        <td
                          className={`text-black text-center text-opacity-60 py-6 px-4 font-poppins p-4 border border-black w-[33%] border-opacity-20 ${
                            index === 0
                              ? 'rounded-t-[25px] text-3xl font-semibold '
                              : ''
                          } ${
                            index === item?.content.length - 1
                              ? 'rounded-b-[25px]'
                              : ''
                          }`}
                        >
                          {compare[0]}
                        </td>
                        <td
                          className={`text-black text-center font-poppins p-4 border-2 py-6 px-4 border-[#47B772] w-[33%]  ${
                            index === 0
                              ? 'rounded-t-[25px] text-3xl font-semibold border-t-2 border-[#47B772]'
                              : 'border-t-0'
                          } ${
                            index === item?.content.length - 1
                              ? 'rounded-b-[25px]'
                              : ''
                          }`}
                        >
                          {compare[1]}
                        </td>
                        <td
                          className={`text-black text-center text-opacity-60 py-6 px-4 font-poppins p-4 border border-black w-[33%] border-opacity-20 ${
                            index === 0
                              ? 'rounded-t-[25px] text-3xl font-semibold '
                              : ''
                          } ${
                            index === item?.content.length - 1
                              ? 'rounded-b-[25px]'
                              : ''
                          }`}
                        >
                          {compare[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comparsions;
