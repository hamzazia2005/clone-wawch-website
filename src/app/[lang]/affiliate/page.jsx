import { GetStarted, Form } from "@/views/affiliate";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/affiliate-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/affiliate/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/affiliate/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    contactStarter: `api/affiliate-starter/?locale=${paramLanguage}`,
    form: `api/affiliate-form/?locale=${paramLanguage}`,
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
    url: `https://wawcd.com/${paramLanguage}/affiliate/`,
    datePublished: contactStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={contactStarter} />
        <Form data={form} />
      </Layout>
    </div>
  );
};

export default Page;
