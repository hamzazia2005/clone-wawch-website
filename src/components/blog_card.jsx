"use client";
import { BASE_URL, isLocal } from "@/utils/axios_instance";
import Image from "next/image";
import Link from "next/link";
import { Category } from ".";
import { FormatDate, GenerateUrl } from "@/utils";
import { Tooltip } from "@material-tailwind/react";

const BlogCard = ({ item, flag }) => {
  const data = item?.attributes;
  const date = FormatDate(item?.attributes.publishedAt);
  // const time = FormatTime(item?.attributes.publishedAt);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  return (
    <div
      className={`p-4 pb-6 ${
        flag
          ? "sm:min-h-[450px] lg:min-h-[440px]"
          : "w-full max-w-[525px] sm:max-w-[240px] sm:max-h-[320px] sm:min-w-[210px]"
      } border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_2px_2px_#dcdcdc] rounded-lg flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <Link href={GenerateUrl(data?.slug)}>
          <Image
            src={
              data?.image?.data[0]?.attributes
                ? isLocal
                  ? BASE_URL + data?.image?.data[0]?.attributes?.url
                  : "" + data?.image?.data[0]?.attributes?.url
                : "/assets/placeholder.png"
            }
            alt="blog"
            //priority={true}
            width={1000}
            height={1000}
            className={`rounded-lg cursor-pointer mb-4 object-cover ${
              flag ? "md:h-[190px] lg:h-[230px]" : "h-[140px] w-full"
            }`}
          />
        </Link>
        <div className="flex justify-between items-center">
          <div>
            {flag && data?.category && (
              <Category text={data?.category} color={data?.catagory_color} />
            )}
          </div>
          <p className={`${flag ? "text-sm" : "text-xs"} text-gray-400`}>
            {date}
          </p>
        </div>
        <Link href={GenerateUrl(data?.slug)}>
          <Tooltip
            content={data?.title}
            className={`${flag ? "max-w-[310px]" : "max-w-[180px]"}`}
            placement="bottom"
          >
            <h3
              className={`${
                flag
                  ? "text-xl sm:text-2xl md:text-xl"
                  : "text-base sm:text-lg md:text-base"
              } text-black1 font-plus font-semibold hover:text-secondary mt-4 ${
                flag ? "mb-16 sm:mb-5" : "mb-1"
              } cursor-pointer`}
            >
              {truncateTitle(data?.title, flag ? 40 : 20)}
            </h3>
          </Tooltip>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[#929EB8]"></p>
        <Link href={GenerateUrl(data?.slug)}>
          <button className="text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:p-2 hover:border-none hover:hover:shadow-[6px_4px_14px_1px_#dcdcdc] hover:rounded-lg border-black py-2 duration-200 scale-1 hover:scale-[1.025] transition-all">
            {data?.read_now}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
