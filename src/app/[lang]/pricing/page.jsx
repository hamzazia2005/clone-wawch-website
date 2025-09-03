import { Pricing, Cta } from "@/views/home";
import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import { TableCollapse, BulkPurchase } from "@/views/pricing";

export async function metadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(`api/price/?locale=${paramLanguage}`);
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/${paramLanguage}/pricing/`,
      title: resp?.title,
      description: resp?.description,
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
    enterpriseSection: `api/enterprise-section/?populate[enterprise][populate]=*&locale=${paramLanguage}`,
  };
  const [pricing, faq, tableHead, tableData, enterpriseSection] =
    await Promise.all([
      getServerSideData(urls.pricing),
      getServerSideData(urls.faq),
      getServerSideData(urls.tableHead),
      getServerSideData(urls.tableData, true),
      getServerSideData(urls.enterpriseSection),
    ]);

  const updatedPricing = {
    ...pricing,
    prices: pricing.prices.filter(
      (plan) => plan.new_price_yearly !== undefined
    ),
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
          <Pricing data={updatedPricing} isPage={true} />
          <div className="mt-10 flex flex-col items-center justify-center">
            <TableCollapse data={tableData.tier} head={tableHead?.head} />

            {tableData?.data?.map((item, index) => (
              <TableCollapse
                key={index}
                data={item?.attributes?.pricing_page_data}
                title={item?.attributes?.table_title}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-6" id="enterprise-card">
            <BulkPurchase enterpriseSection={enterpriseSection} />
            {/* <PricingPage enterpriseSection={enterpriseSection} /> */}
          </div>
          <div className="px-12 lg:px-36">
            <Cta data={faq} isPage={true} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page;
