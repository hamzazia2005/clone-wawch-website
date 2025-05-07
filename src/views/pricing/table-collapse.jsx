"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Dropdown } from "@/icons";

const TableCollapse = ({ data = [], title, head = [] }) => {
  const [open, setOpen] = React.useState(true);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="px-3 py-2 max-w-[1440px] w-full flex justify-center">
      <Accordion open={title ? open : true}>
        {title && (
          <AccordionHeader className="cursor-default bg-white text-[#3F4E41] text-[19px] shadow-none flex items-center gap-2 justify-start border-none">
            <span
              className={`ml-2 transition-transform duration-300 ${
                open ? "rotate-90" : "rotate-0"
              }`}
            >
              <Dropdown />
            </span>
            <span onClick={toggleOpen} className="cursor-pointer">
              {title}
            </span>
          </AccordionHeader>
        )}
        <AccordionBody className="my-2 mx-auto w-full shadow-none">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-none">
              {head?.map((x, index) => (
                <thead key={index}>
                  <tr className="bg-white">
                    <th className="px-4 text-center w-1/5 ">{x.empty}</th>
                    <th className="px-4 text-center w-1/5">{x.free}</th>
                    <th className="px-4 text-center w-1/5">{x.basic}</th>
                    <th className="px-4 text-center w-1/5">{x.pro}</th>
                    <th className="px-4 text-center w-1/5">{x.premium}</th>
                  </tr>
                </thead>
              ))}

              <tbody>
                {data.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-none text-[#3F4E41] text-[15px] font-[500]"
                  >
                    <td className="px-4 py-2 text-[#3F4E41] text-[15px]">
                      {feature.name}
                    </td>
                    <td className="px-4 py-2 text-center w-1/5">
                      <div
                        className="bg-[#DCF6D45E] rounded-md p-2 flex justify-center  h-[52px] items-center"
                        dangerouslySetInnerHTML={{ __html: feature.free }}
                      ></div>
                    </td>
                    <td className="px-4 py-2 text-center w-1/5">
                      <div
                        className="bg-[#DCF6D45E] rounded-md p-2 flex justify-center  h-[52px] items-center"
                        dangerouslySetInnerHTML={{ __html: feature.basic }}
                      ></div>
                    </td>
                    <td className="px-4 py-2 text-center w-1/5">
                      <div
                        className="bg-[#DCF6D45E] rounded-md p-2 flex justify-center  h-[52px] items-center"
                        dangerouslySetInnerHTML={{ __html: feature.pro }}
                      ></div>
                    </td>
                    <td className="px-4 py-2 text-center w-1/5">
                      <div
                        className="bg-[#DCF6D45E] rounded-md p-2 flex justify-center  h-[52px] items-center"
                        dangerouslySetInnerHTML={{ __html: feature.premium }}
                      ></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default TableCollapse;
