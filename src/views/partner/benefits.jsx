const Benefits = ({ data }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" className="max-w-[1040px] w-full mx-auto px-4 sm:px-12 mb-12">
      <h2 className="text-2xl font-plus font-semibold text-center text-secondary mb-8">
        {data?.heading}
      </h2>
      <div>
        {data?.benefits?.map((benefit, index) => (
          <div
            key={index}
            className="bg-[#F5F5F5] shadow-md rounded-[12px] p-4 mb-4"
          >
            <p className="text-base font-poppins text-[#1E1E1E]">
              <span
                className={`text-base font-poppins font-semibold mr-1 ${
                  benefit?.is_green_title ? "text-secondary" : "text-black"
                }`}
              >
                {benefit?.title}
              </span>
              {benefit?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
