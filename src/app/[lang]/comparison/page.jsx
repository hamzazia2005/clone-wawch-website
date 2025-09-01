import {
  GetStarted,
  Links,
  WhyWawcd,
  Comparisons,
  Titles,
} from "@/views/comparison";
import { Review, Faq } from "@/views/home";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/comparison-starter/?locale=${paramLanguage}`
  );
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/comparison/`,
      title: resp?.meta_title,
      description: resp?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/comparison/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    comparisonStarter: `api/comparison-starter/?locale=${paramLanguage}`,
    whyWawcd: `api/comparsion-why-wawcds/?populate=*&sort=id&locale=${paramLanguage}`,
    review1: `api/review/?locale=${paramLanguage}`,
    review2: `api/customer-reviews/?populate=*&locale=${paramLanguage}`,
    review3: "api/reviews-platforms/?populate=*",
    comparison: `api/comparison-data/?locale=${paramLanguage}`,
    faq: `api/faq/?locale=${paramLanguage}`,
    faqs: `api/faq-sections/?locale=${paramLanguage}`,
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
    url: `https://wawcd.com/comparison/${paramLanguage}/`,
    datePublished: comparisonStarter?.createdAt,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <GetStarted data={comparisonStarter} />
        <Links data={comparisonStarter} />
        <Comparisons data={comparison} />
        <Titles data={comparisonStarter} />
        <WhyWawcd data={whyWawcd?.data} />
        <Review
          data={review1}
          reviews={review2}
          platform={review3}
          isComparison={true}
        />
        <Faq data={faq} faqs={faqs.data} isComparison={true} />
      </Layout>
    </div>
  );
};

export default Page;
