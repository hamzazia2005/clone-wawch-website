import { NextResponse } from 'next/server';
import { detectLanguageFromIP, shouldRedirectToLanguage, shouldExcludeFromLanguageRedirect } from './utils/ip-language-detection';

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle features page redirects
  if (pathname === '/features' || pathname === '/features/' || 
      pathname.match(/^\/[a-z]{2}\/features\/?$/)) {
    const page = searchParams.get('page');
    if (page) {
      const newUrl = new URL(request.url);
      newUrl.searchParams.delete('page');
      return NextResponse.redirect(newUrl, 301);
    }
  }

  try {
    // Skip if already on a language-specific route
    if (!pathname.match(/^\/[a-z]{2}\//)) {
      if (!shouldExcludeFromLanguageRedirect(pathname)) {
        const detectedLanguage = await detectLanguageFromIP();
        const redirectPath = shouldRedirectToLanguage(pathname, detectedLanguage);
        
        if (redirectPath) {
          console.log(`Redirecting from ${pathname} to ${redirectPath} (detected language: ${detectedLanguage})`);
          return NextResponse.redirect(new URL(redirectPath, request.url));
        }
      }
    }
  } catch (error) {
    console.error('Error in language detection middleware:', error);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Features page redirects
    '/features',
    '/features/',
    '/:lang/features',
    '/:lang/features/',
    // Language detection for main pages
    '/',
    '/pricing',
    '/pricing/',
    '/faq',
    '/faq/',
    '/faqs',
    '/faqs/',
    '/contact-us',
    '/contact-us/',
    '/comparison',
    '/comparison/',
    '/why-wawcd',
    '/why-wawcd/',
    '/testimonial',
    '/testimonial/',
    '/changelog',
    '/changelog/',
    '/avail-offer',
    '/avail-offer/',
    '/partner',
    '/partner/',
    '/author',
    '/author/',
    '/blog',
    '/blog/',
    '/privacy-policy',
    '/privacy-policy/',
    '/road-map',
    '/road-map/',
    '/uninstall',
    '/uninstall/',
    '/affiliate',
    '/affiliate/',
    '/affiliates',
    '/affiliates/',
    '/coming-soon',
    '/coming-soon/',
    // Exclude API routes, static files, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
