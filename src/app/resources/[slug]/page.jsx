import Layout from "@/layout/page";
import { redirect } from "next/navigation";
import { getServerSideData } from "@/utils/get_api";
import { ResourcesDetails } from "@/views/resources";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData("api/category-banner");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/resources/${params.slug}`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: `https://wawcd.com/resources/${params.slug}`,
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = params;
  const categoryBanner = await getServerSideData("api/category-banner");

  const allCategoriesResponse = await getServerSideData("api/categories?populate[blogs][populate]=image&populate=image");
  const allCategories = allCategoriesResponse?.data || allCategoriesResponse || [];
  

  const validCategory = allCategories.find(cat => 
    cat.slug.toLowerCase() === slug.toLowerCase()
  );
  
  if (!validCategory) {
    redirect('/404');
  }

  const displayCategory = validCategory;

  const blogs = displayCategory.blogs || [];


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayCategory.title} Resources`,
    description: `Resources and articles in the ${displayCategory.title} category`,
    url: `https://wawcd.com/resources/${slug}`,
    mainEntity: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog?.meta_title || blog?.title,
      image: blog?.image?.[0]?.url,
      datePublished: blog?.createdAt,
      dateModified: blog?.updatedAt,
      url: `https://wawcd.com/blog/${blog?.slug}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <ResourcesDetails displayCategory={displayCategory} blogs={blogs} categoryBanner={categoryBanner} />
      </Layout>
    </div>
  );
};

export default Page;
