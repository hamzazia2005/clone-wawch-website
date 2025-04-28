"use client";
import { useState } from "react";
import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { Toaster } from "react-hot-toast";
import Offers from "./pop-up";
import Image from "next/image";

const ActiveOffer = ({ data, offer, isContact }) => {
  const [open, setOpen] = useState(0);
  const [popUpOpen, isPopUpOpen] = useState(false);
  const [detail, setDetail] = useState(offer[0]?.attributes || null);
  const handleOpen = () => {
    isPopUpOpen((cur) => !cur);
  };
  return (
    <div className="flex justify-center items-center bg-[#222923] px-4 py-16">
      <div className="sm:max-w-[1440px] w-full">
        <Toaster position="bottom-center" />
        <Offers
          open={popUpOpen}
          handleOpen={handleOpen}
          data={data}
          offer={offer}
          isContact={isContact}
        />
        <h3
          className={`text-white text-[40px] sm:text-[56px] font-medium ${
            isContact ? "mb-32" : "mb-16"
          } font-poppins text-center mt-2 mx-3`}
        >
          {data?.heading}
          <span className="ml-2 text-transparent bg-gradient-to-r from-[#DCF6D4] to-[#49B974] bg-clip-text">
            {data?.heading2}
          </span>
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[40%] flex justify-center">
            <div>
              {offer.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${
                    open === index
                      ? "from-[#caf9bb] to-[#49B974]"
                      : "from-[#38a763d4] to-[#066E39]"
                  } w-[300px] rounded-md p-4 my-4 cursor-pointer flex justify-between`}
                  onClick={() => {
                    setOpen(index);
                    setDetail(item?.attributes);
                  }}
                >
                  <p
                    className={`${
                      open === index ? "text-black" : "text-white"
                    } text-sm font-poppins`}
                  >
                    {item?.attributes?.title}
                  </p>
                  {item?.attributes?.discount && (
                    <p
                      className={`${
                        open === index ? "text-black" : "text-white"
                      }  text-sm font-poppins`}
                    >
                      {item?.attributes?.discount}% off
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[60%] flex items-center justify-center order-first md:order-last">
            <div className="sm:w-[90%]">
              {detail && (
                <div className="flex flex-col xs:flex-row justify-between xs:gap-5 w-full xs:items-center">
                  <Image
                    src={
                      detail?.logo?.data?.attributes?.url
                        ? isLocal
                          ? BASE_URL + detail?.logo?.data?.attributes?.url
                          : detail?.logo?.data?.attributes?.url
                        : "/assets/placeholder.png"
                    }
                    alt="logo"
                    width={202}
                    height={50}
                    className="object-contain"
                  />
                  <a
                    href={detail?.link?.link}
                    target="_blank"
                    className="text-white w-fit font-medium font-poppins order-first xs:order-last text-right"
                  >
                    {detail?.link?.title}
                  </a>
                </div>
              )}
              <p className="text-white break-words font-medium font-poppins text-[32px] sm:text-[48px] my-4 leading-snug">
                {detail?.description}
              </p>
              <button
                className={`w-fit text-nowrap transition-all duration-300 py-3 rounded-[8px] px-8 scale-1 hover:scale-[1.045] text-white font-medium font-poppins border-2 border-white hover:bg-secondary`}
                onClick={handleOpen}
              >
                {detail?.btn_txt}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 mx-2 sm:mx-12 md:mx-24 px-2 sm:px-12 py-12 bg-white bg-opacity-10 rounded-lg flex flex-col items-center">
          <p className="text-white text-center font-medium font-poppins text-[36px] sm:text-[48px] my-4 leading-snug">
            {data?.combine_discount}
          </p>
          <button
            className={`max-w-[400px] w-full mt-8 text-nowrap transition-all duration-300 py-3 rounded-[8px] px-8 scale-1 hover:scale-[1.045] text-black font-medium font-poppins bg-gradient-to-r from-[#caf9bb] to-[#49B974]`}
            onClick={handleOpen}
          >
            {data?.btn_text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveOffer;
