import { GetStarted, Form } from "@/views/uninstall";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/uninstall-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/uninstall/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/uninstall/",
    },
  };
}

const Page = async () => {
  const urls = {
    getStarted: `api/uninstall-starter`,
    form: `api/uninstall-form`,
    meta: `api/uninstall-meta`,
  };
  const [getStarted, form, meta] = await Promise.all([
    getServerSideData(urls.getStarted),
    getServerSideData(urls.form),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title,
    description: meta?.description,
    url: "https://wawcd.com/uninstall/",
    datePublished: meta?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={getStarted} />
        <Form data={form} />
      </Layout>
    </div>
  );
};

export default Page;
