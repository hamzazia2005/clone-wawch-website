import { GetStarted } from "@/views/comparison";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import { Testimonial } from "@/views/testimonial";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/testimonial-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/testimonial/${paramLanguage}/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/testimonial/${paramLanguage}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    testimonialStarter: `api/testimonial-starter/?locale=${paramLanguage}`,
    testimonial: `api/testimonials/?populate=*&sort=id&locale=${paramLanguage}`,
  };
  const [testimonialStarter, testimonial] = await Promise.all([
    getServerSideData(urls.testimonialStarter),
    getServerSideData(urls.testimonial, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: testimonialStarter?.meta_title,
    description: testimonialStarter?.meta_description,
    url: `https://wawcd.com/testimonial/${paramLanguage}/`,
    datePublished: testimonialStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={testimonialStarter} />
        <Testimonial data={testimonial?.data} />
      </Layout>
    </div>
  );
};

export default Page;
