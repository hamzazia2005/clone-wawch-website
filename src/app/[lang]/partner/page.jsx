import Layout from "@/layout/page";
import { GetStarted } from "@/views/contact";
import { WhyWawcd, Benefits, Boost, Review } from "@/views/partner";
import { getServerSideData } from "@/utils/get_api";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/partner-banner/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/partner/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com${paramLanguage}/partner/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    banner: `api/partner-banner/?locale=${paramLanguage}`,
    whyWawcd: `api/why-wawcd-partners/?populate[feature][populate]=*&locale=${paramLanguage}`,
    benefits: `api/partner-benefit/?populate[benefits][populate]=*&locale=${paramLanguage}`,
    boost: `api/partner-boost/?populate[feature][populate]=*&locale=${paramLanguage}`,
    testimonial: `api/partner-testimonial/?populate[testimonial][populate]=*&locale=${paramLanguage}`,
  };
  const [banner, whyWawcd, benefits, boost, testimonial] = await Promise.all([
    getServerSideData(urls.banner),
    getServerSideData(urls.whyWawcd, true),
    getServerSideData(urls.benefits),
    getServerSideData(urls.boost),
    getServerSideData(urls.testimonial),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: banner?.meta_title,
    description: banner?.meta_description,
    url: `https://wawcd.com/${paramLanguage}/`,
    datePublished: banner?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={banner} />
        <WhyWawcd data={whyWawcd?.data} />
        <Benefits data={benefits} />
        <Boost data={boost} isPartner={true} />
        <Review data={testimonial?.testimonial} />
      </Layout>
    </div>
  );
};

export default Page;
