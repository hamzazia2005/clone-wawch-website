const Titles = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px] w-full px-4 py-8">
        <div className="my-24">
          <h2 className="md:px-24 text-black text-center leading-snug text-[30px] sm:text-[48px] mb-8 font-poppins font-semibold">
            {data?.heading2}
          </h2>
          <p className="md:px-32 text-black text-center font-poppins">
            {data?.description}
          </p>
        </div>

        {/* Target section */}
        <h2
          id="5"
          className="text-black text-center leading-snug text-[30px] sm:text-[48px] font-poppins font-semibold"
        >
          {data?.heading3}
        </h2>
      </div>
    </div>
  );
};

export default Titles;
