import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { PageNotFound } from "@/views/page_not_found.jsx";

export async function metadata() {
  const [resp, data] = await Promise.all([
    getServerSideData("api/page-not-found-meta"),
    getServerSideData("api/page-not-found/?populate=*"),
  ]);
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/404/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
      images: [
        {
          url: data?.image?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: resp?.title,
        },
      ],
    },
  };
}

const Page = async () => {
  const [data, meta] = await Promise.all([
    getServerSideData("api/page-not-found/?populate=*"),
    getServerSideData("api/page-not-found-meta"),
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title,
    image: data?.image?.data?.attributes?.url,
    description: meta?.description,
    url: "https://wawcd.com/404/",
    datePublished: meta?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <PageNotFound data={data} />
      </Layout>
    </div>
  );
};

export default Page;
