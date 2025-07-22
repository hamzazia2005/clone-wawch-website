import { GetStarted } from "@/views/comparison";
import { RoadMap } from "@/views/road-map";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/roadmap-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/road-map/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/road-map/",
    },
  };
}

const Page = async () => {
  const urls = {
    roadmapStarter: `api/roadmap-starter`,
    roadmapData: `api/roadmap-data`,
  };
  const [roadmapStarter, roadmapData] = await Promise.all([
    getServerSideData(urls.roadmapStarter),
    getServerSideData(urls.roadmapData),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: roadmapStarter?.meta_title,
    description: roadmapStarter?.meta_description,
    url: "https://wawcd.com/road-map/",
    datePublished: roadmapStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={roadmapStarter} />
        <RoadMap data={roadmapData} />
      </Layout>
    </div>
  );
};

export default Page;
