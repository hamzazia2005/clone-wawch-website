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
  "Using-HubSpot-WhatsApp-integration-for-Better-Lead-ManagementÂ ",
  "Using-HubSpot-WhatsApp-integration-for-Better-Lead-Management%C3%82",
  "Using-HubSpot-WhatsApp-integration-for-Better-Lead-Management%C3%82%20",
  "How-WAWCD-Templates-Can-Be-Helpful-in-Customer-Support",
  "%20A-Complete-Guide-to-Customize-ChatGPT-WhatsApp-Messaging",
  "wa-web-plus-and-9-other-chrome-extensions-for-improving-your-whatsapp-experience",
  "wa-web-plus-6-alternatives",
  "wa-web-plus",
  "How-to-Share-Your-WhatsApp-Business-Link-On-Social-Media",
  "what-should-we-know-about-personalized-broadcast",
  "creating-a-culture-of-whatsapp-automation-in-your-business",
  "whatsapp-marketing-to-grow-your-business",
  "how-chatgpt-whatsapp-can-save-you-hours",
  "how-whatsapp-integrates-with-other-tools-for-enhanced-functionality",
  "step-by-step-guide-to-signing-up-for-wawcd-affiliate-program",
  "how-to-create-an-effective-rsvp-process-using-wawcd",
  "how-live-support-in-whatsapp-extensions-enhances",
  "whatsApp-translate-the-ultimate-tool-for-multilingual-instant-messaging"
]);

// 301 Redirect maps for slug changes
const blogRedirects = {
  // Blog redirects (old slug -> new slug)
  "how-to-get-a-whatsApp-verification-code-by-email-everything-you-need-to-know": "how-to-get-a-whatsapp-verification-code-by-email",
  "WAWCD-New-Airtable-Feature-Connect-WhatsApp-and-Streamline-Your-Data": "wawcd-new-airtable-feature-connect-whatsapp",
  "Crafting-Engaging-Broadcast-Messages-Is-Important:-10-Tips-to-Improve-Them": "crafting-engaging-broadcast-messages-is-important-10-tips",
  "Why-You-Should-Consider-Installing-a-WhatsApp-Privacy-Extension": "consider-installing-a-whatsapp-privacy-extension",
  "how-to-send-whatsApp-messages-without-saving-the-number": "send-whatsapp-messages-without-saving-the-number",
  "Efficiently-Organize-Your-Contacts-with-Contact-Saver-for-WhatsApp": "efficiently-organize-your-contacts-with-contact-saver-for-whatsapp",
  "How-WAWCD-is-beneficial-for-Healthcare-Professionals": "how-wawcd-is-beneficial-for-healthcare-professionals",
  "How-to-Build-a-WhatsApp-Web-Marketing-Funnel": "how-to-build-a-whatsapp-web-marketing-funnel",
  "How-to-Automate-Chat-Labeling-with-WhatsApp-Web-for-Better-Organization": "how-to-automate-chat-labeling-with-whatsapp-web",
  "How-to-create-a-WhatsApp-channel": "how-to-create-a-whatsapp-channel",
  "WhatsApp-Business-for-B2B-Service-Providers%3A-Effective-Communication-Strategies": "whataspp-business-for-b2b-service-providers-effective-communication",
  "WhatsApp-Business-for-B2B-Service-Providers:Effective-Communication-Strategies": "whataspp-business-for-b2b-service-providers-effective-communication",
  "How-to-Prepare-for-the-Future-2025-of-Messaging-and-Communication": "how-to-prepare-for-the-future-2025-of-messaging",
  "How-to-Maximize-Your-Earnings-with-WAWCD's-Affiliate-Program:": "how-to-maximize-your-earnings-with-wawcd-afiliate-program",
  "Using-HubSpot-WhatsApp-integration-for-Better-Lead-Management ": "using-hubspot-whatsapp-integration-for-better-lead-management",
  "Using-HubSpot-WhatsApp-integration-for-Better-Lead-Management": "using-hubspot-whatsapp-integration-for-better-lead-management",
  "How-to-Rephrase-and-Correct-Grammar-in-1-Click-Using-WAWCD": "how-to-rephrase-and-correct-grammar-using-wawcd",
  "Creating-a-Culture-of-WhatsApp-Automation-in-Your-Business": "creating-a-culture-of-whatsapp-automation-in-your-business",
  "how-to-optimize-message-melivery-with-delayed-workflows-in-whatsApp-web": "how-to-optimize-message-melivery-with-delayed-workflows-in-whatsapp-web",
  "A-Step-by-Step-Guide-to-Signing-Up-for-WAWCD's-Affiliate-Program": "step-by-step-guide-to-signing-up-for-wawcd-affiliate-program",
  "How-to-Seamlessly-Access-WhatsApp-Web-Login-with-the-WAWCD-Chrome-Extension": "how-to-seamlessly-access-whatsapp-web-login-with-the-wawcd-chrome-extension",
  "What-are-the-Most-Famous-WhatsApp-Chrome-Extensions-for-2025": "what-are-the-most-famous-whatsapp-chrome-extensions-for-2025",
  "A-Complete-Guide-for-Automating-Conversations-Using-WAWCD-Workflows": "guide-for-automating-conversations-using-wawcd-workflows",
  "WAWCD-Vs-Regular-WhatsApp-Business-Key-Differences": "wawcd-vs-regular-whatsapp-business-key-differences",
  "How-to-Enhance-Your-E-commerce-with-WhatsApp-Marketing": "how-to-enhance-your-e-commerce-with-whatsapp-marketing",
  "How-To-Use-WhatsApp-Web-for-Community-Engagement": "how-to-use-whatsapp-web-for-community-engagement",
  " A-Complete-Guide-to-Customize-ChatGPT-WhatsApp-Messaging": "complete-guide-to-customize-chatgpt-whatsapp-messaging",
  "A-Complete-Guide-to-Customize-ChatGPT-WhatsApp-Messaging": "complete-guide-to-customize-chatgpt-whatsapp-messaging",
  "WhatsApp-Blur-Extension-An-Indispensable-Tool-For-Businesses-To-Ensure-Data-Protection": "whatsapp-blur-extension-an-indispensable-tool-for-data-protection",
  "Top-5-Data-Backup-Solutions-for-Your-WhatsApp-Business-Account": "top-5-data-backup-solutions-for-your-whatsapp-business-account",
  "Guide-on-Automated-ChatGPT-Responses-for-WhatsApp-Messaging": "guide-on-automated-chatgpt-responses-for-whatsapp-messaging",
  "Top-5-WhatsApp-Marketing-Tools-You-Should-Be-Using-in-2025": "top-5-whatsapp-marketing-tools-you-should-be-using-in-2025",
  "The-Benefit-of-Utilizing-Video-Content-in-WhatsApp-Web-Marketing": "benefit-of-utilizing-video-content-in-whatsapp-web-marketing",
  "How-to-Unblock-Your-WhatsApp-Business-Account-A-Complete-Guide": "how-to-unblock-your-whatsapp-business-account",
  "how-to-migrate-from-whatsApp-to-business-whatsapp-without-data-loss": "how-to-migrate-from-whatsapp-to-business-whatsapp-without-data-loss",
  "Smart-Workflow-Automation-How-WAWCD-Handles-Keyword-Based-Messaging": "smart-workflow-automation-how-wawcd-handles-keyword-based-messaging",
  "Transforming-Customer-Service-with-AI-Automation-Capabilities": "transforming-customer-service-with-ai-automation-capabilities",
  "Using-AI-Powered-Replies-in-WhatsApp-Web-for-Personalized-Interactions": "using-ai-powered-replies-in-whatsapp-web-for-personalized-interactions",
  "How-WhatsApp-Integrates-with-Other-Tools-for-Enhanced-Functionality": "how-whatsapp-integrates-with-other-tools-for-enhanced-functionality",
  "automating-the-process-with-hubSpot-whatsapp-integration": "automating-the-process-with-hubspot-whatsapp-integration",
  "Business-Should-Adopt-Short-Form-Video-Messaging-on-WhatsApp-Web": "business-should-adopt-short-form-video-messaging-on-whatsapp-web",
  "10-tips-for-customer-service-on-whatsapp-in-2024": "10-tips-for-customer-service-on-whatsapp-in-2026",
  "how-to-prepare-for-the-future-2025-of-messaging": "how-to-prepare-for-the-future-2026-of-messaging",
  "how-to-use-whatsapp-web-login-in-2024": "how-to-use-whatsapp-web-login-in-2026",
  "top-10-whatsapp-web-chrome-extensions-for-2025": "top-10-whatsapp-web-chrome-extensions-for-2026",
  "top-5-whatsapp-marketing-tools-you-should-be-using-in-2025": "top-5-whatsapp-marketing-tools-you-should-be-using-in-2026",
  "upgrade-your-whatsapp-usage-with-these-must-have-extensions-for-2023": "upgrade-your-whatsapp-usage-with-these-must-have-extensions-for-2026",
  "what-are-the-most-famous-whatsapp-chrome-extensions-for-2025": "what-are-the-most-famous-whatsapp-chrome-extensions-for-2026",
};

// Feature page redirects (old slug -> new slug)
const featureRedirects = {
  "hubspot-integration-with-whatsApp": "hubspot-integration-with-whatsapp",
};


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
