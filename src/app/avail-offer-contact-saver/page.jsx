import { GetStarted, ActiveOffer } from "@/views/avail-offer";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/contact-saver-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/avail-offer-contact-saver/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/avail-offer-contact-saver/",
    },
  };
}

const Page = async () => {
  const urls = {
    contactStarter: `api/contact-saver-starter`,
    contactData: `api/contact-saver`,
    contactOffer: `api/contact-saver-offers/?populate=*&sort=id`,
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
    url: "https://wawcd.com/avail-offer-contact-saver/",
    datePublished: contactStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={contactStarter} />
        <ActiveOffer data={contactData} offer={contactOffer?.data} isContact />
      </Layout>
    </div>
  );
};

export default Page;
