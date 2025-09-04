import { Feature } from "@/views/feature";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";


export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/features-meta/?locale=${paramLanguage}`
  );
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/features/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/features/`,
    },
  };
}

const Page = async ({ params}) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";

  const urls = {
    feature: `api/features/?populate=*&sort=createdAt:DESC&locale=${paramLanguage}`, 
    meta: `api/features-meta/?locale=${paramLanguage}`,
  };

  const [feature, meta] = await Promise.all([
    getServerSideData(urls.feature, true),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title,
    description: meta?.description,
    url: `https://wawcd.com/${paramLanguage}/features/`,
    datePublished: meta?.createdAt,
    mainEntity: feature?.data?.map((feature) => ({
      "@type": "WebPage",
      headline: feature?.meta_title,
      image: feature?.image?.url,
      datePublished: feature?.createdAt,
      dateModified: feature?.updatedAt,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <Feature
          data={feature?.data?.[0]}
          heading={meta?.heading ? meta?.heading : ""}
        />
      </Layout>
    </div>
  );
};

export default Page;
