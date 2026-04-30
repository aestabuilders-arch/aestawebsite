import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PRIMARY_NAV } from '@/lib/nav/primary-nav';
import { LanguageSwitcher } from '@/components/seo/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const tMeta = useTranslations('meta');
  const tNav = useTranslations('nav');
  const tCta = useTranslations('cta');

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-limestone-50/95 backdrop-blur supports-[backdrop-filter]:bg-limestone-50/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          aria-label={tMeta('siteName')}
          className="font-serif text-2xl font-bold tracking-tight text-charcoal-900"
        >
          AESTA
        </Link>
        <nav aria-label="primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-charcoal-900 hover:text-terracotta-600"
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/quote"
            className="hidden items-center rounded-md bg-terracotta-600 px-4 py-2 text-sm font-medium text-white hover:bg-terracotta-700 md:inline-flex"
          >
            {tCta('getQuote')}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
