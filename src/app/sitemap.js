import { serverAxios } from "@/utils/axios_clients";

const getSortedPostsData = [
  {
    id: "",
    date: new Date().toISOString(),
    priority: 1.0,
    frequency: "daily",
  },
  {
    id: "ar/",
    date: new Date().toISOString(),
    priority: 1.0,
    frequency: "daily",
  },
  {
    id: "pt/",
    date: new Date().toISOString(),
    priority: 1.0,
    frequency: "daily",
  },
  {
    id: "fr/",
    date: new Date().toISOString(),
    priority: 1.0,
    frequency: "daily",
  },
  {
    id: "pricing/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pricing/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pricing/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pricing/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "privacy-policy/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "privacy-policy/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "privacy-policy/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "privacy-policy/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "blog/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "faqs/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "faqs/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "faqs/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "faqs/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "features/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "features/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "features/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "features/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "uninstall/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "uninstall/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "uninstall/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "uninstall/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "contact-us/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "contact-us/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "contact-us/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "contact-us/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "coming-soon/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "coming-soon/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "coming-soon/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "coming-soon/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "why-wawcd/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "why-wawcd/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "why-wawcd/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "why-wawcd/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "author/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "affiliate/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "affiliate/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "affiliate/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "affiliate/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "avail-offer/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "avail-offer/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "avail-offer/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "avail-offer/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "comparison/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "comparison/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "comparison/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "comparison/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "road-map/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "road-map/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "road-map/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "road-map/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "changelog/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "changelog/ar/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "changelog/pt/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "changelog/fr/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
];

const URL = process.env.WAWCD_URL;

async function getServerSideData(url = "") {
  try {
    const response = await serverAxios.get(url);
    return response.data?.data || [];
  } catch (error) {
    console.error(
      `Error fetching data from ${url}:`,
      error.message || "Unknown error"
    );
    return [];
  }
}

export default async function sitemap() {
  try {
    const resp = await getServerSideData("api/blog-details");
    const resp2 = await getServerSideData("api/features");
    const resp3 = await getServerSideData("api/faq-sections");

    const routes = getSortedPostsData.map(
      ({ id, date, priority, frequency }) => ({
        url: `${URL}${id}`.replace(/&/g, "&amp;"),
        lastModified: date,
        priority: priority,
        changeFrequency: frequency,
      })
    );

    const blogs = Array.isArray(resp)
      ? resp.map((blog) => ({
          url: `${URL}blog/${blog?.attributes?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${blog?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const features = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}feature/${feature?.attributes?.slug}/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const featuresAr = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}feature/${feature?.attributes?.slug}/ar/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const featuresPt = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}feature/${feature?.attributes?.slug}/pt/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const featuresFr = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}feature/${feature?.attributes?.slug}/fr/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqs = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}faq/${faq?.attributes?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqsAr = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}faq/${faq?.attributes?.slug}/ar/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqsPt = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}faq/${faq?.attributes?.slug}/pt/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqsFr = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}faq/${faq?.attributes?.slug}/fr/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.attributes?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    return [
      ...routes,
      ...blogs,
      ...features,
      ...featuresAr,
      ...featuresPt,
      ...featuresFr,
      ...faqs,
      ...faqsAr,
      ...faqsPt,
      ...faqsFr,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least the static routes if there's an error
    return getSortedPostsData.map(({ id, date, priority, frequency }) => ({
      url: `${URL}${id}`.replace(/&/g, "&amp;"),
      lastModified: date,
      priority: priority,
      changeFrequency: frequency,
    }));
  }
}
