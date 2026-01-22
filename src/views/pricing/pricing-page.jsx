"use client";
import * as React from "react";

function PricingPage({ }) {
  // Note: This component previously used Stripe pricing tables.
  // Now redirects to dashboard for checkout via the PricePlan component.
  // The Stripe pricing tables have been removed in favor of the unified dashboard checkout flow.
  
  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row items-center gap-10 mt-8 px-4">
      <div className="text-center w-full p-8">
        <p className="text-lg text-gray-600">
          Please scroll up to view our pricing plans. Select any plan to proceed to checkout.
        </p>
      </div>
    </div>
  );
}

export default PricingPage;
