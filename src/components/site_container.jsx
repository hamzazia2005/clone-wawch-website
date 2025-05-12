import Image from 'next/image';

const SiteContainer = ({ item }) => {
  return (
    <div
      data-aos='zoom-in'
      data-aos-delay='1000'
      className='flex items-center gap-2 bg-white py-1 px-2 rounded-md scale-1 hover:scale-[1.025] transition-all'
    >
      {item?.image && (
        <Image
          src={item?.image || '/assets/placeholder.png'}
          style={{ width: '16px', height: '16px' }}
          //priority={true}
          width={16}
          height={16}
          alt='logo'
        />
      )}
      <p className='text-[#1D1D21] hover:text-secondary font-semibold font-plus'>
        {item?.title}
      </p>
    </div>
  );
};

export default SiteContainer;
