"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { Arrow } from "@/icons";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FaqQuestion = ({ item, flag }) => {
  const { lang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    if (!flag) setIsOpen(!isOpen);
  };

  return (
    <div
      data-aos="zoom-in"
      className={`hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] transition-all bg-[#F6F6F6] rounded-md px-3 py-4 mb-4 cursor-pointer`}
      onClick={toggleAnswer}
    >
      {flag ? (
        <Link
          href={`/${lang}/faq/${item.slug}/`}
          className="flex justify-between items-center"
        >
          <p className="text-primary text-lg font-poppins font-semibold">
            {item?.question}
          </p>
          <Arrow className={lang === "ar" ? "transform rotate-180" : ""} />
        </Link>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-primary text-lg font-poppins font-semibold">
            {item?.question}
          </p>
          <ChevronDown
            className={`w-6 h-6 text-primary transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      )}

      {!flag && isOpen && (
        <p className="text-third text-base mt-3 font-poppins">
          {item?.search_answer}
        </p>
      )}
    </div>
  );
};

export default FaqQuestion;
