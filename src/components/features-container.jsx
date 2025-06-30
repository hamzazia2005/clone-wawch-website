const FeaturesContainer = ({ data, isPartner = true }) => {
  return (
    <div className="max-w-[1040px] w-full mx-auto px-4 sm:px-12">
      <h2 className="text-2xl font-plus font-semibold text-center text-secondary mb-8">
        {data?.heading}
      </h2>
      <div
        className={`grid gap-4 ${
          isPartner
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        }`}
      >
        {data?.feature?.map((feature, index) => (
          <div
            key={index}
            className="bg-[#F0FEF7] shadow-md rounded-[6px] p-4 border-l-4 border-secondary"
          >
            <h3
              className={`text-base font-poppins font-semibold mb-2 ${
                feature?.is_green_title ? "text-secondary" : "text-black"
              }`}
            >
              {feature?.title}
            </h3>
            <p className="text-sm font-poppins text-[#1E1E1E]">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesContainer;
