"use client";
import Image from "next/image";
// import { FadeIn, PopUp } from "@/animations";
import { BASE_URL, isLocal } from "@/utils/axios_instance";

const Templates = ({ data, isImageRight }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px] w-full px-5 sm:px-12 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`flex items-center justify-center ${
            isImageRight
              ? "order-first md:order-last"
              : "order-last md:order-first"
          }`}
        >
          {/* <PopUp duration={0.8}> */}
          <Image
            data-aos="zoom-in"
            data-aos-duration="800"
            src={
              data?.image?.data?.url
                ? isLocal
                  ? BASE_URL + data?.image?.url
                  : data?.image?.url
                : "/assets/placeholder.png"
            }
            width={400}
            height={400}
            alt="features"
          />
          {/* </PopUp> */}
        </div>
        <div>
          {data?.title && (
            // <FadeIn duration={0.6}>
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              className="flex gap-2 items-start"
            >
              <Image
                src="/assets/workflow-template.svg"
                //priority={true}
                width={16}
                height={16}
                style={{ width: "16px", height: "16px" }}
                alt="template"
                className="mt-1"
              />
              <p className="text-green1 font-poppins font-medium">
                {data?.title}
              </p>
            </div>
            // </FadeIn>
          )}
          {/* <FadeIn delay={0.8} duration={0.5}> */}
          <h2
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay="800"
            className="text-primary font-poppins font-semibold text-4xl py-2 mt-1 mb-2"
          >
            {data?.heading}
          </h2>
          {data?.description && (
            <p
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="800"
              className="font-poppins font-medium text-sm text-third mb-6"
            >
              {data?.description}
            </p>
          )}
          {/* </FadeIn> */}
          {data?.chip?.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {data?.chip?.map((item, index) => (
                // <PopUp key={index} delay={1.1} duration={0.4} isBounce={true}>
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-delay="1100"
                  className="text-[#383838] scale-1 hover:scale-[1.025] transition-all duration-300 hover:text-secondary font-plus font-semibold hover:shadow-[5px_5px_4px_0px_#dcdcdc] py-2 px-3 border border-[#D6D6D6] rounded-full"
                >
                  {item?.chip}
                </div>
                // </PopUp>
              ))}
              {data?.many_more && (
                // <PopUp delay={1.1} duration={0.4} isBounce={true}>
                <div
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-delay="1100"
                  className="py-2 px-3 border border-[#D6D6D6] hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] transition-all rounded-full flex items-center gap-1"
                >
                  <Image
                    src="/assets/add-more.svg"
                    //priority={true}
                    width={25}
                    height={25}
                    alt="add"
                  />
                  <p className="text-[#383838] scale-1 transition-all duration-300 hover:text-secondary font-plus font-semibold">
                    {data?.many_more}
                  </p>
                </div>
                // </PopUp>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
