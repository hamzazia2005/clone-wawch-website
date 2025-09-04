import { FaqCall } from "@/views/faq";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/faq-sections/?filters[slug][$eq]=${params.slug}&locale=${paramLanguage}`,
    true
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${params.lang}/faq/${params.slug}/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${params.lang}/faq/${params.slug}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    getStarted: `api/faq-ask-anything/?locale=${paramLanguage}`,
    faqs: `api/faq-sections/?locale=${paramLanguage}`,
    faq: `api/faq-sections/?filters[slug][$eq]=${params.slug}&locale=${paramLanguage}`,
  };
  const [getStarted, faqs, faq] = await Promise.all([
    getServerSideData(urls.getStarted),
    getServerSideData(urls.faqs, true),
    getServerSideData(urls.faq),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: faq?.meta_title,
    description: faq?.meta_description,
    url: `https://wawcd.com/${params.lang}/faq/${params.slug}/`,
    datePublished: faq?.createdAt,
    dateModified: faq?.updatedAt,
    author: {
      "@type": "Person",
      name: faq?.author,
    },
    mainEntity: {
      "@type": "Question",
      name: faq?.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq?.search_answer,
      },
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <FaqCall
          getStarted={getStarted}
          faqs={faqs}
          faq={faq?.data}
        />
      </Layout>
    </div>
  );
};

export default Page;
