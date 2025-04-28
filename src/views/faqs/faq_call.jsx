"use client";
import { GetStarted, Faqs } from "@/views/faqs";
import { useState } from "react";

const FaqCall = ({ getStarted, faq }) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <GetStarted
        data={getStarted}
        faqs={faq?.data}
        search={search}
        setSearch={setSearch}
      />
      <Faqs data={faq?.data} />
    </div>
  );
};

export default FaqCall;
