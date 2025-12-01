import { Pricing, Cta } from "@/views/home";
import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { TableCollapse } from "@/views/pricing";
// import { BulkPurchase } from "@/views/pricing";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(`api/price/?locale=${paramLanguage}`);
  return {
    title: resp?.meta_title || "WAWCD Pricing - Choose Your Plan",
    description: resp?.meta_description || "Choose the best WAWCD plan for your business needs.",
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/pricing/`,
      title: resp?.title || "WAWCD Pricing",
      description: resp?.description || "Choose the best WAWCD plan for your business needs.",
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/${paramLanguage}/pricing/`,
    },
  };
}

const Page = async ({ params }) => {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const urls = {
    pricing: `api/price/?populate=*&locale=${paramLanguage}`,
    faq: `api/faq/?locale=${paramLanguage}`,
    tableHead: `api/pricing-detail-head/?locale=${paramLanguage}`,
    tableData: `api/pricing-page-tables/?populate=*&locale=${paramLanguage}`,
    // enterpriseSection: `api/enterprise-section/?populate[enterprise][populate]=*&locale=${paramLanguage}`,
  };
  const [pricing, faq, tableHead, tableData] =
    await Promise.all([
      getServerSideData(urls.pricing),
      getServerSideData(urls.faq),
      getServerSideData(urls.tableHead),
      getServerSideData(urls.tableData),
      // getServerSideData(urls.enterpriseSection),
    ]);

  // Check if pricing data loaded successfully
  if (!pricing) {
    console.error('Failed to load pricing data from Strapi API');
  }

  const updatedPricing = {
    ...pricing,
    prices: pricing?.prices?.filter(
      (plan) => plan.new_price_yearly !== undefined
    ) || [],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pricing?.meta_title || "WAWCD Pricing",
    description:
      pricing?.meta_description || "Choose the best plan for your needs.",
    url: `https://wawcd.com/${paramLanguage}/pricing/`,
    provider: {
      "@type": "Organization",
      name: "WAWCD",
      url: "https://wawcd.com",
    },
    offers: updatedPricing?.prices?.map((plan) => ({
      "@type": "Offer",
      name: plan.title,
      description: plan.desc,
      price: plan.new_price_yearly,
      priceCurrency: plan.currency || "USD",
      availability: "https://schema.org/InStock",
    })),
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <div className="mt-24">
          {!pricing && (
            <div className="text-center py-16 px-4">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Unable to Load Pricing Data</h2>
              <p className="text-gray-600 mb-2">We're having trouble connecting to our pricing service.</p>
              <p className="text-gray-600 mb-4">Please check:</p>
              <ul className="text-left max-w-md mx-auto text-gray-600 list-disc list-inside mb-6">
                <li>Strapi backend is running</li>
                <li>STRAPI_BE_URL environment variable is configured</li>
                <li>STRAPI_ACCESS_TOKEN is valid</li>
                <li>Pricing data exists in Strapi CMS</li>
              </ul>
              <p className="text-sm text-gray-500">Check the console for more details.</p>
            </div>
          )}
          {pricing && <Pricing data={updatedPricing} isPage={true} />}
          {(tableData || tableHead) && (
            <div className="mt-10 flex flex-col items-center justify-center">
              {tableData?.tier && <TableCollapse data={tableData.tier} head={tableHead?.head} />}

              {tableData?.map((item, index) => (
                <TableCollapse
                  key={index}
                  data={item?.pricing_page_data}
                  title={item?.table_title}
                />
              ))}
            </div>
          )}
          {/* <div className="mt-10 flex justify-center gap-6" id="enterprise-card">
            <BulkPurchase enterpriseSection={enterpriseSection} />
            {/* <PricingPage enterpriseSection={enterpriseSection} /> */}
          {/* </div> */} 
          {faq && (
            <div className="px-12 lg:px-36">
              <Cta data={faq} isPage={true} />
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Page;
