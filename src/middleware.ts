import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserLanguage } from './app/enums/LangEnum';

export function middleware(request: NextRequest) {
  const SUPPORTED_LANGUAGES = Object.values(UserLanguage);

  // Izuzmi sitemap.xml iz middleware-a
  if (request.nextUrl.pathname === '/sitemap.xml' || request.nextUrl.pathname.startsWith('/hr/sitemap.xml')) {
    return NextResponse.next();
  }

  // Ako je URL osnovni ("/")
  if (request.nextUrl.pathname === '/') {
    const userLangFromCookie = request.cookies.get('@sutra-user-lang')?.value;

    // Provjeri postoji li kolačić s jezikom
    if (userLangFromCookie && SUPPORTED_LANGUAGES.includes(userLangFromCookie as UserLanguage)) {
      return NextResponse.redirect(new URL(`/${userLangFromCookie}`, request.url));
    }

    // Ako nema kolačića, provjeri Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferredLang = acceptLanguage.split(',')[0].split('-')[0]; // uzmi prvi preferirani jezik
      const mappedLang = SUPPORTED_LANGUAGES.find((lang) => lang.startsWith(preferredLang));

      // Ako je pronađen preferirani jezik, preusmjeri na odgovarajući URL
      if (mappedLang) {
        return NextResponse.redirect(new URL(`/${mappedLang}`, request.url));
      }
    }

    // Ako ništa nije pronađeno, preusmjeri na 'hr'
    return NextResponse.redirect(new URL('/hr', request.url));
  }

  // Ako nije osnovna putanja, provjeri validnost jezika u putanji
  const pathSegments = request.nextUrl.pathname.split('/');
  const lang = pathSegments[1];

  // Ako jezik nije podržan, preusmjeri na 'hr'
  if (!SUPPORTED_LANGUAGES.includes(lang as UserLanguage)) {
    return NextResponse.redirect(new URL('/hr', request.url));
  }

  // Postavi jezik u kolačić samo ako još nije postavljen
  const userLangFromCookie = request.cookies.get('@sutra-user-lang')?.value;
  if (!userLangFromCookie) {
    const response = NextResponse.next();
    response.cookies.set('@sutra-user-lang', lang);
    return response;
  }

  return NextResponse.next();
}

// Konfigurirajte middleware da presreće osnovni URL ("/")
export const config = {
  matcher: '/((?!api|_next|static|favicon.*|sitemap.xml|images/).*)',
};
