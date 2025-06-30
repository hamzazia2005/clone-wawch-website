"use client";
import { CheckBox } from "@/icons";
import { Button } from ".";
import Link from "next/link";
import { useEffect, useState } from "react";

const countryPriceMap = {
  AE: {
    priceMonthly: "aed_price_monthly",
    priceYearly: "aed_price_yearly",
    newPriceMonthly: "aed_new_price_monthly",
    newPriceYearly: "aed_new_price_yearly",
    currency: "AED",
  },
  BR: {
    priceMonthly: "brl_price_monthly",
    priceYearly: "brl_price_yearly",
    newPriceMonthly: "brl_new_price_monthly",
    newPriceYearly: "brl_new_price_yearly",
    currency: "BRL",
  },
  EG: {
    priceMonthly: "egp_price_monthly",
    priceYearly: "egp_price_yearly",
    newPriceMonthly: "egp_new_price_monthly",
    newPriceYearly: "egp_new_price_yearly",
    currency: "EGP",
  },
  ID: {
    priceMonthly: "idr_price_monthly",
    priceYearly: "idr_price_yearly",
    newPriceMonthly: "idr_new_price_monthly",
    newPriceYearly: "idr_new_price_yearly",
    currency: "IDR",
  },
  IN: {
    priceMonthly: "inr_price_monthly",
    priceYearly: "inr_price_yearly",
    newPriceMonthly: "inr_new_price_monthly",
    newPriceYearly: "inr_new_price_yearly",
    currency: "INR",
  },
  MY: {
    priceMonthly: "myr_price_monthly",
    priceYearly: "myr_price_yearly",
    newPriceMonthly: "myr_new_price_monthly",
    newPriceYearly: "myr_new_price_yearly",
    currency: "MYR",
  },
  PK: {
    priceMonthly: "pkr_price_monthly",
    priceYearly: "pkr_price_yearly",
    newPriceMonthly: "pkr_new_price_monthly",
    newPriceYearly: "pkr_new_price_yearly",
    currency: "PKR",
  },
  QA: {
    priceMonthly: "qar_price_monthly",
    priceYearly: "qar_price_yearly",
    newPriceMonthly: "qar_new_price_monthly",
    newPriceYearly: "qar_new_price_yearly",
    currency: "QAR",
  },
  SA: {
    priceMonthly: "sar_price_monthly",
    priceYearly: "sar_price_yearly",
    newPriceMonthly: "sar_new_price_monthly",
    newPriceYearly: "sar_new_price_yearly",
    currency: "SAR",
  },
};

const PricePlan = ({ i, item, isMonthly }) => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    // Fetch the user's country
    fetch(
      `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => setCountry(data.country))
      .catch((err) => setCountry("")); // fallback to default
  }, []);

  // Determine price and currency based on country
  const countryConfig = countryPriceMap[country];
  const price = countryConfig
    ? isMonthly
      ? item?.[countryConfig.newPriceMonthly]
      : item?.[countryConfig.newPriceYearly]
    : isMonthly
    ? item?.new_price_monthly
    : item?.new_price_yearly;
  const currency = countryConfig ? countryConfig.currency : item?.currency;

  // Determine old price for strikethrough display
  const oldPrice = countryConfig
    ? isMonthly
      ? item?.[countryConfig.priceMonthly]
      : item?.[countryConfig.priceYearly]
    : isMonthly
    ? item?.price_monthly
    : item?.price_yearly;

  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={i * 600}
      data-aos-duration="600"
      className={`flex flex-col justify-between border-2 sm:min-h-full p-4 pb-0 transition-all sm:hover:shadow-[0px_0px_14px_3px_#dcdcdc] border-secondary border-opacity-50 mt-10 rounded-[20px]`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-primary font-poppins font-semibold text-2xl">
              {item?.title}
            </h3>
            {item?.sale_tag && (
              <p className="bg-secondary text-white text-xs font-poppins font-semibold px-2 py-1 animate-pulse" style={{clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)'}}>
                {item?.sale_tag}
              </p>
            )}
          </div>
          {item?.tag && (
            <p className="bg-secondary text-white text-xs font-poppins font-semibold px-2 py-1 rounded-md">
              {item?.tag}
            </p>
          )}
        </div>
        <p className="text-gray1 font-poppins text-sm my-2">{item?.desc}</p>
        <div className="p-2 border rounded-md text-gray1 w-full">
          {item?.employees}
        </div>
        {(item?.new_price_monthly === 0 || item?.new_price_monthly) && (
          <div className="text-primary font-poppins mt-6 flex items-start gap-2">
            {oldPrice && (
              <p className="text-lg font-semibold leading-7 mr-2 text-gray-400 line-through">
                {oldPrice}
              </p>
            )}
            <p className="text-3xl font-semibold leading-7 mr-2">{price}</p>
            <div className="text-gray1 text-xs">
              <p className="leading-4">{currency}</p>
              <p className="leading-4">/{item?.month}</p>
            </div>
          </div>
        )}
        {!isMonthly && <p className="text-gray1 text-xs">{item?.billed}</p>}
        <p className="font-poppins font-semibold text-sm mt-6 text-primary mb-2">
          {item?.include_text}
        </p>
        {item?.includes.map((content, index) => (
          <div key={index} className="flex items-start gap-1 mb-1">
            <div>
              <CheckBox />
            </div>
            <p className="text-primary text-[13px] font-poppins">
              {content}{" "}
              <span className="text-primary text-[11px] font-poppins">
                {item?.isComing &&
                item?.isComing[index] !== "" &&
                item?.isComing[index] !== undefined
                  ? `(${item?.isComing[index]})`
                  : ""}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-8 sm:mt-auto mb-6">
        <Link
          href={isMonthly ? item?.link_monthly : item?.link_yearly}
          target="_blank"
          rel="noreferrer"
          className="block w-full"
        >
          <Button isPrimary={true} text={item?.btn_text} isborder={true} />
        </Link>
        {item?.trial_link && item?.btn_trial_text && (
          <Link
            href={item?.trial_link}
            target="_blank"
            rel="noreferrer"
            className="block w-full"
          >
            <Button
              isPrimary={true}
              text={item?.btn_trial_text}
              isborder={true}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PricePlan;
