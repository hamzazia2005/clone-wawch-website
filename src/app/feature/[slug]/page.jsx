import { Details } from "@/views/feature";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/features/?filters[slug][$eq]=${params.slug}&populate=*`,
    true
  );

  return {
    title: resp?.data[0]?.attributes?.meta_title,
    description: resp?.data[0]?.attributes?.meta_description,
    openGraph: {
      url: `https://wawcd.com/feature/${params.slug}/`,
      title: resp?.data[0]?.attributes?.meta_title,
      description: resp?.data[0]?.attributes?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
      images: [
        {
          url: resp?.data[0]?.attributes?.image?.data[0]?.attributes?.url,
          width: 800,
          height: 600,
          alt: resp?.title,
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

  if (detail?.data[0]?.attributes?.video_iframe) {
    const iframeTag = detail?.data[0]?.attributes?.video_iframe;
    const iframeUrlMatch = iframeTag?.match(/src="([^"]+)"/);
    iframeUrl = iframeUrlMatch ? iframeUrlMatch[1] : null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: detail?.data[0]?.attributes?.meta_title,
    description: detail?.data[0]?.attributes?.meta_description,
    image: detail?.data[0]?.attributes?.image?.data?.attributes?.url,
    url: `https://wawcd.com/feature/${params.slug}/`,
    datePublished: detail?.data[0]?.attributes?.createdAt,
    dateModified: detail?.data[0]?.attributes?.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "WAWCD",
    },
  };
  if (detail?.data[0]?.attributes?.video_iframe) {
    jsonLd.mainEntity = {
      "@type": "VideoObject",
      name: detail?.data[0]?.attributes?.meta_title,
      description: detail?.data[0]?.attributes?.meta_description,
      embedUrl: iframeUrl,
      uploadDate: detail?.data[0]?.attributes?.createdAt,
      thumbnailUrl: detail?.data[0]?.attributes?.image?.data?.attributes?.url,
    };
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <Details data={detail?.data[0]?.attributes} />
      </Layout>
    </div>
  );
};

export default Page;
