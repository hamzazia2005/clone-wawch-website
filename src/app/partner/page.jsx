import Layout from "@/layout/page";
import { GetStarted } from "@/views/contact";
import { WhyWawcd, Benefits, Boost, Review } from "@/views/partner";
import { getServerSideData } from "@/utils/get_api";

export async function metadata() {
  const resp = await getServerSideData("api/partner-banner");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/partner/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/partner/",
    },
  };
}

const Page = async () => {
  const urls = {
    banner: `api/partner-banner`,
    whyWawcd: `api/why-wawcd-partners/?populate[feature][populate]=*`,
    benefits: `api/partner-benefit/?populate[benefits][populate]=*`,
    boost: `api/partner-boost/?populate[feature][populate]=*`,
    testimonial: `api/partner-testimonial/?populate[testimonial][populate]=*`,
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
    url: "https://wawcd.com/partner/",
    datePublished: banner?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
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
