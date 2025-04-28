import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { PrivcayPolicy } from "@/views/privacy_policy";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/privacy-policy-meta/?locale=${paramLanguage}`
  );
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/privacy-policy/${paramLanguage}/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/privacy-policy/${paramLanguage}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    privacy: `api/privacy-policy/?locale=${paramLanguage}`,
    meta: `api/privacy-policy-meta/?locale=${paramLanguage}`,
  };

  const [privacy, meta] = await Promise.all([
    getServerSideData(urls.privacy),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title,
    description: meta?.description,
    url: `https://wawcd.com/privacy-policy/${paramLanguage}/`,
    datePublished: meta?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <PrivcayPolicy data={privacy} />
      </Layout>
    </div>
  );
};

export default Page;
