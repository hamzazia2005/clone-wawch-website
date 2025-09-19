import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get_api";
import Language from "@/components/language_page";

export async function metadata() {
  const resp = await getServerSideData("api/home-meta/?populate=*");

  const faviconUrl = resp?.favicon?.url
    ? isLocal
      ? BASE_URL + resp?.favicon?.url
      : resp?.favicon?.url
    : null;
  return {
    title: resp?.title,
    description: resp?.description,
    verification: {
      google: "Aahq02UlpbJw3PbuUBWCiXqueMvK4qN0fZNrO4wUWcE",
    },
    icons: faviconUrl ? {
      icon: [
        {
          url: faviconUrl,
          href: faviconUrl,
        },
      ],
    } : {
      icon: [
        {
          url: '/assets/logo.svg',
          href: '/assets/logo.svg',
        },
      ],
    },
    openGraph: {
      url: "https://wawcd.com/",
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
      images: faviconUrl ? [
        {
          url: faviconUrl,
          width: 800,
          height: 600,
          alt: resp?.title,
        },
      ] : undefined,
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
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://wawcd.com/#org",
        "name": "WAWCD",
        "url": "https://wawcd.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wawcd.com/wp-content/uploads/2025/01/logo.png"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "5900 Balcones Drive STE 17554",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "postalCode": "78731",
          "addressCountry": "US"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://wawcd.com/#website",
        "url": "https://wawcd.com/",
        "name": "WAWCD",
        "publisher": { "@id": "https://wawcd.com/#org" },
        "inLanguage": "en"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://wawcd.com/#app",
        "name": "WAWCD – WhatsApp CRM & Automation (Chrome Extension)",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CustomerRelationshipManagement",
        "operatingSystem": "Web",
        "url": "https://wawcd.com/",
        "downloadUrl": "https://chromewebstore.google.com/",
        "description": "WhatsApp CRM with contact saver, broadcasting, templates, smart replies, workflows, labels, and integrations — runs on top of WhatsApp Web.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "category": "Free",
          "availability": "https://schema.org/InStock"
        },
        "publisher": { "@id": "https://wawcd.com/#org" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://wawcd.com/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://wawcd.com/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://wawcd.com/faqs/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does WAWCD work offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WAWCD runs as a Chrome extension on top of WhatsApp Web. Certain features require an active internet connection and an open WhatsApp Web session."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a way to automate tasks with the WAWCD Chrome Extension?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can use templates, smart replies, broadcasts, and workflows to automate replies and campaigns directly from your browser."
            }
          },
          {
            "@type": "Question",
            "name": "Is WAWCD a CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WAWCD adds CRM-like features to WhatsApp Web including contact management, labels, smart inbox, and messaging tools."
            }
          },
          {
            "@type": "Question",
            "name": "How do I uninstall WAWCD from WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Remove the WAWCD extension from your Chromium-based browser's extensions page; WhatsApp Web will return to its default behavior."
            }
          },
          {
            "@type": "Question",
            "name": "How does Broadcasting work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Create a campaign, select contacts or labels, add your template, and schedule or send. Respect WhatsApp's anti-spam policies and local regulations."
            }
          },
          {
            "@type": "Question",
            "name": "How can I create an account or upgrade to premium features?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Install the extension, sign in from the WAWCD panel, then choose a plan from the billing section inside the app to unlock premium features."
            }
          }
        ]
      }
    ]
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
