import { NextResponse } from 'next/server';
import { shouldRedirectToLanguage, shouldExcludeFromLanguageRedirect, getLanguageFromCountry } from './utils/ip-language-detection';

const deletedBlogSlugs = new Set([
  "whatsApp-tags-in-wawcd",
  "whatsapp-business-api-integration-with-e-commerce-platforms",
  "whatsapp-automation-in-digital-transformation",
  "how-to-add-someone-on-whatsapp-in-4-simple-steps",
  "web-for-business-growth-broadcast-messaging",
  "Boost-Your-Business-Efficiency-with-Chat-Automation",
  "maximizing-productivity-benefits-of-using-whatsapp-web-for-messaging-on-a-desktop",
  "faq-whatsapp-boosting-customer-engagement",
  "is-whatsapp-web-safe",
  "top-10-benefits-of-using-a-whatsapp-automation-tool",
  "the-future-of-whatsapp-web-extensions-for-managing-contacts",
  "whatsapp-ads-your-secret-weapon-for-facebook-and-instagram-success",
  "how-to-balance-automation-and-human-touch-in-whatsapp-for-customer-interactions",
  "create-a-whatsapp-business-sales-pipeline",
  "whatsapp-web-for-car-dealerships",
  "12-game-changing-advantages-of-a-whatsapp-business-account",
  "boost-sales-with-wawcd-ultimate-whatsapp-marketing-guide-for-accurate-results",
  "handy-feature-for-quick-access-in-your-whatsapp-smart-inbox",
  "An-introduction-to-WhatsApp-Web-and-the-benefits-it-offers-for-companies",
  "Blocks-Archives-or-Delete-Chat-Cleaning-by-using-Workflow",
  "how-whatsapp-business-is-revolutionizing-customer-service",
  "How-WAWCD's-Templates-Improve-Your-Conversation",
  "techniques-&-examples-of-whatsapp-for-customer-service-in-2025",
  "smart-conversations-whatsapp-ai-with-chatgpt",
  "top-features-in-whatsapp-automation-tool",
  "The-Power-of-Recurring-Commissions:-How-WAWCD-Helps-You-Build-Passive-Income",
  "whatsapp-business-catalogue-with-your-website",
  "whatsspp-business-for-healthcare-centres",
  "whats-changed-and-how-it-benefits-Users",
  "how-to-get-green-tick-in-whatsapp",
  "whatsApp-auto-replies-are-a-game-changer",
  "why-we-should-prefer-whatsapp-hubspot-integration-for-marketing",
  "Transform-Your-Customer-Experience-with-WhatsApp-Auto-Messages",
  "5-Things-You-Should-Know-for-A-Successful-E-Commerce",
  "10-powerful-ways-ai-based-whatsApp-web-can-supercharge-your-small-business",
  "hubspot-whatsapp-automation-complete-guide-for-sales",
  "The-role-of-automation-in-modern-E-commerce-A-WAWCD-perspective",
  "how-to-broadcast-to-1000-contacts-on-whatsapp!",
  "What-is-the-Process-of-WhatsApp-Green-Tick-Verification",
  "Maximize-Customer-Engagement-with-HubSpot-integrated-Chrome-Extensions-for-WhatsApp-Web",
]);


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

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    if (deletedBlogSlugs.has(slug)) {
      return new NextResponse(
        "<h1>410 - This blog post has been removed</h1><p>Please visit our <a href='/blog'>blog</a> for latest posts.</p>",
        { status: 410, headers: { "Content-Type": "text/html" } }
      );
    }
  }
  
  // Get country from Cloudflare headers
  const country = request.headers.get("cf-ipcountry") || "";

  try {
    // Skip if already on a language-specific route
    if (!pathname.match(/^\/[a-z]{2}\//)) {
      if (!shouldExcludeFromLanguageRedirect(pathname)) {
        //possible solution to detect language from cloudflare ip country
        const detectedLanguage = getLanguageFromCountry(country);
       // const detectedLanguage = await detectLanguageFromIP();
        const redirectPath = shouldRedirectToLanguage(pathname, detectedLanguage);
        
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
    // Dynamic routes
    '/f/:path*',
    '/feature/:path*',
    '/faq/:path*',
    '/blog/:path*',
    '/resources/:path*',
    // Exclude API routes, static files, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
