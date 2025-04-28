import Image from "next/image";
const GetStarted = ({ data }) => {
  return (
    <div className="flex justify-center items-center mt-24 w-full">
      <div className="max-w-[1440px] w-full">
        <div className="flex justify-between px-4 sm:px-12 pt-24 mt-12">
          <div className="md:w-[60%]">
            <p className="text-transparent font-semibold text-2xl font-poppins bg-gradient-to-r from-[#DCF6D4] to-[#49B974] inline-block bg-clip-text">
              {data?.title}
            </p>
            <h1 className="text-white text-[52px] sm:text-[78px] leading-tight font-bold font-plus">
              {data?.heading}
            </h1>
            <p className="text-white font-lg font-poppins mt-5 mb-8">
              {data?.description}
            </p>
            <a
              href="https://chromewebstore.google.com/detail/wawcd-chatgpt-powered-wha/gbbpfmmjcaakdmhlnjfdlhlehoeikbic"
              target="_blank"
            >
              <button
                className={`w-fit transition-all duration-300 py-3 rounded-[8px] px-8 scale-1 hover:scale-[1.045] text-white font-medium font-poppins bg-secondary`}
              >
                {data?.btn_text}
              </button>
            </a>
          </div>
          <div className="hidden md:flex justify-center w-[40%]">
            <Image
              src="/assets/numbers.svg"
              alt="numbers"
              width={223}
              height={449}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
