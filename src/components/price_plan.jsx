"use client";
import { CheckBox } from "@/icons";
import { Button } from ".";
import Link from "next/link";

const PricePlan = ({ i, item, isMonthly }) => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={i * 600}
      data-aos-duration="600"
      className={`flex flex-col justify-between border-2 sm:min-h-full p-4 pb-0 transition-all sm:hover:shadow-[0px_0px_14px_3px_#dcdcdc] border-secondary border-opacity-50 mt-10 rounded-[20px]`}
    >
      <div>
        <h3 className="text-primary font-poppins font-semibold text-2xl">
          {item?.title}
        </h3>
        <p className="text-gray1 font-poppins text-sm my-2">{item?.desc}</p>
        <div className="p-2 border rounded-md text-gray1 w-full">
          {item?.employees}
        </div>
        {item?.price_monthly && (
          <div className="text-primary font-poppins mt-6 flex items-start">
            <p className="text-sm font-semibold">$</p>
            <p className="text-3xl font-semibold leading-7 mr-2">
              {isMonthly ? item?.price_monthly : item?.price_yearly}
            </p>
            <div className="text-gray1 text-xs">
              <p className="leading-4">{item?.currency}</p>
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
                {item?.isComing && item?.isComing[index] !== ""
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
