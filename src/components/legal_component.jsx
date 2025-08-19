"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { PopUp } from "@/animations";

const Legal_BlockRender = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const toggleAllAccordions = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="blocks-class my-2">
      <BlocksRenderer
        content={data}
        blocks={{
          image: ({ image }, index) => (
            <PopUp key={index}>
              <Image
                src={image.url || "/assets/placeholder.png"}
                width={image.width}
                height={image.height}
                alt={image.alternativeText || "image"}
                className="block my-4"
              />
            </PopUp>
          ),
          heading: ({ children }, index) => (
            <Accordion
              key={index}
              open={isExpanded}
              className="cursor-default bg-white rounded-[20px] px-3 mb-4"
            >
              <AccordionHeader
                className={"cursor-default text-black text-lg font-bold"}
              >
                {children}
              </AccordionHeader>
            </Accordion>
          ),
          paragraph: ({ children }, index) => (
            <Accordion key={index} open={isExpanded} className="px-3">
              <AccordionBody className="text-black my-2 inline text-base font-poppins leading-[160%] text-inherit">
                {children}
              </AccordionBody>
            </Accordion>
          ),
          list: ({ children, format }, index) => (
            <Accordion key={index} open={isExpanded} className="px-3">
              <AccordionBody className="pt-0 my-2">
                {format === "ordered" ? (
                  <ol className="list-decimal pl-5 text-base text-inherit">
                    {children}
                  </ol>
                ) : (
                  <ul className="list-disc pl-5 text-base text-inherit">
                    {children}
                  </ul>
                )}
              </AccordionBody>
            </Accordion>
          ),
        }}
      />
      {/* <button
        onClick={toggleAllAccordions}
        className='my-4 px-4 py-2 float-right bg-[#47B772] text-white rounded-md'
      >
        {isExpanded ? 'Collapse All' : 'Expand All'}
      </button> */}
    </div>
  );
};

export default Legal_BlockRender;
