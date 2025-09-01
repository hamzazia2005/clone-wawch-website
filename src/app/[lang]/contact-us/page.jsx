import { GetStarted, Form } from "@/views/contact";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/contact-us-meta/?locale=${paramLanguage}`
  );
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/contact-us/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/contact-us/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    contactStarter: `api/contact-starter/?locale=${paramLanguage}`,
    form: `api/contact-form/?locale=${paramLanguage}`,
    meta: `api/contact-us-meta/?locale=${paramLanguage}`,
  };
  const [contactStarter, form, meta] = await Promise.all([
    getServerSideData(urls.contactStarter),
    getServerSideData(urls.form),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: meta?.title,
    description: meta?.description,
    url: `https://wawcd.com/contact-us/${paramLanguage}/`,
    datePublished: meta?.createdAt,
    mainEntity: {
      "@type": "Organization",
      name: "WAWCD",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: form?.contacts[0].value,
        contactType: "Customer Service",
        availableLanguage: ["English", "Arabic", "French", "Portuguese"],
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
        <GetStarted data={contactStarter} />
        <Form data={form} />
      </Layout>
    </div>
  );
};

export default Page;
