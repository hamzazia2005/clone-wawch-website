"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const pathname = usePathname();
  const [lang, setLang] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get language from localStorage only
      const storedLang = localStorage.getItem("lang") || "";
      
      if (typeof document !== "undefined") {
        const dir = storedLang.startsWith("ar") ? "rtl" : "ltr";
        document.documentElement.setAttribute("dir", dir);
      }
      setLang(storedLang);
    }
  }, [pathname]);

  return <AppContext.Provider value={{ lang }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  
  // If context is available (JS is on and AppWrapper is mounted), use it
  if (context !== undefined) {
    return context;
  }
  
  // If context is not available
  // Try to get language from URL path or localStorage
  let fallbackLang = "";
  
  if (typeof window !== "undefined") {
    // Try localStorage first
    fallbackLang = localStorage.getItem("lang") || "";
    
    // If not in localStorage, try to extract from URL
    if (!fallbackLang && typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const languages = ["en", "fr", "ar", "pt"];
      const urlLang = pathSegments[0];
      
      if (languages.includes(urlLang)) {
        fallbackLang = urlLang;
      }
    }
  }
  
  return { lang: fallbackLang };
}

