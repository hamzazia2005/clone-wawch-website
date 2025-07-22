import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { PrivcayPolicy } from "@/views/privacy_policy";

export async function metadata() {
  const resp = await getServerSideData("api/privacy-policy-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/privacy-policy/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/privacy-policy/",
    },
  };
}

const Page = async () => {
  const urls = {
    privacy: `api/privacy-policy`,
    meta: `api/privacy-policy-meta`,
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
    url: "https://wawcd.com/privacy-policy/",
    datePublished: meta?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <PrivcayPolicy data={privacy} />
      </Layout>
    </div>
  );
};

export default Page;
