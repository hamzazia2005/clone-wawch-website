import { IconButton } from "@/components";
// import { FadeIn } from "@/animations";
import Image from "next/image";

const Cta = ({ data }) => {
  return (
    <div className="my-16 p-8 relative ">
      <Image
        src="/assets/cta.webp"
        fill
        style={{ objectFit: "cover" }}
        alt="Background Image"
        className="z-[-1] rounded-md"
        sizes="100vw"
        loading="lazy"
      />

      <div className="flex flex-col md:flex-row gap-y-8 gap-x-8 items-center justify-between">
        {/* <FadeIn> */}
        <h3
          data-aos="fade-up"
          className="font-poppins font-semibold text-2xl sm:text-[34px] leading-[50px] text-primary md:w-[62%]"
        >
          {data?.heading2}
        </h3>
        {/* </FadeIn> */}
        {/* <FadeIn> */}
        <a
          data-aos="fade-up"
          href="https://chromewebstore.google.com/detail/wawcd-chatgpt-powered-wha/gbbpfmmjcaakdmhlnjfdlhlehoeikbic"
          target="_blank"
        >
          <IconButton isStarted={true} text={data?.btn_text3} isWrap={true} />
        </a>
        {/* </FadeIn> */}
      </div>
    </div>
  );
};

export default Cta;
