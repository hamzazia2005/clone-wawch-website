import { GetStarted } from "@/views/comparison";
import { TeamMembers } from "@/views/changelog";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function metadata() {
  const resp = await getServerSideData("api/changelog-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/changelog/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/changelog/",
    },
  };
}

const Page = async () => {
  const urls = {
    changelogStarter: `api/changelog-starter`,
    teamMembers: `api/team-members/?populate=*&sort=id`,
    version: `api/changelog-versions?sort=createdAt:desc`,
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
    url: "https://wawcd.com/changelog/",
    datePublished: changelogStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
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
