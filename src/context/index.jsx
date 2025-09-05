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
  return useContext(AppContext);
}
