"use client";
import { AboutContainer } from "@/components";
// import { FadeIn } from "@/animations";
import Image from "next/image";
import { Reviews } from "@/icons";

const About = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px] w-full gap-4 px-5 sm:px-12 py-12">
        <div className="md:px-20">
          {/* <FadeIn> */}
          <div
            data-aos="fade-up"
            className="flex items-center justify-center gap-2"
          >
            <Reviews color="#0A4035" />
            <p className="font-poppins font-medium text-green1">
              {data?.title?.title}
            </p>
          </div>
          {/* </FadeIn> */}
          {/* <FadeIn> */}
          <h2
            data-aos="fade-up"
            className="text-3xl text-black1 font-plus text-center font-bold my-3"
          >
            {data?.heading}
          </h2>
          {/* </FadeIn> */}
          {/* <FadeIn> */}
          <p
            data-aos="fade-up"
            className="text-third font-medium text-center font-poppins mx-3 sm:mx-8 lg:mx-40"
          >
            {data?.description}
          </p>
          {/* </FadeIn> */}
        </div>
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="md:w-[60%] md:min-h-full">
              <AboutContainer item={data?.workflow} />
            </div>
            <div className="md:w-[40%] md:min-h-full bg-[#47B772] p-4 rounded-lg scale-1 hover:scale-[1.025] transition-all hover:shadow-[6px_4px_14px_1px_#dcdcdc]">
              <div className="flex justify-end mr-5">
                <Image
                  src={data?.business?.image || "/assets/placeholder.png"}
                  //priority={true}
                  width={58}
                  height={58}
                  alt="rectangle"
                />
              </div>
              {/* <FadeIn duration={0.4}> */}
              <h3
                data-aos="fade-up"
                data-aos-duration="400"
                className="text-4xl mb-4 font-semibold font-plus text-white"
              >
                {data?.business?.title}
              </h3>
              {/* </FadeIn> */}
              <div data-aos="fade-up" className="flex justify-between gap-4">
                {/* <FadeIn delay={0.4}> */}
                <p
                  data-aos="fade-up"
                  data-aos-delay="400"
                  className="text-white font-sm font-medium font-plus"
                >
                  {data?.business?.description}
                </p>
                {/* </FadeIn> */}
                <div
                  data-aos="fade-up"
                  className="flex-shrink-0 mt-4 -rotate-45"
                >
                  <Image
                    src={data?.business?.image || "/assets/placeholder.png"}
                    //priority={true}
                    width={58}
                    height={58}
                    alt="rectangle"
                  />
                </div>
              </div>
              <div className="flex justify-center ml-4 mt-4">
                <Image
                  src={data?.business?.image || "/assets/placeholder.png"}
                  //priority={true}
                  width={58}
                  height={58}
                  alt="rectangle"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-[40%]">
              <AboutContainer item={data?.privacy} />
            </div>
            <div className="md:w-[60%] md:min-h-full">
              <AboutContainer item={data?.time_saving} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
