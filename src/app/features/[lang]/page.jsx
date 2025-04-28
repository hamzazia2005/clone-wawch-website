import { Feature } from "@/views/feature";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";
  const resp = await getServerSideData(
    `api/features-meta/?locale=${paramLanguage}`
  );
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/features/${paramLanguage}/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: `${paramLanguage}_${paramLanguage.toUpperCase()}`,
    },
    alternates: {
      canonical: `https://wawcd.com/features/${paramLanguage}/`,
    },
  };
}

const Page = async ({ params, searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 5;
  const languages = ["en", "fr", "ar", "pt", "ru"];
  const paramLanguage = languages?.includes(params?.lang) ? params?.lang : "en";

  const urls = {
    feature: `api/features/?populate=*&sort=createdAt:DESC&locale=${paramLanguage}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    meta: `api/features-meta/?locale=${paramLanguage}`,
  };

  const [feature, meta] = await Promise.all([
    getServerSideData(urls.feature, true),
    getServerSideData(urls.meta),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title,
    description: meta?.description,
    url: `https://wawcd.com/features/${paramLanguage}/`,
    datePublished: meta?.createdAt,
    mainEntity: feature?.data?.map((feature) => ({
      "@type": "WebPage",
      headline: feature?.attributes?.meta_title,
      image: feature?.attributes?.image?.data[0]?.attributes?.url,
      datePublished: feature?.attributes?.createdAt,
      dateModified: feature?.attributes?.updatedAt,
    })),
  };

  const totalFeatures = feature?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalFeatures / pageSize);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout params={params}>
        <Feature
          data={feature?.data}
          heading={meta?.heading ? meta?.heading : ""}
        />
        <div className="flex justify-center items-center gap-2 my-4">
          {page > 1 && (
            <Link href={`/features/${paramLanguage}?page=${page - 1}`}>
              <button className="w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded">
                <span>&lt;</span>
              </button>
            </Link>
          )}

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <Link
                  key={pageNumber}
                  href={`/features/${paramLanguage}?page=${pageNumber}`}
                >
                  <button
                    className={`w-8 h-8 flex justify-center items-center rounded ${
                      page === pageNumber
                        ? "bg-[#47B772] text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {pageNumber}
                  </button>
                </Link>
              );
            }
            if (
              (pageNumber === page - 2 && page > 3) ||
              (pageNumber === page + 2 && page < totalPages - 2)
            ) {
              return (
                <span
                  key={pageNumber}
                  className="w-8 h-8 flex justify-center items-center"
                >
                  ...
                </span>
              );
            }

            return null;
          })}
          {page < totalPages && (
            <Link href={`/features/${paramLanguage}&page=${page + 1}`}>
              <button className="w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded">
                <span>&gt;</span>
              </button>
            </Link>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;
