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
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/feature/${params.slug}/`,
      title: resp?.resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
      images: [
        {
          url: resp?.image?.url,
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
    name: detail?.data?.[0]?.meta_title,
    description: detail?.data?.[0]?.meta_description,
    image: detail?.data?.[0]?.image?.url,
    url: `https://wawcd.com/${paramLanguage}/feature/${params.slug}/`,
    datePublished: detail?.data?.[0]?.createdAt,
    dateModified: detail?.data?.[0]?.updatedAt,
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
        <Details data={detail?.data?.[0]} />
      </Layout>
    </div>
  );
};

export default Page;
