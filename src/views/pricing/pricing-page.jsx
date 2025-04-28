"use client";
import * as React from "react";

function PricingPage({ isMonthly }) {
  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row items-center gap-10 mt-8 px-4">
      {!isMonthly ? (
        <>
          <div className="border border-green-100 rounded-lg  p-1 shadow-lg">
            <stripe-pricing-table
              pricing-table-id="prctbl_1QInjnHW0lwq5Yvsd4F5Zuvm"
              publishable-key="pk_live_51MbL48HW0lwq5YvskZACbmw5BxsML6WdhXOO5VHodLzAwQ7XocnSvKjdYiwvI56ogv2i5ShctuzZ0O5TynZMSiIJ00NI4tTvrv"
            ></stripe-pricing-table>
          </div>
          <div className="border border-green-100 rounded-lg  p-1 shadow-lg">
            <stripe-pricing-table
              pricing-table-id="prctbl_1QIngUHW0lwq5Yvsw0sW86fz"
              publishable-key="pk_live_51MbL48HW0lwq5YvskZACbmw5BxsML6WdhXOO5VHodLzAwQ7XocnSvKjdYiwvI56ogv2i5ShctuzZ0O5TynZMSiIJ00NI4tTvrv"
            ></stripe-pricing-table>
          </div>
        </>
      ) : (
        <>
          <div className="border border-green-100 rounded-lg  p-1 shadow-lg">
            <stripe-pricing-table
              pricing-table-id="prctbl_1QHkWBHW0lwq5YvsczfiDDaB"
              publishable-key="pk_live_51MbL48HW0lwq5YvskZACbmw5BxsML6WdhXOO5VHodLzAwQ7XocnSvKjdYiwvI56ogv2i5ShctuzZ0O5TynZMSiIJ00NI4tTvrv"
            ></stripe-pricing-table>
          </div>
          <div className="border border-green-100 rounded-lg  p-1 shadow-lg">
            <stripe-pricing-table
              pricing-table-id="prctbl_1QInmyHW0lwq5YvsqNRsFzEt"
              publishable-key="pk_live_51MbL48HW0lwq5YvskZACbmw5BxsML6WdhXOO5VHodLzAwQ7XocnSvKjdYiwvI56ogv2i5ShctuzZ0O5TynZMSiIJ00NI4tTvrv"
            ></stripe-pricing-table>
          </div>
        </>
      )}
    </div>
  );
}

export default PricingPage;
