import Image from "next/image";
import { Checkbox } from ".";
import { FadeIn } from "@/animations";

const AboutContainer = ({ item }) => {
  return (
    <div
      className={`relative p-4 z-20 rounded-lg h-full hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] transition-all`}
    >
      <div data-aos="fade-up" data-aos-duration="400" className="relative z-10">
        {/* <FadeIn duration={0.4}> */}
        <h3 className="text-[#1D1D21] font-semibold text-2xl font-plus mb-2">
          {item?.title}
        </h3>
        {/* </FadeIn> */}
        {/* <FadeIn delay={0.4} duration={0.8}> */}
        <p
          data-aos-delay="400"
          className="text-third text-sm font-medium font-poppins mb-4"
        >
          {item?.description}
        </p>
        {item?.image && (
          <Image
            src={item?.image || "/assets/placeholder.png"}
            //priority={true}
            width={500}
            height={100}
            alt="workflow"
            style={{ width: "auto", height: "auto" }}
            className="mt-8"
          />
        )}
        {item?.checkbox1 && (
          <div>
            <div className="mb-2">
              <Checkbox item={item?.checkbox1} />
            </div>
            <Checkbox item={item?.checkbox2} />
          </div>
        )}
        {/* </FadeIn> */}
      </div>
      <div className="absolute inset-0">
        <Image
          src={item?.bg || "/assets/placeholder.png"}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="bg-image"
          className="w-full h-full object-cover bg-center rounded-lg z-0"
        />
      </div>
    </div>
  );
};

export default AboutContainer;
