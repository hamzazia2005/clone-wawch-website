"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Arrow } from "@/icons";

const FaqAccordion = ({ item, index }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  return (
    <Accordion
      open={open === index}
      icon={<Arrow index={index} open={open} />}
      className={`hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] transition-all ${
        open === index ? "bg-[#DCF6D4]" : "bg-[#F6F6F6]"
      }  rounded-md px-3 py-2 mb-4`}
    >
      <AccordionHeader
        className="text-primary border-b-0 flex justify-between text-lg font-poppins font-semibold pb-2"
        onClick={() => handleOpen(index)}
      >
        <span>{item?.question}</span>
      </AccordionHeader>
      <AccordionBody className="pt-0 pb-4 pr-12 font-poppins font-normal text-primary">
        {item?.answer}
      </AccordionBody>
    </Accordion>
  );
};

export default FaqAccordion;
