import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from './config';

// Locale-aware navigation primitives. Using these instead of `next/link` and
// `next/navigation` ensures every internal link respects the active locale —
// e.g. <Link href="/about" /> on the Tamil site renders /ta-IN/about, and
// usePathname() returns /about (without the locale prefix).
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
