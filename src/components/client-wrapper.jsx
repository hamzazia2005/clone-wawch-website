"use client";
import { useEffect, useState, Suspense } from "react";
import WhatsAppButton from "./whatsapp-button";
import { AppWrapper } from "@/context";
import Loader from "./loader";
//import AOSinit from "@/animations/AOSinit";

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
      {/* <AOSinit/> */}
      <AppWrapper>
        {children}
        <WhatsAppButton /> 
      </AppWrapper> 
    </Suspense>
  );
}
