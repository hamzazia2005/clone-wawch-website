import { GetStarted, Form } from "@/views/uninstall";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/uninstall-meta/?locale=${paramLanguage}`
  );
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/uninstall/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/uninstall/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    getStarted: `api/uninstall-starter/?locale=${paramLanguage}`,
    form: `api/uninstall-form/?locale=${paramLanguage}`,
    meta: `api/uninstall-meta/?locale=${paramLanguage}`,
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
    url: `https://wawcd.com/uninstall/${paramLanguage}/`,
    datePublished: meta?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={getStarted} />
        <Form data={form} />
      </Layout>
    </div>
  );
};

export default Page;
