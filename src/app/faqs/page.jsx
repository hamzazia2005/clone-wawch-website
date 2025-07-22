import { FaqCall } from "@/views/faqs";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import Link from "next/link";

export async function metadata() {
  const resp = await getServerSideData("api/faq-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/faqs/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/faqs/",
    },
  };
}

const Page = async () => {
  const urls = {
    getStarted: `api/faq-ask-anything`,
    faq: `api/faq-sections`,
    meta: `api/faq-meta`,
  };
  const [getStarted, faq, meta] = await Promise.all([
    getServerSideData(urls.getStarted),
    getServerSideData(urls.faq, true),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: meta?.title,
    description: meta?.description,
    url: "https://wawcd.com/faqs/",
    datePublished: meta?.createdAt,
    mainEntity: faq?.data?.map((faq) => ({
      "@type": "Question",
      name: faq?.attributes?.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq?.attributes?.search_answer,
      },
      datePublished: faq?.attributes?.createdAt,
      dateModified: faq?.attributes?.updatedAt,
    })),
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <FaqCall getStarted={getStarted} faq={faq} />
      </Layout>
    </div>
  );
};

export default Page;
