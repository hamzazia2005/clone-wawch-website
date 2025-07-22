import { GetStarted } from "@/views/comparison";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import { Testimonial } from "@/views/testimonial";

export async function metadata() {
  const resp = await getServerSideData("api/testimonial-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/testimonial/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/testimonial/",
    },
  };
}

const Page = async () => {
  const urls = {
    testimonialStarter: `api/testimonial-starter`,
    testimonial: `api/testimonials/?populate=*&sort=id`,
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
    url: "https://wawcd.com/testimonial/",
    datePublished: testimonialStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={testimonialStarter} />
        <Testimonial data={testimonial?.data} />
      </Layout>
    </div>
  );
};

export default Page;
