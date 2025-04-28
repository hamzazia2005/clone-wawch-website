"use client";

import { PageStarter } from "@/components";

const GetStarted = ({ data, faqs, search, setSearch }) => {
  return (
    <div className="flex justify-center mt-24 py-20 bg-faq_banner bg-cover bg-center">
      <PageStarter
        data={data}
        faqs={faqs}
        setSearch={setSearch}
        isSearch={true}
        search={search}
      />
    </div>
  );
};

export default GetStarted;
