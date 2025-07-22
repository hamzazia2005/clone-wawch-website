import Layout from "@/layout/page";
import { getServerSideData } from "@/utils/get_api";
import dynamic from "next/dynamic";
import { Pricing } from "@/views/home";

const BulkPurchase = dynamic(
  () => import("@/views/pricing").then((mod) => mod.BulkPurchase),
  { ssr: false }
);
const TableCollapse = dynamic(
  () => import("@/views/pricing").then((mod) => mod.TableCollapse),
  {
    ssr: false,
  }
);
const Cta = dynamic(() => import("@/views/home").then((mod) => mod.Cta), {
  ssr: false,
});

export async function metadata() {
  const resp = await getServerSideData("api/price");
  return {
    title: resp?.meta_title,
    description: resp?.meta_description,
    openGraph: {
      url: `https://wawcd.com/pricing/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
    },
    alternates: {
      canonical: "https://wawcd.com/pricing/",
    },
  };
}

const Page = async () => {
  const urls = {
    pricing: `api/price/?populate=*`,
    faq: `api/faq`,
    tableHead: `api/pricing-detail-head`,
    tableData: `api/pricing-page-tables/?populate=*`,
    enterpriseSection: `api/enterprise-section/?populate[enterprise][populate]=*`,
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
    url: `https://wawcd.com/pricing/`,
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
      <Layout>
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
