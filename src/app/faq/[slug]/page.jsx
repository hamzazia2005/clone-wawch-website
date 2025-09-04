import { FaqCall } from "@/views/faq";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/faq-sections/?filters[slug][$eq]=${params.slug}`,
    true
  );

  return {
    title: resp?.data[0]?.meta_title,
    description: resp?.data[0]?.meta_description,
    openGraph: {
      url: `https://wawcd.com/faq/${params.slug}/`,
      title: resp?.data[0]?.meta_title,
      description: resp?.data[0]?.meta_description,
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
    getServerSideData(urls.faqs, true),
    getServerSideData(urls.faq, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: faq?.data[0]?.meta_title,
    description: faq?.data[0]?.meta_description,
    url: `https://wawcd.com/faq/${params.slug}/`,
    datePublished: faq?.data[0]?.createdAt,
    dateModified: faq?.data[0]?.updatedAt,
    author: {
      "@type": "Person",
      name: faq?.data[0]?.author,
    },
    mainEntity: {
      "@type": "Question",
      name: faq?.data[0]?.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq?.data[0]?.search_answer,
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
        <FaqCall getStarted={getStarted} faqs={faqs} faq={faq?.data} />
      </Layout>
    </div>
  );
};

export default Page;
