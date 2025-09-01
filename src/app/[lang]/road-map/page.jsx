import { GetStarted } from "@/views/comparison";
import { RoadMap } from "@/views/road-map";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/roadmap-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/road-map/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/road-map/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    roadmapStarter: `api/roadmap-starter/?locale=${paramLanguage}`,
    roadmapData: `api/roadmap-data/?locale=${paramLanguage}`,
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
    url: `https://wawcd.com/road-map/${paramLanguage}/`,
    datePublished: roadmapStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={roadmapStarter} />
        <RoadMap data={roadmapData} />
      </Layout>
    </div>
  );
};

export default Page;
