const Work = ({ data }) => {
  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-12 mb-12">
      <h2 className="text-2xl font-plus font-semibold text-center text-secondary mb-8">
        {data?.heading}
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex flex-row flex-nowrap items-center overflow-x-auto w-full gap-4 scrollbar-thin scrollbar-thumb-gray-300 pb-2">
          {data?.steps
            ?.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F0FEF7] rounded-[10px] shadow-md flex flex-col items-center justify-center px-3 py-5 min-w-[200px] max-w-[240px] w-full h-full mx-auto"
              >
                <span className="text-sm text-center">{item.text1}</span>
                <span className="font-semibold text-sm text-center my-1">
                  {item.text2}
                </span>
                <span className="text-sm text-center">{item.text3}</span>
              </div>
            ))
            .reduce((acc, card, idx, arr) => {
              acc.push(card);
              if (idx < arr.length - 1) {
                acc.push(
                  <span
                    key={`arrow-${idx}`}
                    className="text-2xl mx-2 sm:mx-4 flex-shrink-0"
                  >
                    →
                  </span>
                );
              }
              return acc;
            }, [])}
        </div>
      </div>
    </div>
  );
};

export default Work;
