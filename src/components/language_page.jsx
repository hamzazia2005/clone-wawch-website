import Layout from "@/layout/page";
import { About, GetStarted } from "@/views/home";
import dynamic from "next/dynamic";

const Works = dynamic(() => import("@/views/home").then((mod) => mod.Works), {
  ssr: false,
});
const Templates = dynamic(
  () => import("@/views/home").then((mod) => mod.Templates),
  { ssr: false }
);
const Review = dynamic(() => import("@/views/home").then((mod) => mod.Review), {
  ssr: false,
});
const Faq = dynamic(() => import("@/views/home").then((mod) => mod.Faq), {
  ssr: false,
});

export default function Language({
  params,
  getStarted,
  about,
  // work,
  template,
  review1,
  review2,
  review3,
  faq,
  faqs,
}) {
  return (
    <Layout params={params}>
      <GetStarted data={getStarted} />
      <About data={about} />
      {/* <Works data={work} /> */}
      <Templates data={template} />
      <Review data={review1} reviews={review2} platform={review3} />
      <Faq data={faq} faqs={faqs} />
    </Layout>
  );
}
