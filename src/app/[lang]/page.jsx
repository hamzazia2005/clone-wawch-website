import Language from "@/components/language_page";
import { getServerSideData } from "@/utils/get_api";
import { BASE_URL, isLocal } from "@/utils/axios_instance";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/home-meta/?locale=${paramLanguage}&populate=*`
  );

  const faviconUrl = isLocal
    ? BASE_URL + resp?.favicon.url
    : resp?.favicon.url;

  return {
    title: resp?.title,
    description: resp?.description,
    verification: {
      google: "Aahq02UlpbJw3PbuUBWCiXqueMvK4qN0fZNrO4wUWcE",
    },
    icons: {
      icon: [
        {
          url: faviconUrl,
          href: faviconUrl,
        },
      ],
    },
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
      images: [
        {
          url: faviconUrl,
          width: 800,
          height: 600,
          alt: resp?.title,
        },
      ],
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    getStarted: `api/get-started/?locale=${paramLanguage}`,
    about: `api/about/?locale=${paramLanguage}`,
    // work: `api/work/?locale=${paramLanguage}`,
    template: `api/template/?populate[template][populate]=*&locale=${paramLanguage}`,
    review1: `api/review/?locale=${paramLanguage}`,
    review2: `api/customer-reviews/?locale=${paramLanguage}&populate=*`,
    review3: "api/reviews-platforms/?populate=*",
    pricing: `api/price/?populate=*&locale=${paramLanguage}`,
    faq: `api/faq/?locale=${paramLanguage}`,
    faqs: `api/faq-sections/?filters[is_home_page][$eq]=${true}&locale=${paramLanguage}`,
    meta: `api/home-meta/?locale=${paramLanguage}&populate=*`,
  };

  const [
    getStarted,
    about,
    // work,
    template,
    review1,
    review2,
    review3,
    pricing,
    faq,
    faqs,
    meta,
  ] = await Promise.all([
    getServerSideData(urls.getStarted),
    getServerSideData(urls.about),
    // getServerSideData(urls.work),
    getServerSideData(urls.template),
    getServerSideData(urls.review1),
    getServerSideData(urls.review2, true),
    getServerSideData(urls.review3, true),
    getServerSideData(urls.pricing),
    getServerSideData(urls.faq),
    getServerSideData(urls.faqs, true),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: meta?.title,
    image: isLocal
      ? BASE_URL + template?.image?.data?.attributes?.url
      : template?.image?.data?.attributes?.url,
    description: meta?.description,
    url: `https://wawcd.com/${paramLanguage}/`,
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Language
        params={params}
        getStarted={getStarted}
        about={about}
        // work={work}
        template={template?.template}
        review1={review1}
        review2={review2}
        review3={review3}
        pricing={pricing}
        faq={faq}
        faqs={faqs?.data}
      />
    </div>
  );
};

export default Page;
