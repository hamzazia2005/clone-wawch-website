import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL, isLocal } from "@/utils/axios_instance";

export async function metadata() {
  const resp = await getServerSideData("api/category-banner");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: "https://wawcd.com/resources/",
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/resources/",
    },
  };
}


const ResourcesPage = async () => {
  const categoriesResponse = await getServerSideData("api/categories?populate=blogs&populate=image");
  const categories = categoriesResponse?.data || categoriesResponse || [];
  const categoryBanner = await getServerSideData("api/category-banner");
 


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryBanner?.meta_title || "WAWCD Resources",
    description: categoryBanner?.meta_description || "Comprehensive collection of resources, guides, and articles",
    url: "https://wawcd.com/resources/",
    mainEntity: categories?.map((category) => ({
      "@type": "CollectionPage",
      name: category.title,
      description: `Resources and articles in the ${category.title} category`,
      url: `https://wawcd.com/resources/${category.slug}`,
      numberOfItems: category.blogs?.length || 0,
    })) || [],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
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
                          <h3 className="text-xl font-semibold text-black1 hover:text-secondary mb-4">
                            {category.title}
                          </h3>
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
      </Layout>
    </div>
  );
};

export default ResourcesPage;
