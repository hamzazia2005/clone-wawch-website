"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const [lang, setLang] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (typeof window !== "undefined") {
      // Get language from localStorage only
      const storedLang = localStorage.getItem("lang") || "";
      
      if (typeof document !== "undefined") {
        const dir = storedLang.startsWith("ar") ? "rtl" : "ltr";
        document.documentElement.setAttribute("dir", dir);
      }
      setLang(storedLang);
    }
  }, [isClient, pathname]);

  return <AppContext.Provider value={{ lang, isClient }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  
  // If context is available (JS is on and AppWrapper is mounted), use it
  if (context !== undefined) {
    return context;
  }
  
  // If context is not available, return safe defaults
  return { 
    lang: "", 
    isClient: false 
  };
}

