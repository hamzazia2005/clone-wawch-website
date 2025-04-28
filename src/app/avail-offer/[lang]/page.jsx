import { GetStarted, ActiveOffer } from "@/views/avail-offer";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/avail-offer-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/avail-offer/${paramLanguage}/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/avail-offer/${paramLanguage}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    availStarter: `api/avail-offer-starter/?locale=${paramLanguage}`,
    availData: `api/avail-offer/?locale=${paramLanguage}`,
    activeOffer: `api/active-offers/?populate=*&sort=id&locale=${paramLanguage}`,
  };
  const [availStarter, availData, activeOffer] = await Promise.all([
    getServerSideData(urls.availStarter),
    getServerSideData(urls.availData),
    getServerSideData(urls.activeOffer, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: availStarter?.meta_title,
    description: availStarter?.meta_description,
    url: `https://wawcd.com/avail-offer/${paramLanguage}/`,
    datePublished: availStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={availStarter} />
        <ActiveOffer data={availData} offer={activeOffer?.data} />
      </Layout>
    </div>
  );
};

export default Page;
