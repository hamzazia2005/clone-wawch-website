import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { PopUp } from "@/animations";

const BlocksRender = ({ data }) => {
  console.log('Block Render data =========>', data);
  return (
    <div className="blocks-class">
      <BlocksRenderer
        content={data}
        blocks={{
          image: ({ image }) => {
            return (
              <PopUp>
                <Image
                  //priority={true}
                  src={image.url || "/assets/placeholder.png"}
                  width={image.width}
                  height={image.height}
                  alt={image.alternativeText || "image"}
                  className="block my-4"
                />
              </PopUp>
            );
          },
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return (
                  // <FadeIn>
                  <h1
                    className={`block my-6 text-[50px] font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h1>
                );
                {
                  /* </FadeIn> */
                }

              case 2:
                return (
                  // <FadeIn>
                  <h2
                    className={`block my-[22px] text-[40px] font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h2>
                  // </FadeIn>
                );
              case 3:
                return (
                  // <FadeIn>
                  <h3
                    className={`block my-5 text-[30px] font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h3>
                );
                {
                  /* </FadeIn> */
                }

              case 4:
                return (
                  // <FadeIn>
                  <h4
                    className={`block my-[18px] text-[25px] font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h4>
                );
                {
                  /* </FadeIn> */
                }

              case 5:
                return (
                  // <FadeIn>
                  <h5
                    className={`block my-4 text-[20px] font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h5>
                  // </FadeIn>
                );
              case 6:
                return (
                  // <FadeIn>
                  <h6
                    className={`block my-[14px] text-lg font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h6>
                );
                {
                  /* </FadeIn> */
                }

              default:
                return (
                  // <FadeIn>
                  <h6
                    className={`block my-[14px] text-lg font-bold leading-[120%] text-inherit`}
                  >
                    {children}
                  </h6>
                );
                {
                  /* </FadeIn> */
                }
            }
          },
          paragraph: ({ children }) => (
            <div>
              <p
                className={`inline my-3 text-base font-poppins leading-[160%] text-inherit`}
              >
                {children}
              </p>
            </div>
          ),
          list: ({ children, format }) => {
            switch (format) {
              case "ordered":
                return (
                  // <FadeIn>
                  <ol
                    className={`list-decimal pl-5 my-3 text-base text-inherit`}
                  >
                    {children}
                  </ol>
                );
                {
                  /* </FadeIn> */
                }

              case "unordered":
                return (
                  // <FadeIn>
                  <ul className={`list-disc pl-5 my-3 text-base text-inherit`}>
                    {children}
                  </ul>
                );
                {
                  /* </FadeIn> */
                }

              default:
                return (
                  // <FadeIn>
                  <ul className={`list-disc pl-5 my-3 text-lg text-inherit`}>
                    {children}
                  </ul>
                );
                {
                  /* </FadeIn> */
                }
            }
          },
        }}
      />
    </div>
  );
};

export default BlocksRender;
