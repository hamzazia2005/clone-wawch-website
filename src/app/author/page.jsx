import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { AuthorPage } from "@/views/author";

export async function metadata() {
  const resp = await getServerSideData("api/author-banner");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/author/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/author/",
    },
  };
}

const page = async () => {
  const urls = {
    banner: `api/author-banner`,
    detail: `api/blog-details/?populate=*&sort=createdAt:DESC`,
    reviews: `api/customer-reviews/?populate=*`,
    authors: `api/authors/?populate=*`,
    reviews_banner: `api/customer-review-banner`,
    articles_banner: `api/blog-article`,
  };
  const [authors, detail, reviews, banner, reviews_banner, articles_banner] =
    await Promise.all([
      getServerSideData(urls.authors, true),
      getServerSideData(urls.detail, true),
      getServerSideData(urls.reviews, true),
      getServerSideData(urls.banner),
      getServerSideData(urls.reviews_banner, true),
      getServerSideData(urls.articles_banner, true),
    ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: banner?.title || "Authors",
    description: banner?.description || "Meet our amazing authors.",
    url: "https://wawcd.com/author/",
    hasPart: authors?.data?.map((author, index) => ({
      "@type": "Person",
      "@id": `https://wawcd.com/author/#author-${author?.id || index}`,
      name: author?.attributes?.title,
      description: author?.attributes?.description,
      image: author.attributes?.image?.data[0]?.attributes?.url,
      jobTitle: author?.attributes?.designation || "Author",
      worksFor: {
        "@type": "Organization",
        name: "WAWCD",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <AuthorPage
          authors={authors}
          details={detail}
          reviews={reviews}
          banner={banner}
          reviews_banner={reviews_banner}
          articles_banner={articles_banner}
        />
      </Layout>
    </>
  );
};

export default page;
