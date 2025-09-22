import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import { Resources } from "@/views/resources";

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


const Page = async () => {
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
        <Resources
          categories={categories}
          categoryBanner={categoryBanner}
        />
      </Layout>
    </div>
  );
};

export default Page;
