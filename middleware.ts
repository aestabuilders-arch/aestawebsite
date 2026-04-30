import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from './i18n/config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix,
  // English is the canonical experience at /. Tamil is opt-in via the language switcher.
  // Auto-detection from Accept-Language / NEXT_LOCALE cookie would otherwise force any
  // visitor with a Tamil-locale browser onto /ta-IN/ and lock them there via the cookie.
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
