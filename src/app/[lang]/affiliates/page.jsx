import Layout from "@/layout/page";
import { GetStarted } from "@/views/contact";
import { Boost, Review } from "@/views/partner";
import { getServerSideData } from "@/utils/get_api";
import { TrackEarning, Work } from "@/views/affiliates";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/new-affiliate-banner/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/affiliates/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/affiliates/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    banner: `api/new-affiliate-banner/?locale=${paramLanguage}`,
    whyJoin: `api/new-affiliate-join/?populate[feature][populate]=*&locale=${paramLanguage}`,
    work: `api/new-affiliate-work/?populate[steps][populate]=*&locale=${paramLanguage}`,
    trackEarning: `api/new-affiliate-earning/?populate[feature][populate]=*&locale=${paramLanguage}`,
    boost: `api/new-affiliate-boost/?populate[feature][populate]=*&locale=${paramLanguage}`,
    testimonial: `api/affiliate-testimonial/?populate[testimonial][populate]=*&locale=${paramLanguage}`,
  };
  const [banner, whyJoin, work, trackEarning, boost, testimonial] =
    await Promise.all([
      getServerSideData(urls.banner),
      getServerSideData(urls.whyJoin),
      getServerSideData(urls.work),
      getServerSideData(urls.trackEarning),
      getServerSideData(urls.boost),
      getServerSideData(urls.testimonial),
    ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: banner?.meta_title,
    description: banner?.meta_description,
    url: `https://wawcd.com/${paramLanguage}/affiliates/`,
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
        <div className="mt-12">
          <Boost data={whyJoin} isPartner={false} />
        </div>
        <Work data={work} />
        <TrackEarning data={trackEarning} />
        <Boost data={boost} isPartner={false} />
        <Review data={testimonial?.testimonial} />
      </Layout>
    </div>
  );
};

export default Page;
