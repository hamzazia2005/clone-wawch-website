import { FaqCall } from "@/views/faq";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/faq-sections/?filters[slug][$eq]=${params.slug}`
  );

  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/faq/${params.slug}/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: `https://wawcd.com/faq/${params.slug}/`,
    },
  };
}

const Page = async ({ params }) => {
  const urls = {
    getStarted: `api/faq-ask-anything`,
    faqs: `api/faq-sections`,
    faq: `api/faq-sections/?filters[slug][$eq]=${params.slug}`,
  };

    const [getStarted, faqs, faq] = await Promise.all([
      getServerSideData(urls.getStarted),
      getServerSideData(urls.faqs),
      getServerSideData(urls.faq),
    ]);

    const faqData = faq?.[0];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: faqData?.meta_title,
      description: faqData?.meta_description,
      url: `https://wawcd.com/faq/${params.slug}/`,
      datePublished: faqData?.createdAt,
      dateModified: faqData?.updatedAt,
      author: {
        "@type": "Person",
        name: faqData?.author,
      },
      mainEntity: {
        "@type": "Question",
        name: faqData?.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqData?.search_answer,
        },
      },
    };

    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Layout>
          <FaqCall getStarted={getStarted} faqs={faqs} faq={faqData} />
        </Layout>
      </div>
    );
};

export default Page;
