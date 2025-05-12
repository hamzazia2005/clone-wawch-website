"use client";
import { Accordion } from "@/components";
// import { FadeIn, PopUp } from "@/animations";
import Image from "next/image";

const Works = ({ data }) => {
  return (
    <div id="0" className="flex justify-center items-center bg-[#F5F5F5]">
      <div className="max-w-[1440px] w-full px-5 sm:px-12 py-8">
        {/* <FadeIn duration={0.5}> */}
        <div
          data-aos="fade-up"
          data-aos-duration="500"
          className="flex gap-1 items-center"
        >
          <Image
            src={data?.title?.icon || "/assets/placeholder.png"}
            //priority={true}
            width={16}
            height={16}
            alt="mouse"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-green1 font-poppins font-medium">
            {data?.title?.title}
          </p>
        </div>
        {/* </FadeIn> */}
        {/* <FadeIn> */}
        <h2
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="500"
          className="text-black1 font-plus font-semibold leading-[60px] text-4xl mt-2 mb-1"
        >
          {data?.heading}
        </h2>
        {/* </FadeIn> */}
        {/* <FadeIn delay={0.5} duration={0.5}> */}
        <p
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="500"
          className="font-poppins font-medium leading-7 text-sm text-third"
        >
          {data?.description}
        </p>
        {/* </FadeIn> */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 md:gap-8">
          <div>
            {data?.workings
              ?.slice(0, Math.ceil(data.workings.length / 2))
              .map((item, index) => (
                <div
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="800"
                  key={index}
                >
                  {/* <PopUp delay={1} duration={0.8}> */}
                  <Accordion item={item} index={index} />
                  {/* </PopUp> */}
                </div>
              ))}
          </div>
          <div>
            {data?.workings
              ?.slice(Math.ceil(data.workings.length / 2))
              .map((item, index) => (
                <div
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="1000"
                  key={index + data.workings.length / 2}
                >
                  <Accordion
                    item={item}
                    index={index + data.workings.length / 2}
                  />
                  {/* </PopUp> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
