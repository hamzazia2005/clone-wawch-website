import Image from "next/image";
import { BlocksRender, Button } from ".";
import Link from "next/link";

const Testimonial = ({ data }) => {
  return (
    <div className="max-w-[1040px] w-full mx-auto px-4 sm:px-12 mb-12">
      <h2 className="text-2xl font-plus font-semibold text-center text-secondary mb-8">
        {data?.heading}
      </h2>
      <div className="bg-[#F0FEF7] shadow-md rounded-[16px] flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-10">
        <div className="flex-shrink-0 w-[250px] h-[300px] md:w-[220px] md:h-[260px] rounded-xl overflow-hidden bg-white flex items-center justify-center">
          {data?.image && (
            <Image
              src={data?.image?.url}
              alt={data?.name || "testimonial image"}
              width={220}
              height={260}
              className="object-cover w-full h-full rounded-xl"
              style={{ objectFit: "cover" }}
              priority
            />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <p className="text-[22px] md:text-[28px] font-poppins font-semibold text-secondary leading-snug mb-4">
            {data?.review}
          </p>
          <div className="mt-2">
            <p className="text-lg md:text-xl font-poppins font-semibold text-black mb-1">
              {data?.name}
            </p>
            <p className="text-sm md:text-base text-[#666666] font-poppins">
              {data?.role}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link
          href={data?.btn_link}
          target="_blank"
          className="w-fit mx-auto block"
        >
          <Button
            isPrimary={false}
            text={data?.btn_txt}
            background={true}
            isborder={false}
            isDisable={false}
            isWrap={true}
          />
        </Link>
        {data?.any_question && (
          <div className="my-8 flex justify-center">
            <BlocksRender data={data?.any_question} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
