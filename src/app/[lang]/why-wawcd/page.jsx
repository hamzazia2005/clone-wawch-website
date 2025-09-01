import { GetStarted, Reasons } from "@/views/why-wawcd";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/why-wawcd/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/why-wawcd/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/why-wawcd/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    getStarted: `api/why-wawcd/?locale=${paramLanguage}`,
    reasons: `api/reason-why-wawcds/?locale=${paramLanguage}&sort=createdAt:ASC`,
  };
  const [getStarted, reasons] = await Promise.all([
    getServerSideData(urls.getStarted),
    getServerSideData(urls.reasons, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: getStarted?.meta_title,
    description: getStarted?.meta_description,
    url: `https://wawcd.com/${paramLanguage}/why-wawcd/`,
    datePublished: getStarted?.meta_createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <div className="bg-circle_bg bg-no-repeat">
          <GetStarted data={getStarted} />
          <Reasons data={reasons?.data} />
        </div>
      </Layout>
    </div>
  );
};

export default Page;
