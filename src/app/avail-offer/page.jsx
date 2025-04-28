import { GetStarted, ActiveOffer } from "@/views/avail-offer";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/avail-offer-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/avail-offer/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/avail-offer/",
    },
  };
}

const Page = async () => {
  const urls = {
    availStarter: `api/avail-offer-starter`,
    availData: `api/avail-offer`,
    activeOffer: `api/active-offers/?populate=*&sort=id`,
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
    url: "https://wawcd.com/avail-offer/",
    datePublished: availStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={availStarter} />
        <ActiveOffer data={availData} offer={activeOffer?.data} />
      </Layout>
    </div>
  );
};

export default Page;
