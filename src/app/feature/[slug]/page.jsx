import { Details } from "@/views/feature";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/features/?filters[slug][$eq]=${params.slug}&populate=*`,
    true
  );

  return {
    title: resp?.data?.[0]?.meta_title,
    description: resp?.data?.[0]?.meta_description,
    openGraph: {
      url: `https://wawcd.com/feature/${params.slug}/`,
      title: resp?.data?.[0]?.meta_title,
      description: resp?.data?.[0]?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
      images: [
        {
          url: resp?.data?.[0]?.image?.url,
          width: 800,
          height: 600,
          alt: resp?.data?.[0]?.title,
        },
      ],
    },
    alternates: {
      canonical: `https://wawcd.com/feature/${params.slug}/`,
    },
  };
}

const Page = async ({ params }) => {
  const urls = {
    detail: `api/features/?filters[slug][$eq]=${params.slug}&populate=*`,
  };
  let iframeUrl = "";
  const [detail] = await Promise.all([getServerSideData(urls.detail, true)]);
  const featureData = detail?.data?.[0];

  if (featureData?.video_iframe) {
    const iframeTag = featureData?.video_iframe;
    const iframeUrlMatch = iframeTag?.match(/src="([^"]+)"/);
    iframeUrl = iframeUrlMatch ? iframeUrlMatch[1] : null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: featureData?.meta_title,
    description: featureData?.meta_description,
    image: featureData?.image?.url,
    url: `https://wawcd.com/feature/${params.slug}/`,
    datePublished: featureData?.createdAt,
    dateModified: featureData?.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "WAWCD",
    },
  };
  if (featureData?.video_iframe) {
    jsonLd.mainEntity = {
      "@type": "VideoObject",
      name: featureData?.meta_title,
      description: featureData?.meta_description,
      embedUrl: iframeUrl,
      uploadDate: featureData?.createdAt,
      thumbnailUrl: featureData?.image?.url,
    };
  }
  
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <Details data={featureData} />
      </Layout>
    </div>
  );
};

export default Page;
