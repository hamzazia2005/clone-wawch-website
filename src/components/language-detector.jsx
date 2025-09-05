"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectLanguageFromIP, shouldRedirectToLanguage, shouldExcludeFromLanguageRedirect } from '@/utils/ip-language-detection';

export default function LanguageDetector() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Skip if already on a language-specific route
    if (pathname.match(/^\/[a-z]{2}\//)) return;

    // Skip API routes and static files
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.includes('.') ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml'
    ) {
      return;
    }
    if (shouldExcludeFromLanguageRedirect(pathname)) return;

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
