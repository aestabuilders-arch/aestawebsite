import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from './i18n/config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
