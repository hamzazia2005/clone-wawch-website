import { ComingSoon } from "@/views/coming-soon";
import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";

export async function metadata() {
  const resp = await getServerSideData("api/coming-soon-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/coming-soon/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/coming-soon/",
    },
  };
}

const Page = async () => {
  const url = "api/coming-soon";
  const [data, meta] = await Promise.all([
    getServerSideData(url),
    getServerSideData("api/coming-soon-meta"),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title,
    description: meta?.description,
    url: "https://wawcd.com/coming-soon/",
    datePublished: meta?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <ComingSoon data={data} />
      </Layout>
    </div>
  );
};

export default Page;
