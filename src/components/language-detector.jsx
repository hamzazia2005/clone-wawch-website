"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectLanguageFromIP, shouldRedirectToLanguage, shouldSkipLanguageDetection } from '@/utils/ip-language-detection';

export default function LanguageDetector() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (typeof window === 'undefined') return;
    if (shouldSkipLanguageDetection(pathname)) return;

    const detectAndRedirect = async () => {
      try {
        const detectedLanguage = await detectLanguageFromIP();
        const redirectPath = shouldRedirectToLanguage(pathname, detectedLanguage);
        
        if (redirectPath) {
          router.push(redirectPath);
        }
      } catch (error) {
        console.error('Error in client-side language detection:', error);
      }
    };

    // Small delay to avoid interfering with initial page load
    const timeoutId = setTimeout(detectAndRedirect, 100);
    
    return () => clearTimeout(timeoutId);
  }, [isClient, router, pathname]);

  return null;
}
