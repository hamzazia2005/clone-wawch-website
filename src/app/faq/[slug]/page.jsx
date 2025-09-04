import { FaqCall } from "@/views/faq";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/faq-sections/?filters[slug][$eq]=${params.slug}`
  );

  return {
    title: resp?.data?.meta_title,
    description: resp?.data?.meta_description,
    openGraph: {
      url: `https://wawcd.com/faq/${params.slug}/`,
      title: resp?.data?.meta_title,
      description: resp?.data?.meta_description,
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

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: faq?.meta_title,
      description: faq?.meta_description,
      url: `https://wawcd.com/faq/${params.slug}/`,
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

    console.log('faq', faq);

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
