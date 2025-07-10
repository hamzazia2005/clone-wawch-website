import { Blogs } from "@/views/blog";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";
import Link from "next/link";

export async function metadata() {
  const resp = await getServerSideData("api/blog-meta");
  return {
    title: resp?.title,
    description: resp?.description,
    openGraph: {
      url: `https://wawcd.com/blog/`,
      title: resp?.title,
      description: resp?.description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_EN",
    },
    alternates: {
      canonical: "https://wawcd.com/blog/",
    },
  };
}

const Page = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 25;

  const urls = {
    blog: `api/blog?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    detail: `api/blog-details/?populate=*&sort=createdAt:DESC&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    meta: `api/blog-meta`,
  };

  // const [blog, detail, meta] = await Promise.all([
  //   getServerSideData(urls.blog),
  //   getServerSideData(urls.detail, true),
  //   getServerSideData(urls.meta),
  // ]);

  const blog = await getServerSideData(urls.blog);
  const detail = await getServerSideData(urls.detail, true);
  const meta = await getServerSideData(urls.meta);

  const totalPages = Math.ceil(detail?.meta?.pagination?.total / pageSize);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: meta?.title,
    description: meta?.description,
    url: "https://wawcd.com/blog/",
    datePublished: meta?.createdAt,
    mainEntity: detail?.data?.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog?.attributes?.meta_title,
      image: blog?.attributes?.image?.data[0]?.attributes?.url,
      datePublished: blog?.attributes?.createdAt,
      dateModified: blog?.attributes?.updatedAt,
    })),
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <Blogs data={blog} detail={detail} />
        <div className="flex justify-center items-center gap-2 my-4">
          {page > 1 && (
            <Link href={`?page=${page - 1}`}>
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
                <Link key={pageNumber} href={`?page=${pageNumber}`}>
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
            <Link href={`?page=${page + 1}`}>
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
