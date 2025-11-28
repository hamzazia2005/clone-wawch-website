"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";

const PromoModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpen = () => setOpen(!open);

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none p-0 outline-none"
      style={{
        maxWidth: "1109px",
        width: "100%",
        minWidth: "300px",
      }}
    >
      <div className="relative bg-[#132A23] rounded-xl overflow-hidden font-poppins border-none shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none" />

        <div className="absolute top-3 right-3 z-30">
          <button
            onClick={handleOpen}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <DialogBody
          className="p-0 text-white relative z-10 flex flex-col items-center justify-center py-10 px-6 sm:px-[90px] sm:py-[62px]"
          style={{
            backgroundImage: `url('/assets/blk-fri-bg.png')`,
          }}
        >
          <div className="w-full mb-2">
            <p className="text-[42px] font-semibold tracking-normal font-poppins text-left">
              28 - 30 NOVEMBER
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-end justify-between gap-8 mb-8">
            <div className="relative flex flex-col">
              <h1 className="text-[122px] font-bold font-poppins tracking-normal leading-[1] text-white text-left">
                BLACK
              </h1>
              <h1 className="text-[122px] font-bold font-poppins tracking-normal leading-[1] text-white text-left">
                FRIDAY
              </h1>

              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#DB3A33] text-[149.8px] whitespace-nowrap pointer-events-none z-20"
                style={{
                  fontFamily: "var(--font-devonshire), cursive",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Sale
              </div>
            </div>

            <div className="flex flex-col items-end text-white pb-[24px]">
              <div className="flex items-start">
                <span className="text-8xl sm:text-[14.2rem] font-bold leading-[83px]">
                  50
                </span>
                <span className="text-4xl sm:text-7xl font-bold leading-none -mt-4">
                  %
                </span>
              </div>

              <p className="text-lg sm:text-3xl font-medium uppercase tracking-wide text-right mt-[58px]">
                OFF ON ALL PLANS!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 overflow-hidden w-[910px] mb-[34px]">
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            ].map((_, index) => (
              <div
                key={index}
                className="bg-white h-[4px] w-[32px] rounded-lg"
              ></div>
            ))}
          </div>

          <button className="bg-[#DB3A33] text-white font-semibold py-3 px-10 rounded-md text-lg hover:bg-[#b92b25] transition-colors shadow-lg uppercase tracking-wide">
            Use Promo - Code: FRIDAY50
          </button>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default PromoModal;
