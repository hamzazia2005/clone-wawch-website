const countryToLanguageMap = {
  'AE': 'ar', // UAE
  'SA': 'ar', // Saudi Arabia
  'EG': 'ar', // Egypt
  'QA': 'ar', // Qatar
  'KW': 'ar', // Kuwait
  'BH': 'ar', // Bahrain
  'OM': 'ar', // Oman
  'JO': 'ar', // Jordan
  'LB': 'ar', // Lebanon
  'SY': 'ar', // Syria
  'IQ': 'ar', // Iraq
  'LY': 'ar', // Libya
  'TN': 'ar', // Tunisia
  'DZ': 'ar', // Algeria
  'MA': 'ar', // Morocco
  'SD': 'ar', // Sudan
  'YE': 'ar', // Yemen
  'PS': 'ar', // Palestine
  'MR': 'ar', // Mauritania

  'BR': 'pt', // Brazil
  'PT': 'pt', // Portugal
  'AO': 'pt', // Angola
  'MZ': 'pt', // Mozambique
  'CV': 'pt', // Cape Verde
  'GW': 'pt', // Guinea-Bissau
  'ST': 'pt', // São Tomé and Príncipe
  'TL': 'pt', // East Timor

  'FR': 'fr', // France
  'BE': 'fr', // Belgium
  'LU': 'fr', // Luxembourg
  'MC': 'fr', // Monaco
  'SN': 'fr', // Senegal
  'CI': 'fr', // Ivory Coast
  'ML': 'fr', // Mali
  'BF': 'fr', // Burkina Faso
  'NE': 'fr', // Niger
  'TD': 'fr', // Chad
  'MG': 'fr', // Madagascar
  'CM': 'fr', // Cameroon
  'CD': 'fr', // Democratic Republic of Congo
  'CG': 'fr', // Republic of Congo
  'CF': 'fr', // Central African Republic
  'GA': 'fr', // Gabon
  
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
   // console.error('Error detecting language from IP:', error);
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

  if (shouldExcludeFromLanguageRedirect(pathname)) {
    return true;
  }

  return false;
}

export function shouldRedirectToLanguage(pathname, detectedLanguage) {
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
