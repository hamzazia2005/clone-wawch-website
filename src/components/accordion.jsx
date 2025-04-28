"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const AccordionWorks = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Accordion
      open={open}
      className="bg-white rounded-[20px] px-3 mb-4 hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] transition-all"
    >
      <AccordionHeader
        className="text-black1 border-b-0 flex flex-row justify-start text-lg font-poppins font-bold pb-2 leading-9"
        onClick={() => toggle()}
      >
        <h3 className="flex items-center">
          <p className="whitespace-nowrap mr-1">0{index + 1} -</p>
          <div className="flex items-center">
            <p>{item?.title}</p>
            {item?.isComing && (
              <span className="font-normal items-center text-sm">
                ({item?.isComing})
              </span>
            )}
            <span className="text-secondary text-lg block xs:inline font-medium font-poppins ml-1">
              {item?.title2}
            </span>
          </div>
        </h3>
      </AccordionHeader>
      <AccordionBody className="pl-10 pt-0 pb-4 pr-3">
        {item?.desc}
      </AccordionBody>
    </Accordion>
  );
};

export default AccordionWorks;
