import { BASE_URL, isLocal } from "@/utils/axios_instance";
import Image from "next/image";

const WhyWawcd = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px] w-full px-4 sm:px-12 py-12">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-8 md:justify-between md:items-center"
          >
            <div>
              <h3 className="mb-6 mt-8 md:mt-0 text-black leading-snug font-plus text-[30px] sm:text-[36px] font-semibold">
                {item?.attributes?.heading}
              </h3>
              <p className="font-poppins text-black">
                {item?.attributes?.description}
              </p>
            </div>
            {item?.attributes?.image?.data?.attributes?.url && (
              <Image
                src={
                  item?.attributes?.image?.data?.attributes?.url
                    ? isLocal
                      ? BASE_URL +
                        item?.attributes?.image?.data?.attributes?.url
                      : item?.attributes?.image?.data?.attributes?.url
                    : "/assets/placeholder.png"
                }
                width={300}
                height={300}
                //priority={true}
                alt="numbers"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyWawcd;
