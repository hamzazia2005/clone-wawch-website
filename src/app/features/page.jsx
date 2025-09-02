import { Feature } from "@/views/feature";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
//import Link from "next/link";

export async function metadata() {
  const resp = await getServerSideData("api/features-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/features/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/features/",
    },
  };
}

const Page = async () => {
const urls = {
  feature: `api/features/?populate=*&sort=createdAt:DESC`, // removed pagination params
  meta: `api/features-meta`,
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
    url: "https://wawcd.com/features/",
    datePublished: meta?.createdAt,
    mainEntity: feature?.data?.map((feature) => ({
      "@type": "WebPage",
      headline: feature?.attributes?.meta_title,
      image: feature?.attributes?.image?.data[0]?.attributes?.url,
      datePublished: feature?.attributes?.createdAt,
      dateModified: feature?.attributes?.updatedAt,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <Feature
          data={feature?.data}
          heading={meta?.heading ? meta?.heading : ""}
        />
      </Layout>
    </div>
  );
};

export default Page;
