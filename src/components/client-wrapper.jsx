"use client";
import { useEffect, useState, Suspense } from "react";
import WhatsAppButton from "./whatsapp-button";
import { AppWrapper } from "@/context";
import Loader from "./loader";
import dynamic from "next/dynamic";

const AOSinit = dynamic(() => import('@/animations/AOSinit'), {
  ssr: false
});

export default function ClientEnhancer({ children }) {
  const [jsOn, setJsOn] = useState(false);

  useEffect(() => {
    setJsOn(true);
  }, []);

  if (!jsOn) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <AOSinit/>
      <AppWrapper>
        {children}
        <WhatsAppButton /> 
      </AppWrapper> 
    </Suspense>
  );
}
