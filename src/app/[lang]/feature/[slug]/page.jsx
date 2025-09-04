import { Details } from "@/views/feature";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/features/?filters[slug][$eq]=${params.slug}&populate=*&locale=${paramLanguage}`
  );

  return {
    title: resp?.data?.meta_title,
    description: resp?.data?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/feature/${params.slug}/`,
      title: resp?.resp?.data?.meta_title,
      description: resp?.data?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
      images: [
        {
          url: resp?.data[0]?.attributes?.image?.data[0]?.attributes?.url,
          width: 800,
          height: 600,
          alt: resp?.title,
        },
      ],
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/feature/${params.slug}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    detail: `api/features/?filters[slug][$eq]=${params.slug}&populate=*&locale=${paramLanguage}`,
  };
  const [detail] = await Promise.all([getServerSideData(urls.detail, true)]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: detail?.data?.meta_title,
    description: detail?.data?.meta_description,
    image: detail?.data?.image?.url,
    url: `https://wawcd.com/${paramLanguage}/feature/${params.slug}/`,
    datePublished: detail?.data?.createdAt,
    dateModified: detail?.data?.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "WAWCD",
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <Details data={detail?.data} />
      </Layout>
    </div>
  );
};

export default Page;
