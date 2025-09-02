import { FaqCall } from "@/views/faqs";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(`api/faq-meta/?locale=${paramLanguage}`);
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/faqs/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/faqs/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    getStarted: `api/faq-ask-anything/?locale=${paramLanguage}`,
    faq: `api/faq-sections/?locale=${paramLanguage}`,
    meta: `api/faq-meta/?locale=${paramLanguage}`,
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
    url: `https://wawcd.com/${paramLanguage}/faqs/`,
    datePublished: meta?.createdAt,
    mainEntity: faq?.data?.map((faq) => ({
      "@type": "Question",
      name: faq?.attributes?.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq?.attributes?.search_answer,
      },
    })),
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <FaqCall getStarted={getStarted} faq={faq} />
      </Layout>
    </div>
  );
};

export default Page;
