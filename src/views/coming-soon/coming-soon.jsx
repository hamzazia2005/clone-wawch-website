const ComingSoon = ({ data }) => {
  return (
    <div className="flex justify-center mt-24 py-32 bg-uninstall_banner bg-center bg-cover">
      <div className="max-w-[1440px] w-full">
        <h1 className="text-primary text-[52px] sm:text-[64px] font-bold font-plus text-center mx-4 sm:mx-8">
          {data?.heading}
        </h1>
        <p className="text-third leading-7 font-medium text-center mb-4 mt-2 font-poppins mx-4 sm:mx-8 md:mx-48 lg:mx-64">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
