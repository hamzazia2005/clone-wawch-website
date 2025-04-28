import { GetStarted, Links, Titles } from "@/views/comparison";
import { getServerSideData } from "@/utils/get_api";
import dynamic from "next/dynamic";
import Layout from "@/layout/page";

const WhyWawcd = dynamic(
  () => import("@/views/comparison").then((mod) => mod.WhyWawcd),
  { ssr: false }
);
const Comparisons = dynamic(
  () => import("@/views/comparison").then((mod) => mod.Comparisons),
  { ssr: false }
);

const Review = dynamic(() => import("@/views/home").then((mod) => mod.Review), {
  ssr: false,
});

const Faq = dynamic(() => import("@/views/home").then((mod) => mod.Faq), {
  ssr: false,
});

export async function metadata() {
  const resp = await getServerSideData("api/comparison-starter");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/comparison/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/comparison/",
    },
  };
}

const Page = async () => {
  const urls = {
    comparisonStarter: `api/comparison-starter`,
    whyWawcd: `api/comparsion-why-wawcds/?populate=*&sort=id`,
    review1: `api/review`,
    review2: `api/customer-reviews/?populate=*`,
    review3: "api/reviews-platforms/?populate=*",
    comparison: "api/comparison-data",
    faq: `api/faq`,
    faqs: `api/faq-sections`,
  };
  const [
    comparisonStarter,
    whyWawcd,
    review1,
    review2,
    review3,
    comparison,
    faq,
    faqs,
  ] = await Promise.all([
    getServerSideData(urls.comparisonStarter),
    getServerSideData(urls.whyWawcd, true),
    getServerSideData(urls.review1),
    getServerSideData(urls.review2, true),
    getServerSideData(urls.review3, true),
    getServerSideData(urls.comparison),
    getServerSideData(urls.faq),
    getServerSideData(urls.faqs, true),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: comparisonStarter?.meta_title,
    description: comparisonStarter?.meta_description,
    url: "https://wawcd.com/comparison/",
    datePublished: comparisonStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <GetStarted data={comparisonStarter} />
        <Links data={comparisonStarter} />
        <Comparisons data={comparison} />
        <Titles data={comparisonStarter} />
        <WhyWawcd data={whyWawcd?.data} />
        <Review data={review1} reviews={review2} platform={review3} />
        <Faq data={faq} faqs={faqs.data} />
      </Layout>
    </div>
  );
};

export default Page;
