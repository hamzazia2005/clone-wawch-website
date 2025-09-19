import Link from "next/link";
import Image from "next/image";
import { BASE_URL, isLocal } from "@/utils/axios_instance";

const Resources = ({ categories, categoryBanner }) => {
  return (
    <div className="flex justify-center items-center mt-12 md:mt-20">
      <div className="max-w-[1440px] px-5 sm:px-12 py-12 sm:w-[550px] w-[400px] md:w-[900px] lg:w-full">
        <div data-aos="fade-up" data-aos-duration="800">
          <h1 className="text-4xl text-black1 font-plus text-center font-bold my-3">
            {categoryBanner?.heading || "Resources"}
          </h1>
          <p className="text-third text-lg text-center font-poppins mx-3 sm:mx-8 lg:mx-40">
            {categoryBanner?.description || "Explore our comprehensive collection of resources and articles to help you get the most out of WAWCD."}
          </p>
        </div>

        {categories && categories.length > 0 ? (
          <div className="mt-8 lg:px-8 lg:py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {categories.map((category, index) => (
                  <div key={index} data-aos="zoom-in" data-aos-duration="800" data-aos-delay="200" className="border border-gray-300 scale-1 hover:scale-[1.025] hover:shadow-[0px_0px_20px_2px_#dcdcdc] transition-all duration-300 rounded-lg cursor-pointer overflow-hidden">
                    <div className="p-4">
                      <Link href={`/resources/${category.slug}`}>
                        <Image
                          src={
                            category?.image?.url
                              ? isLocal
                                ? BASE_URL + category?.image?.url
                                : category?.image?.url
                              : "/assets/placeholder.png"
                          }
                          alt={category.title}
                          width={1000}
                          height={1000}
                          className="rounded-lg cursor-pointer mb-4 object-cover w-full h-[200px]"
                        />
                      </Link>
                    </div>
                    <div className="px-4 pb-4">
                      <Link href={`/resources/${category.slug}`}>
                        <h3 className="text-xl font-semibold text-black1 hover:text-secondary mb-4">
                          {category.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">
                        {category.description || `Explore ${category.title.toLowerCase()} resources and articles`}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            {category.blogs?.length || 0} articles
                        </span>
                        <Link href={`/resources/${category.slug}`}>
                          <button className="text-black font-medium border-b-2 hover:bg-primary hover:text-white hover:p-2 hover:border-none hover:hover:shadow-[6px_4px_14px_1px_#dcdcdc] hover:rounded-lg border-black py-2 duration-200 scale-1 hover:scale-[1.025] transition-all">
                          {categoryBanner?.view_all_btn || "View All →"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" className="p-8 border border-gray-300 rounded-lg">
              <h3 className="text-xl text-gray-600">
                {categoryBanner?.no_content_msg || "No categories available"}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
