import { BlogCard } from "@/components";
import { BASE_URL, isLocal } from "@/utils/axios_instance";
import Link from "next/link";
import { FormatDate, GenerateUrl } from "@/utils";

const ResourcesDetails = ({ displayCategory, blogs, categoryBanner }) => {
  return (
    <div className="flex justify-center items-center mt-12 md:mt-20">
      <div className="max-w-[1440px] px-5 sm:px-12 py-12 sm:w-[550px] w-[400px] md:w-[900px] lg:w-full">
        <div data-aos="fade-up" data-aos-duration="800">
          <h1 className="text-4xl text-black1 font-plus text-center font-bold my-3">
            {displayCategory.title}
          </h1>
          <p className="text-third text-lg text-center font-poppins mx-3 sm:mx-8 lg:mx-40">
            {displayCategory.description || `Explore our collection of ${displayCategory.title.toLowerCase()} resources and articles`}
          </p>
        </div>

        {blogs?.length > 0 ? (
          <div className="mt-8 lg:px-8 lg:py-4">
            {blogs[0] && (
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" className="flex gap-6 p-4 md:p-6 flex-col md:flex-row md:items-center border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_20px_2px_#dcdcdc] transition-all duration-300 rounded-lg">
                <div className="md:w-[50%]">
                  <Link href={GenerateUrl(blogs[0]?.slug)}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-black1 hover:text-secondary font-plus font-semibold mt-4 mb-8 cursor-pointer">
                      {blogs[0]?.title}
                    </h2>
                  </Link>
                  <div className="flex md:flex-col justify-between items-center md:justify-start md:items-start">
                    <p className="text-[#929EB8] md:mb-6">
                      {FormatDate(blogs[0]?.publishedAt)}
                    </p>
                    <Link href={GenerateUrl(blogs[0]?.slug)}>
                      <button className="text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:p-2 hover:border-none hover:hover:shadow-[6px_4px_14px_1px_#dcdcdc] scale-1 hover:scale-[1.025] hover:rounded-lg border-black py-2 transition-all duration-200">
                        {blogs[0]?.read_now || "Read Now"}
                      </button>
                    </Link>
                  </div>
                </div>
                <Link
                  className="md:w-[50%] order-first md:order-last min-h-[200px] sm:min-h-[280px] w-full rounded-lg"
                  href={GenerateUrl(blogs[0]?.slug)}
                  style={{
                    backgroundImage: `url(${
                      blogs[0]?.image && blogs[0]?.image.length > 0 && blogs[0]?.image[0]?.url
                        ? isLocal
                          ? BASE_URL + blogs[0]?.image[0]?.url
                          : blogs[0]?.image[0]?.url
                        : '/assets/placeholder.png'
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            )}

            {blogs.length > 1 && (
              <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {blogs.slice(1).map((blog, index) => (
                  <div key={index} data-aos="zoom-in" data-aos-duration="800" data-aos-delay="500">
                    <BlogCard item={blog} flag={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" className="mt-8 text-center">
              <div className="p-8 border border-gray-300 rounded-lg">
                <h3 className="text-xl text-gray-600">
                  {categoryBanner?.no_content_msg || "No articles found"}
                </h3>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesDetails;
