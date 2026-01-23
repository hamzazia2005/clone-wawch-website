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
    id: "ar/pricing/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/pricing/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/pricing/",
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
    id: "ar/privacy-policy/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/privacy-policy/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/privacy-policy/",
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
    id: "ar/faqs/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/faqs/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/faqs/",
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
    id: "ar/features/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/features/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/features/",
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
    id: "ar/uninstall/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/uninstall/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/uninstall/",
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
    id: "ar/contact-us/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/contact-us/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/contact-us/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  // {
  //   id: "coming-soon/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  // {
  //   id: "ar/coming-soon/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  // {
  //   id: "pt/coming-soon/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  // {
  //   id: "fr/coming-soon/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  {
    id: "why-wawcd/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "ar/why-wawcd/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/why-wawcd/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/why-wawcd/",
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
    id: "ar/affiliate/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/affiliate/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/affiliate/",
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
    id: "ar/avail-offer/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/avail-offer/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/avail-offer/",
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
    id: "ar/comparison/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/comparison/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/comparison/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  // {
  //   id: "road-map/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  // {
  //   id: "ar/road-map/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  // {
  //   id: "pt/road-map/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  // {
  //   id: "fr/road-map/",
  //   date: new Date().toISOString(),
  //   priority: 0.9,
  //   frequency: "daily",
  // },
  {
    id: "changelog/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "ar/changelog/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "pt/changelog/",
    date: new Date().toISOString(),
    priority: 0.9,
    frequency: "daily",
  },
  {
    id: "fr/changelog/",
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
          url: `${URL}blog/${blog?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${blog?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const features = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}feature/${feature?.slug}/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const featuresAr = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}ar/feature/${feature?.slug}/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const featuresPt = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}pt/feature/${feature?.slug}/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const featuresFr = Array.isArray(resp2)
      ? resp2.map((feature) => ({
          url: `${URL}fr/feature/${feature?.slug}/`.replace(
            /&/g,
            "&amp;"
          ),
          lastModified: `${feature?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqs = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}faq/${faq?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqsAr = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}ar/faq/${faq?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqsPt = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}pt/faq/${faq?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.updatedAt}`,
          priority: 0.8,
          changeFrequency: "daily",
        }))
      : [];

    const faqsFr = Array.isArray(resp3)
      ? resp3.map((faq) => ({
          url: `${URL}fr/faq/${faq?.slug}/`.replace(/&/g, "&amp;"),
          lastModified: `${faq?.updatedAt}`,
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
