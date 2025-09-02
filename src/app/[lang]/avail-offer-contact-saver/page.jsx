import { GetStarted, ActiveOffer } from "@/views/avail-offer";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/contact-saver-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/avail-offer-contact-saver/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/avail-offer-contact-saver/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    contactStarter: `api/contact-saver-starter/?locale=${paramLanguage}`,
    contactData: `api/contact-saver/?locale=${paramLanguage}`,
    contactOffer: `api/contact-saver-offers/?populate=*&sort=id&locale=${paramLanguage}`,
  };
  const [contactStarter, contactData, contactOffer] = await Promise.all([
    getServerSideData(urls.contactStarter),
    getServerSideData(urls.contactData),
    getServerSideData(urls.contactOffer, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: contactStarter?.meta_title,
    description: contactStarter?.meta_description,
    url: `https://wawcd.com/${paramLanguage}/avail-offer-contact-saver/`,
    datePublished: contactStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={contactStarter} />
        <ActiveOffer data={contactData} offer={contactOffer?.data} />
      </Layout>
    </div>
  );
};

export default Page;
