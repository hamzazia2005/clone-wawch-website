"use client";
import { Button, FaqQuestion } from "@/components";
import { useAppContext } from "@/context";
import { Cta } from "@/views/home";
import Link from "next/link";

const Faq = ({ data, faqs }) => {
  const { lang } = useAppContext();

  console.log('============>FAQ PAGE=========>', faqs);
  console.log('============>data =========>', data);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1440px] w-full px-5 sm:px-12 py-12">
        {faqs && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-[40%] md:pl-4">
              {/* <FadeIn> */}
              <p
                data-aos="fade-up"
                className={`font-bold font-plus text-4xl text-[#010205]`}
              >
                {data?.heading}
              </p>
              {/* </FadeIn>
              <FadeIn> */}
              <div
                data-aos="fade-up"
                className={`my-6 font-poppins text-primary`}
              >
                {data?.description}
              </div>
              {/* </FadeIn>
              <FadeIn> */}
              <div
                data-aos="fade-up"
                className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 w-fit"
              >
                <Link href={`/faqs/${lang}`}>
                  <Button
                    isPrimary={false}
                    text={data?.btn_text1}
                    background={true}
                  />
                </Link>
                <Link href={`/contact-us/${lang}`}>
                  <Button isPrimary={false} text={data?.btn_text2} />
                </Link>
              </div>
              {/* </FadeIn> */}
            </div>
            <div className="md:w-[60%] pt-12 md:pt-0 md:pl-10">
              {faqs?.map(
                (item, index) =>
                  index !== 4 && (
                    <div key={index}>
                      {/* <PopUp duration={1}> */}
                      <FaqQuestion item={item} flag={false} />
                      {/* </PopUp> */}
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        <Cta data={data} />
      </div>
    </div>
  );
};

export default Faq;
