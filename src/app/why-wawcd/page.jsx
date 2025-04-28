import { GetStarted, Reasons } from "@/views/why-wawcd";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/why-wawcd");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/why-wawcd/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/why-wawcd/",
    },
  };
}

const Page = async () => {
  const urls = {
    getStarted: `api/why-wawcd`,
    reasons: `api/reason-why-wawcds/?sort=createdAt:ASC`,
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
    url: "https://wawcd.com/why-wawcd/",
    datePublished: getStarted?.meta_createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <div className="bg-circle_bg bg-no-repeat bg-cover w-full">
          <GetStarted data={getStarted} />
          <Reasons data={reasons?.data} />
        </div>
      </Layout>
    </div>
  );
};

export default Page;
