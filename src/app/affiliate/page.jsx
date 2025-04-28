import { GetStarted, Form } from "@/views/affiliate";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/affiliate-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/affiliate/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/affiliate/",
    },
  };
}

const Page = async () => {
  const urls = {
    contactStarter: `api/affiliate-starter`,
    form: `api/affiliate-form`,
  };
  const [contactStarter, form] = await Promise.all([
    getServerSideData(urls.contactStarter),
    getServerSideData(urls.form),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: contactStarter?.meta_title,
    description: contactStarter?.meta_description,
    url: `https://wawcd.com/affiliate/`,
    datePublished: contactStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={contactStarter} />
        <Form data={form} />
      </Layout>
    </div>
  );
};

export default Page;
