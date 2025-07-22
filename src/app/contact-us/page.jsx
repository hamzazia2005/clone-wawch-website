import { GetStarted, Form } from "@/views/contact";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/contact-us-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/contact-us/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/contact-us/",
    },
  };
}

const Page = async () => {
  const urls = {
    contactStarter: `api/contact-starter`,
    form: `api/contact-form`,
    meta: `api/contact-us-meta`,
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
    url: "https://wawcd.com/contact-us/",
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
      <Layout>
        <GetStarted data={contactStarter} />
        <Form data={form} />
      </Layout>
    </div>
  );
};

export default Page;
