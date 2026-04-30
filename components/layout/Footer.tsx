import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NAP, getPhoneLink, getMailtoLink, getWhatsAppLink } from '@/lib/constants/nap';
import { LanguageSwitcher } from '@/components/seo/LanguageSwitcher';

// English-only labels for v0. Per-service translation keys are added in Plan 3c
// when service pages are built; the Footer will swap to t('services.<slug>') then.
const SERVICE_LINKS = [
  { href: '/services/residential-construction', label: 'Residential Construction' },
  { href: '/services/commercial-construction', label: 'Commercial Construction' },
  { href: '/services/architectural-design', label: 'Architectural Design' },
  { href: '/services/interior-design', label: 'Interior Design' },
  { href: '/services/renovation', label: 'Renovation' },
  { href: '/services/turnkey-homes', label: 'Turnkey Homes' },
] as const;

export function Footer() {
  const tFooter = useTranslations('footer');
  const tMeta = useTranslations('meta');
  const year = new Date().getFullYear();

  const tier1Cities = NAP.areaServed.filter((c) => c.tier === 1);

  return (
    <footer className="border-t border-neutral-200 bg-limestone-100" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold">{tFooter('services')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{tFooter('locations')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              {tier1Cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/locations/${city.slug}`} className="hover:underline">
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="hover:underline">
                  All locations →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{tFooter('resources')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>
                <Link href="/resources" className="hover:underline">
                  {tFooter('blog')}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:underline">
                  {tFooter('reviews')}
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:underline">
                  {tFooter('press')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{tFooter('contact')}</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>
                <span className="font-medium">{tFooter('address')}: </span>
                {NAP.address.addressLocality}, {NAP.address.addressRegion}
              </li>
              <li>
                <a href={getPhoneLink()} className="hover:underline">
                  <span className="font-medium">{tFooter('phone')}: </span>
                  {NAP.phone}
                </a>
              </li>
              <li>
                <a href={getMailtoLink()} className="hover:underline">
                  <span className="font-medium">{tFooter('email')}: </span>
                  {NAP.email}
                </a>
              </li>
              <li>
                <a href={getWhatsAppLink()} className="hover:underline">
                  <span className="font-medium">{tFooter('whatsapp')}: </span>
                  {NAP.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center">
          <div>
            © {year} {tMeta('siteName')}. {tFooter('rights')}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:underline">
              {tFooter('privacy')}
            </Link>
            <Link href="/legal/terms" className="hover:underline">
              {tFooter('terms')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
