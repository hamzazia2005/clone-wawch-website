import { NextResponse } from 'next/server';

export function middleware(request) {
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
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/features', '/features/', '/:lang/features', '/:lang/features/'],
};
