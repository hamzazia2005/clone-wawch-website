const countryToLanguageMap = {
  'AE': 'ar', // UAE
  'BR': 'pt', // Brazil
  'EG': 'ar', // Egypt
  'ID': 'en', // Indonesia
  'IN': 'en', // India
  'MY': 'en', // Malaysia
  'PK': 'en', // Pakistan
  'QA': 'ar', // Qatar
  'SA': 'ar', // Saudi Arabia
  'FR': 'fr', // France
  'PT': 'pt', // Portugal
  
  // Default to English for all other countries
};

export function getLanguageFromCountry(countryCode) {
  if (!countryCode) return 'en';
  return countryToLanguageMap[countryCode.toUpperCase()] || 'en';
}

export async function detectLanguageFromIP() {
  try {
    const response = await fetch(
      `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch IP info');
    }
    
    const data = await response.json();
    const countryCode = data.country;
    
    return getLanguageFromCountry(countryCode);
  } catch (error) {
    console.error('Error detecting language from IP:', error);
    return 'en'; 
  }
}

export function shouldExcludeFromLanguageRedirect(pathname) {
  const englishOnlyPages = [
    '/blog',
    '/author',
  ];
  
  for (const page of englishOnlyPages) {
    if (pathname === page || pathname.startsWith(`${page}/`)) {
      return true;
    }
  }
  
  return false;
}

export function shouldSkipLanguageDetection(pathname) {
  // Skip if already on a language-specific route
  if (pathname.match(/^\/[a-z]{2}\//)) {
    return true;
  }

  // Skip API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return true;
  }

  // Skip pages that should be excluded from language redirect
  if (shouldExcludeFromLanguageRedirect(pathname)) {
    return true;
  }

  return false;
}

export function shouldRedirectToLanguage(pathname, detectedLanguage) {
  // Use the comprehensive skip function to check all conditions
  if (shouldSkipLanguageDetection(pathname)) {
    return null;
  }
  
  // Don't redirect if on root path and language is English (default)
  if (pathname === '/' && detectedLanguage === 'en') {
    return null;
  }
  
  // Don't redirect if already on the correct language route
  if (pathname.startsWith(`/${detectedLanguage}/`)) {
    return null;
  }
  
  if (detectedLanguage !== 'en') {
    return `/${detectedLanguage}${pathname === '/' ? '' : pathname}`;
  }
  
  return null;
}
