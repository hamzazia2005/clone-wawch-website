import { Detail } from "@/views/blog_detail";
import { getServerSideData } from "@/utils/get_api";
import Layout from "@/layout/page";

export async function generateMetadata({ params }) {
  const resp = await getServerSideData(
    `api/blog-details/?filters[slug][$eq]=${params.slug}&populate[category]=*&populate=*`,
    true
  );

  return {
    title: resp?.meta_title,
    description: resp?.data?.meta_description,
    openGraph: {
      url: `https://wawcd.com/blog/${params.slug}/`,
      title: resp?.data?.meta_title,
      description: resp?.data?.meta_description,
      siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
      locale: "en_US",
      images: [
        {
          url: resp?.data?.image?.url,
          width: 800,
          height: 600,
          alt: resp?.title,
        },
      ],
    },
    alternates: {
      canonical: `https://wawcd.com/blog/${params.slug}/`,
    },
  };
}

const Page = async ({ params }) => {
  const urls = {
    blog: `api/blog-details/?filters[slug][$eq]=${params.slug}&populate=*`,
    detail:
      "api/blog-details/?populate=*&sort=createdAt:DESC&pagination[limit]=4",
    blog_headings: `api/blog`,
  };
  const [blog, detail, blog_headings] = await Promise.all([
    getServerSideData(urls.blog, true),
    getServerSideData(urls.detail, true),
    getServerSideData(urls.blog_headings),
  ]);

  const blogData = blog?.data?.[0];
  const detailData = detail?.data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogData?.meta_title,
    description: blogData?.meta_description,
    image: blogData?.image?.[0]?.url,
    url: `https://wawcd.com/blog/${params.slug}/`,
    datePublished: blogData?.createdAt,
    dateModified: blogData?.updatedAt,
    author: {
      "@type": "Person",
      name: blogData?.author?.title,
    },
    publisher: {
      "@type": "Organization",
      name: "WAWCD",
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <Detail
          data={blogData}
          detail={detailData}
          blog_headings={blog_headings}
        />
      </Layout>
    </div>
  );
};

export default Page;
