import { NextResponse } from 'next/server';
import { shouldRedirectToLanguage, shouldExcludeFromLanguageRedirect, getLanguageFromCountry } from './utils/ip-language-detection';
import { deletedBlogSlugs, blogRedirects, featureRedirects } from './utils/blog-redirects';


export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/features' || pathname === '/features/' || 
      pathname.match(/^\/[a-z]{2}\/features\/?$/)) {
    const page = searchParams.get('page');
    if (page) {
      const newUrl = new URL(request.url);
      newUrl.searchParams.delete('page');
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Handle blog redirects
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    
    // Check for 301 redirects first
    if (blogRedirects[slug]) {
      const newUrl = new URL(`/blog/${blogRedirects[slug]}`, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
    
    // Then check for deleted blogs
    if (deletedBlogSlugs.has(slug)) {
      return new NextResponse(
        "<h1>410 - This blog post has been removed</h1><p>Please visit our <a href='/blog'>blog</a> for latest posts.</p>",
        { status: 410, headers: { "Content-Type": "text/html" } }
      );
    }
  }

  // Handle feature page redirects (with language support)
  const featureMatch = pathname.match(/^(?:\/([a-z]{2}))?\/feature\/(.+?)(?:\/)?$/);
  if (featureMatch) {
    const [, lang, slug] = featureMatch;
    
    if (featureRedirects[slug]) {
      const langPrefix = lang ? `/${lang}` : '';
      const newUrl = new URL(`${langPrefix}/feature/${featureRedirects[slug]}`, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  const removedPagesMatch = pathname.match(/^(?:\/([a-z]{2}))?\/(road-map|coming-soon)\/?$/);
  if (removedPagesMatch) {
    const pageName = removedPagesMatch[2] === 'road-map' ? 'roadmap' : 'coming soon';
    return new NextResponse(
      `<h1>410 - This page has been removed</h1><p>The ${pageName} page is no longer available. Please visit our <a href='/'>homepage</a> for more information.</p>`,
      { status: 410, headers: { "Content-Type": "text/html" } }
    );
  }
  
  // Get country from Cloudflare headers
  const country = request.headers.get("cf-ipcountry") || "";
  
  // Get IP address for debugging
  const clientIP = request.headers.get("cf-connecting-ip") || 
                   request.headers.get("x-forwarded-for") || 
                   request.headers.get("x-real-ip") || 
                   "Unknown";
  
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    🌍 WAWCD MIDDLEWARE DEBUG                 ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log(`║ 🌍 Cloudflare detected country: ${country}`);
  console.log(`║ 📍 Client IP: ${clientIP}`);
  console.log(`║ 🛣️  Request URL: ${request.url}`);
  console.log('╚══════════════════════════════════════════════════════════════╝');
  try {
    // Skip if already on a language-specific route
    if (!pathname.match(/^\/[a-z]{2}\//)) {
      if (!shouldExcludeFromLanguageRedirect(pathname)) {
        const detectedLanguage = getLanguageFromCountry(country);
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗣️ LANGUAGE DETECTION                      ║');
        console.log('╠══════════════════════════════════════════════════════════════╣');
        console.log(`║ 🗣️ Detected language: ${detectedLanguage}`);
        const redirectPath = shouldRedirectToLanguage(pathname, detectedLanguage);
        console.log(`║ 🔄 Redirect path: ${redirectPath || 'No redirect'}`);
        console.log('╚══════════════════════════════════════════════════════════════╝');
        
        if (redirectPath) {
          const redirectResponse = NextResponse.redirect(new URL(redirectPath, request.url));
          // Set country cookie on redirect too (only if changed)
          const existingCountry = request.cookies.get('user-country')?.value;
          if (existingCountry !== country) {
            redirectResponse.cookies.set('user-country', country, {
              httpOnly: false,
              maxAge: 60 * 60 * 24, // 24 hours
              sameSite: 'lax'
            });
          }
          return redirectResponse;
        }
      }
    }
  } catch (error) {
    console.error('Error in language detection middleware:', error);
  }


  const response = NextResponse.next();
  const existingCountry = request.cookies.get('user-country')?.value;

  const languages = ["en", "fr", "ar", "pt"];
  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const detectedLang = langMatch && languages.includes(langMatch[1]) ? langMatch[1] : "";
  
  response.headers.set('x-language', detectedLang);
  response.headers.set('x-pathname', pathname);
  
  // Only set cookie if country changed or doesn't exist
  if (existingCountry !== country) {
    response.cookies.set('user-country', country, {
      httpOnly: false, // Allow client-side access
      maxAge: 60 * 60 * 24, // 24 hours (updates immediately on country change)
      sameSite: 'lax'
    });
  }
  
  
  return response;
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
    '/resources',
    '/resources/',
    '/privacy-policy',
    '/privacy-policy/',
    // '/road-map',
    // '/road-map/',
    '/uninstall',
    '/uninstall/',
    '/affiliate',
    '/affiliate/',
    '/affiliates',
    '/affiliates/',
    // '/coming-soon',
    // '/coming-soon/',
    // Dynamic routes
    '/f/:path*',
    '/feature/:path*',
    '/:lang/feature/:path*',
    '/faq/:path*',
    '/blog/:path*',
    '/resources/:path*',
    // Exclude API routes, static files, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
