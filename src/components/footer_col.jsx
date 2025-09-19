"use client";
import { useAppContext } from "@/context";
import Link from "next/link";

const FooterCol = ({ title, items }) => {
  const { lang } = useAppContext();
   

  return (
    <div>
      <p className="text-black font-plus font-bold leading-6 text-lg mb-6 text-wrap">
        {title}
      </p>
      {items?.map((item, index) => {
        return (
          <Link
            key={index}
            href={
              !item?.link?.includes("/author") &&
              !item?.link?.includes("/blog") &&
              !item?.link?.includes("/resources") 
                ? item?.link === "/"
                  ? `/${lang}`
                  : lang?`/${lang}${item?.link}`:`${lang}${item?.link}`
                : item?.link
            }
            className="cursor-pointer block text-third font-poppins leading-6 font-medium mb-3 text-wrap hover:text-secondary"
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterCol;
