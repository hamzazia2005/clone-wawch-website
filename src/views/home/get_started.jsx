"use client";
import { IconButton, SiteContainer } from "@/components";
import { useState } from "react";
// import { FadeIn, PopUp } from "@/animations";
import Image from "next/image";

const GetStarted = ({ data }) => {
  const [imgSrc, setImgSrc] = useState(
    "https://res.cloudinary.com/dno9rw4ax/image/upload/f_auto,q_auto/v1721989345/banner_50c756e462.webp"
  );

  return (
    <div className="relative flex justify-center items-center mt-24">
      <Image
        src={imgSrc}
        onError={() => setImgSrc("/assets/placeholder.png")}
        fill
        style={{ objectFit: "cover" }}
        alt="Background Image"
        className="z-[-1]"
        priority={true}
        sizes="100vw"
      />
      <div className="max-w-[1440px] w-full rounded-md">
        <div className="pt-20 px-3 md:px-12">
          {/* <FadeIn> */}
          <p
            data-aos="fade-in"
            className="text-green1 font-medium text-center font-poppins"
          >
            {data?.title}
          </p>
          {/* </FadeIn> */}
          {/* <FadeIn> */}
          <h1
            data-aos="fade-in"
            data-aos-delay="100"
            className="text-primary text-[30px] sm:text-[45px] md:text-[50px] font-medium sm:font-semibold font-poppins text-center my-4"
          >
            {data?.heading}
          </h1>
          {/* </FadeIn> */}
          {/* <FadeIn> */}
          <p
            data-aos="fade-in"
            className="text-third sm:leading-7 font-medium text-center font-plus mx-3 sm:mx-8 lg:mx-48"
          >
            {data?.description}
          </p>
          {/* </FadeIn> */}
          <div className="w-full">
            <div className="flex items-center justify-center flex-col sm:flex-row gap-5 my-8">
              {/* <FadeIn> */}
              <a
                data-aos="fade-in"
                href="https://chromewebstore.google.com/detail/wawcd-chatgpt-powered-wha/gbbpfmmjcaakdmhlnjfdlhlehoeikbic"
                target="_blank"
              >
                <IconButton isStarted={true} text={data?.started_btn} />
              </a>
              {/* </FadeIn> */}
              {/* <FadeIn> */}
              <div
                data-aos="fade-in"
                onClick={() => {
                  const section = document.getElementById(0);
                  const offset = -80;

                  if (section) {
                    const offsetTop = section.offsetTop + offset;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <IconButton isStarted={false} text={data?.feature_btn} />
              </div>
              {/* </FadeIn> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col md:flex-row w-full gap-4 pb-8">
          {/* <PopUp delay={1} duration={1} isBounce={true}> */}
          <div
            data-aos="zoom-in"
            data-aos-delay="800"
            className="bg-white bg-opacity-70 rounded-[30px] py-4 px-8 mx-3 w-fit"
          >
            <p className="font-medium text-xl text-primary font-plus">
              {data?.contact_title}
            </p>
            <div className="pl-3">
              {data?.contact_types?.data?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center mt-2 font-plus"
                >
                  {item?.image && (
                    <Image
                      src={item?.image || "/assets/placeholder.png"}
                      width={20}
                      height={20}
                      alt="icon"
                      style={{ width: "20px", height: "20px" }}
                    />
                  )}
                  <p className="text-lg font-medium text-primary hover:text-secondary">
                    {item?.title}
                  </p>
                </div>
              ))}
              <div className="mt-2 font-plus text-primary text-lg">
                {data?.contact_end}
              </div>
            </div>
          </div>
          {/* </PopUp> */}
          <div className="max-w-[400px] px-3 sm:p-0">
            <div className="flex flex-wrap gap-2">
              {data?.chips?.data?.map((item, index) => (
                // <PopUp delay={2} duration={1} key={index} isBounce={true}>
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay="800"
                  className="font-medium hover:text-secondary text-[#323232] rounded-full px-5 py-1 flex items-center transition-all duration-300 bg-white bg-opacity-70 scale-1 hover:scale-[1.025]"
                >
                  {item}
                </div>
                // </PopUp>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {data?.websites?.data?.map((item, index) => (
                // <PopUp delay={2} duration={1} key={index} isBounce={true}>
                <SiteContainer key={index} item={item} />
              ))}
              {/* </PopUp> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
