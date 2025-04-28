import { GetStarted } from "@/views/comparison";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import { Faq, Templates } from "@/views/home";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/bulk-messages/?template[populate]=*&filters[slug][$eq]=${params.slug}&locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/f/${params.slug}/${paramLanguage}`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/f/${params.slug}/${paramLanguage}`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    bulkMessages: `api/bulk-messages/?populate[template][populate]=*&filters[slug][$eq]=${params.slug}&locale=${paramLanguage}`,
    faq: `api/faq/?locale=${paramLanguage}`,
    faqs: `api/faq-sections/?locale=${paramLanguage}`,
  };
  const [resp, faq, faqs] = await Promise.all([
    getServerSideData(urls.bulkMessages, true),
    getServerSideData(urls.faq),
    getServerSideData(urls.faqs, true),
  ]);

  const bulkMessages = resp?.data[0]?.attributes;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: bulkMessages?.meta_title,
    description: bulkMessages?.meta_description,
    url: `https://wawcd.com/f/${params.slug}/${paramLanguage}`,
    datePublished: bulkMessages?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={bulkMessages} islarge />
        {bulkMessages?.template?.map((data, index) => (
          <div key={index} className="mt-16">
            <Templates data={data} isImageRight={index % 2 !== 0} />
          </div>
        ))}
        <Faq data={faq} faqs={faqs?.data} />
      </Layout>
    </div>
  );
};

export default Page;
