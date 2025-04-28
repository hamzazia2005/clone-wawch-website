"use client";
import { useAppContext } from "@/context";
import { IconButton } from "@/components";
import { FadeIn } from "@/animations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GetStarted = ({ data, islarge }) => {
  const { lang } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push("/404");
    }
  }, [data, router]);

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center items-center mt-24 bg-banner bg-cover">
      <div
        className={`${
          islarge ? "max-w-[1134px]" : "max-w-[800px]"
        } w-full rounded-md`}
      >
        <div className="py-20 px-3 md:px-12">
          <FadeIn>
            <p className="text-green1 font-medium text-center font-poppins">
              {data?.title}
            </p>
          </FadeIn>
          <FadeIn>
            <h1 className="text-primary text-[36px] sm:text-[45px] md:text-[52px] font-bold sm:font-semibold font-plus text-center my-4">
              {data?.heading}
            </h1>
          </FadeIn>
          {data?.description && (
            <FadeIn>
              <p className="text-lg font-poppins font-medium mb-4 text-[#606060] text-center max-w-[648px] mx-auto">
                {data?.description}
              </p>
            </FadeIn>
          )}
          <div className="w-full">
            <div className="flex items-center justify-center flex-col sm:flex-row gap-5 my-8">
              <FadeIn>
                <a
                  href="https://chromewebstore.google.com/detail/wawcd-chatgpt-powered-wha/gbbpfmmjcaakdmhlnjfdlhlehoeikbic"
                  target="_blank"
                >
                  <IconButton isStarted={true} text={data?.btn_txt1} />
                </a>
              </FadeIn>
              <FadeIn>
                <Link href={`/contact-us/${lang}`}>
                  <IconButton isStarted={false} text={data?.btn_txt2} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
