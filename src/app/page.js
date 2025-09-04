import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get_api";
import Language from "@/components/language_page";

export async function metadata() {
  const resp = await getServerSideData("api/home-meta/?populate=*");

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
      url: "https://wawcd.com/",
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
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
      canonical: "https://wawcd.com/",
    },
  };
}

const Page = async () => {
  const urls = {
    getStarted: "api/get-started",
    about: "api/about",
    // work: "api/work",
    template: "api/template/?populate[template][populate]=*",
    review1: "api/review",
    review2: "api/customer-reviews/?populate=*",
    review3: "api/reviews-platforms/?populate=*",
    faq: "api/faq",
    faqs: `api/faq-sections/?filters[is_home_page][$eq]=${true}`,
    meta: "api/home-meta/?populate=*",
  };
  const [
    getStarted,
    about,
    // work,
    template,
    review1,
    review2,
    review3,
    faq,
    faqs,
    meta,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getServerSideData(urls.getStarted),
    getServerSideData(urls.about),
    // getServerSideData(urls.work),
    getServerSideData(urls.template),
    getServerSideData(urls.review1),
    getServerSideData(urls.review2, true),
    getServerSideData(urls.review3, true),
    getServerSideData(urls.faq),
    getServerSideData(urls.faqs, true),
    getServerSideData(urls.meta),
  ]);
  console.log('meta', meta);
  console.log('template', template); 
  console.log('getStarted', getStarted);
  console.log('about', about);
  console.log('review1', review1);
  console.log('review2', review2);
  console.log('review3', review3);
  console.log('faq', faq);
  console.log('faqs', faqs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: meta?.title,
    image: isLocal
      ? BASE_URL + template?.image?.data?.attributes?.url
      : template?.image?.data?.attributes?.url,
    description: meta?.description,
    url: "https://wawcd.com/",
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Language
        getStarted={getStarted}
        about={about}
        // work={work}
        template={template?.template}
        review1={review1}
        review2={review2}
        review3={review3}
        faq={faq}
        faqs={faqs?.data}
      />
    </div>
  );
};

export default Page;
