import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { PageNotFound } from "@/views/page_not_found.jsx";

export async function metadata() {
  const resp = await getServerSideData("api/page-not-found-meta");
  const data = await getServerSideData("api/page-not-found/?populate=*");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/404/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
      images: [
        {
          url: data?.image?.data?.url,
          width: 800,
          height: 600,
          alt: resp?.title,
        },
      ],
    },
    alternates: {
      canonical: "https://wawcd.com/404/",
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
    image: data?.image?.url,
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
