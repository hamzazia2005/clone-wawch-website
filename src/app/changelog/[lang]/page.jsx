import { GetStarted } from "@/views/comparison";
import { TeamMembers } from "@/views/changelog";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/changelog-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/changelog/${paramLanguage}/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/changelog/${paramLanguage}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    changelogStarter: `api/changelog-starter/?locale=${paramLanguage}`,
    teamMembers: `api/team-members/?populate=*&sort=id&locale=${paramLanguage}`,
    version: `api/changelog-versions/?sort=id:desc&locale=${paramLanguage}`,
  };
  const [changelogStarter, teamMembers, version] = await Promise.all([
    getServerSideData(urls.changelogStarter),
    getServerSideData(urls.teamMembers, true),
    getServerSideData(urls.version, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: changelogStarter?.meta_title,
    description: changelogStarter?.meta_description,
    url: `https://wawcd.com/changelog/${paramLanguage}/`,
    datePublished: changelogStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={changelogStarter} />
        <TeamMembers
          heading={changelogStarter}
          data={teamMembers?.data}
          version={version?.data}
        />
      </Layout>
    </div>
  );
};

export default Page;
