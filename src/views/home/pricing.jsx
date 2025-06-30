"use client";
import { PricePlan, Button } from "@/components";
import { useAppContext } from "@/context";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { BASE_URL, isLocal } from "@/utils/axios_instance";
import Image from "next/image";
import Link from "next/link";

const Pricing = ({ data, isPage }) => {
  const [isMonthly, setIsMonthly] = useState(false);
  const { lang } = useAppContext();

  useEffect(() => {
    if (typeof window.updateButtonUrls === "function") {
      window.updateButtonUrls();
    }
  }, [isMonthly]);

  const scrollToEnterprise = useCallback(() => {
    const enterpriseDiv = document.getElementById("enterprise-card");
    if (enterpriseDiv) {
      enterpriseDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleTabClick = useCallback(
    (index) => {
      if (index === 0) {
        setIsMonthly(false);
      } else if (index === 1) {
        setIsMonthly(true);
      } else if (index === 2) {
        scrollToEnterprise();
      }
    },
    [scrollToEnterprise]
  );

  const tabs = useMemo(
    () => (
      <Tabs value={0} className="flex justify-center">
        <TabsHeader
          className="w-fit p-2 border border-black rounded-full"
          indicatorProps={{
            className: "bg-[#DCF6D4] rounded-full",
          }}
        >
          {data?.type?.map((label, index) => (
            <Tab
              key={index}
              value={index}
              onClick={() => handleTabClick(index)}
              className="whitespace-nowrap text-primary sm:px-4 font-bold font-poppins tracking-[-0.2px] w-fit text-sm md:text-base lg:text-lg"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    ),
    [data?.type, handleTabClick]
  );

  return (
    <div className="flex justify-center items-center">
      <div
        data-aos="fade-up"
        className="max-w-[1440px] w-full px-5 sm:px-12 py-8"
      >
        {isPage && (
          <>
            {/* <FadeIn> */}
            <p className="text-center">#Best WhatsApp Chrome Extension</p>
            {/* </FadeIn>
            <FadeIn> */}
            <h2 className="text-primary font-semibold font-poppins text-[60px] tracking-[-1.11px] text-center">
              {data?.heading}{" "}
              <span className="text-secondary opacity-80">
                {data?.heading2}
              </span>
            </h2>
            {/* </FadeIn>
            <FadeIn> */}
            <p className="text-secondary text-center text-[15px] font-medium font-poppins mt-3 mb-6 tracking-[-0.19px]">
              {data?.description}
            </p>
            {/* </FadeIn>
            <FadeIn> */}
            {data?.type && tabs}
            {/* </FadeIn> */}
          </>
        )}
        <div className="flex justify-center">
          <div className="sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-y-16 max-w-[300px] w-full sm:max-w-[650px] lg:max-w-full mt-10">
            {data?.prices?.map((item, index) => (
              <div key={index} className="flex flex-col">
                {item?.tag && (
                  <p className="text-white font-semibold text-center font-poppins p-2 bg-secondary rounded-t-[16px] mt-8 sm:mt-0">
                    {item?.tag}
                  </p>
                )}
                <PricePlan
                  key={index}
                  i={index}
                  item={item}
                  isMonthly={isMonthly}
                />
              </div>
            ))}
          </div>
        </div>
        {!isPage && (
          <div className="mt-20 bg-[#F6F6F6] px-5 py-5 flex gap-8 items-center rounded-[9px] flex-col md:flex-row">
            {/* <FadeIn> */}
            <div data-aos="fade-up">
              <p className="text-primary font-poppins font-semibold text-3xl sm:text-4xl">
                {data?.offer_title}
              </p>
              <p className="text-primary font-poppins text-opacity-50 mt-4 mb-8">
                {data?.offer_description}
              </p>
              <div className="w-fit">
                <Link href={`/avail-offer/${lang}`}>
                  <Button isPrimary={false} text={data?.offer_btn} />
                </Link>
              </div>
            </div>
            {/* </FadeIn> */}
            <div data-aos="fade-up" className="order-first md:order-last">
              {/* <PopUp> */}
              <Image
                data-aos="zoom-in"
                src={
                  data?.image?.data?.attributes?.url
                    ? isLocal
                      ? BASE_URL + data?.image?.data?.attributes?.url
                      : data?.image?.data?.attributes?.url
                    : "/assets/placeholder.png"
                }
                alt="avail-offer"
                width={800}
                height={800}
              />
              {/* </PopUp> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
