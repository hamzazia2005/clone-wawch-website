import Layout from "@/layout/page";
import { GetStarted } from "@/views/contact";
import { Boost, Review } from "@/views/partner";
import { getServerSideData } from "@/utils/get_api";
import { TrackEarning, Work } from "@/views/affiliates";

export async function metadata() {
  const resp = await getServerSideData("api/new-affiliate-banner");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/affiliates/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/affiliates/",
    },
  };
}

const Page = async () => {
  const urls = {
    banner: `api/new-affiliate-banner`,
    whyJoin: `api/new-affiliate-join/?populate[feature][populate]=*`,
    work: `api/new-affiliate-work/?populate[steps][populate]=*`,
    trackEarning: `api/new-affiliate-earning/?populate[feature][populate]=*`,
    boost: `api/new-affiliate-boost/?populate[feature][populate]=*`,
    testimonial: `api/affiliate-testimonial/?populate[testimonial][populate]=*`,
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
    url: "https://wawcd.com/affiliates/",
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
