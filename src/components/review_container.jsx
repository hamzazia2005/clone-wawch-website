"use client";
// import { FadeIn } from '@/animations';
import { Star } from "@/icons";
import Image from "next/image";
import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { Tooltip } from "@material-tailwind/react";

const truncateComment = (comment, maxLength) => {
  return comment.length > maxLength
    ? comment.substring(0, maxLength) + "..."
    : comment;
};

const ReviewContainer = ({ item, index }) => {
  const renderStars = () => {
    return Array.from({ length: item?.rating }, (_, i) => (
      <div key={i}>
        <Star />
      </div>
    ));
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="400"
      key={index}
      className="flex flex-col justify-between bg-[#DCF6D4] md:min-h-full hover:shadow-lg rounded-md p-4 scale-1 hover:scale-[1.025] transition-all"
    >
      {/* <FadeIn duration={0.4}> */}
      <div className="flex">{renderStars()}</div>
      {item?.comment.length > 190 ? (
        <Tooltip
          content={item?.comment}
          className="max-w-[310px]"
          placement="bottom"
        >
          <p className="my-4 text-primary">
            '{truncateComment(item?.comment, 190)}'
          </p>
        </Tooltip>
      ) : (
        <p className="my-4 text-primary">{item?.comment}</p>
      )}
      {/* </FadeIn> */}
      {/* <FadeIn delay={0.4} duration={0.8}> */}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="400"
        className="flex items-center gap-4"
      >
        <Image
          src={
            item?.profile_pic?.url
              ? isLocal
                ? BASE_URL + item?.profile_pic?.url
                : "" + item?.profile_pic?.url
              : "/assets/placeholder.png"
          }
          width={50}
          height={50}
          //priority={true}
          className="rounded-full"
          alt="profile-pic"
        />
        <div>
          <p className="text-primary font-semibold text-sm">{item?.name}</p>
          <p className="text-primary text-sm opacity-50">{item?.passion}</p>
        </div>
      </div>
      {/* </FadeIn> */}
    </div>
  );
};

export default ReviewContainer;
