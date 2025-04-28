import { GetStarted } from "@/views/comparison";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import { Faq, Templates } from "@/views/home";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/bulk-messages/?template[populate]=*&filters[slug][$eq]=${params.slug}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/f/${params.slug}/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `en_EN`,
    },
    alternates: {
      colonical: `https://wawcd.com/f/${params.slug}/`,
    },
  };
}

const Page = async ({ params }) => {
  const urls = {
    bulkMessages: `api/bulk-messages/?populate[template][populate]=*&filters[slug][$eq]=${params.slug}`,
    faq: `api/faq`,
    faqs: `api/faq-sections`,
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
    url: `https://wawcd.com/f/${params.slug}`,
    datePublished: bulkMessages?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
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
