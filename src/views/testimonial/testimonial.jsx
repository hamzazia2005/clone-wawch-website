

import { TestimonialCard } from "@/components";
//import { useEffect, useState } from "react";

const Testimonial = ({ data }) => {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) return null;

  return (
    <div className="flex justify-center items-center">
      <div   className="max-w-[1440px] w-full px-4 sm:px-12 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {data?.map((item, index) => (
            <div key={index} className="mb-6 break-inside-avoid">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
