"use client";
import { ReviewContainer } from "@/components";
// import { FadeIn } from "@/animations";
import { useRef } from "react";
import Image from "next/image";
import { BASE_URL, isLocal } from "@/utils/axios_instance";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Reviews } from "@/icons";
import Link from "next/link";

const Review = ({ data, reviews, platform }) => {
  const SliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px] w-full px-5 sm:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-8">
          <div className="ml-2">
            {/* <FadeIn> */}
            <div data-aos="fade-up" className="flex gap-1 items-center mb-2">
              <Image
                src={data ? data?.title?.image : "/assets/placeholder.png"}
                //priority={true}
                width={16}
                height={16}
                alt="icon"
              />
              <p className={`text-green1 font-poppins font-semibold`}>
                {data?.title?.title}
              </p>
            </div>
            {/* </FadeIn>
            <FadeIn> */}
            <h2
              data-aos="fade-up"
              className={`text-black font-poppins font-semibold text-[40px] leading-[60px] mt-1 mb-2`}
            >
              {data?.heading}
            </h2>
            {/* </FadeIn> */}
          </div>
          <div>
            {/* <FadeIn> */}
            <div
              data-aos="fade-up"
              className="flex gap-1 items-center mb-2 h-fit"
            >
              <Reviews color="#0A4035" />
              <p className={`text-green1 font-poppins font-medium`}>
                {data?.title2}
              </p>
            </div>
            {/* </FadeIn> */}
            <div
              data-aos="fade-up"
              className="grid grid-cols-2 xs:flex xs:flex-wrap gap-6 xs:justify-start"
            >
              {platform?.data?.map((item, index) => (
                <div key={index} className="flex justify-center">
                  {/* <FadeIn> */}
                  <Link
                    data-aos="fade-up"
                    href={item?.link}
                    target="_blank"
                    // className="w-[80px] h-[80px]"
                  >
                    <Image
                      className="scale-100 hover:scale-[1.07] transition-transform duration-300 opacity-80 hover:opacity-100 rounded-lg"
                      src={
                        item?.icon?.url
                          ? isLocal
                            ? BASE_URL +
                              item?.icon?.url
                            : item?.icon?.url
                          : "/assets/placeholder.png"
                      }
                      alt="logo"
                      width={80}
                      height={80}
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        width: "auto",
                        height: "80px",
                      }}
                      // className="w-[80px] h-[80px]"
                    />
                  </Link>
                  {/* </FadeIn> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Slider ref={SliderRef} {...settings}>
              {reviews?.data?.map((item, index) => (
                <ReviewContainer key={index} item={item} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
