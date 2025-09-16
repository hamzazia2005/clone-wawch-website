const BoostMap = ({ data, isPartner = false }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" className="max-w-[1040px] w-full mx-auto px-4 sm:px-12 mb-12">
      <h2 className="text-2xl font-plus font-semibold text-center text-secondary mb-8">
        {data?.heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.feature?.map((feature, index) => (
          <div key={index} className="bg-[#F5F5F5] shadow-md rounded-[6px] p-4">
            <p className="text-base font-poppins font-medium text-[#1E1E1E]">
              <span
                className={`text-base font-poppins font-semibold mr-1 ${
                  feature?.is_green_title ? "text-secondary" : "text-black"
                } ${!isPartner && "block"}`}
              >
                {feature?.title}
              </span>
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoostMap;
