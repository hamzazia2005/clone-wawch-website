"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectLanguageFromIP, shouldRedirectToLanguage, shouldSkipLanguageDetection } from '@/utils/ip-language-detection';

export default function LanguageDetector() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Use the comprehensive skip function to check all conditions
    if (shouldSkipLanguageDetection(pathname)) return;

    // Detect language and redirect if needed
    const detectAndRedirect = async () => {
      try {
        const detectedLanguage = await detectLanguageFromIP();
        const redirectPath = shouldRedirectToLanguage(pathname, detectedLanguage);
        
        if (redirectPath) {
          // Redirect to language-specific route
          router.push(redirectPath);
        }
      } catch (error) {
        console.error('Error in client-side language detection:', error);
      }
    };

    // Small delay to avoid interfering with initial page load
    const timeoutId = setTimeout(detectAndRedirect, 100);
    
    return () => clearTimeout(timeoutId);
  }, [router, pathname]);

  // This component doesn't render anything
  return null;
}
