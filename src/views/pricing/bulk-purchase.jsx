"use client";
import { useState } from "react";
import { EnterpriseToggle } from "../../components";
import { PricingPage } from ".";
const BulkPurchase = ({ enterpriseSection }) => {
  const [isMonthly, setIsMonthly] = useState(false);

  const handleToggle = () => {
    setIsMonthly((prev) => !prev);
  };
  return (
    <div className="px-4 lg:px-36">
      <h1 className="text-[#3F4E41] text-[44px] text-center font-[600] mb-6">
        {enterpriseSection.title1}{" "}
        <span className="text-[#47B772]">{enterpriseSection.title2}</span>
      </h1>
      <div className="flex justify-center mb-4">
        <EnterpriseToggle isMonthly={isMonthly} handleToggle={handleToggle} />
      </div>
      <div>
        <PricingPage isMonthly={isMonthly} />
      </div>
    </div>
  );
};

export default BulkPurchase;
