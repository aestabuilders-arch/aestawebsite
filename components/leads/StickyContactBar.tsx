'use client';

import { useTranslations } from 'next-intl';
import { track } from '@vercel/analytics';
import { Link, usePathname } from '@/i18n/navigation';
import { NAP, getPhoneLink, getWhatsAppLink } from '@/lib/constants/nap';

function cityFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(?:locations|guides)\/([^/]+)/);
  if (!match) return null;
  const slug = match[1];
  const city = NAP.areaServed.find((c) => slug === c.slug || slug.endsWith(`-${c.slug}`));
  return city ? city.name : null;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.32 11.32 0 0 0 5.43 1.38h.01c6.26 0 11.35-5.09 11.36-11.35 0-3.03-1.18-5.89-3.32-8.03" />
    </svg>
  );
}

/**
 * Always-visible contact affordances. Most local construction searches happen
 * on a phone, and before this the only call/WhatsApp links were buried in the
 * footer or below the fold. Mobile: fixed bottom bar. Desktop: floating
 * WhatsApp button.
 */
export function StickyContactBar() {
  const t = useTranslations('leads');
  const pathname = usePathname();
  const city = cityFromPath(pathname);
  const waLink = getWhatsAppLink(city ? t('waCity', { city }) : t('waDefault'));
  const onQuotePage = pathname.startsWith('/quote');

  return (
    <>
      {/* Spacer so the fixed bar never covers the footer on mobile. */}
      <div aria-hidden="true" className="h-16 lg:hidden" />

      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-neutral-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden"
      >
        <a
          href={getPhoneLink()}
          onClick={() => track('phone_click', { placement: 'sticky_bar', page: pathname })}
          className="flex h-16 flex-col items-center justify-center gap-0.5 text-sm font-semibold text-charcoal-900"
        >
          <span aria-hidden="true" className="flex h-6 items-center text-lg">
            📞
          </span>
          {t('call')}
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { placement: 'sticky_bar', page: pathname })}
          className="flex h-16 flex-col items-center justify-center gap-0.5 bg-[#25D366] text-sm font-semibold text-white"
        >
          <span className="flex h-6 items-center">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          {t('whatsapp')}
        </a>
        {onQuotePage ? (
          <a
            href="#main"
            className="flex h-16 flex-col items-center justify-center gap-0.5 bg-terracotta-600 text-sm font-semibold text-white"
          >
            <span aria-hidden="true" className="flex h-6 items-center text-lg">
              ✍
            </span>
            {t('quote')}
          </a>
        ) : (
          <Link
            href="/quote"
            onClick={() => track('quote_click', { placement: 'sticky_bar', page: pathname })}
            className="flex h-16 flex-col items-center justify-center gap-0.5 bg-terracotta-600 text-sm font-semibold text-white"
          >
            <span aria-hidden="true" className="flex h-6 items-center text-lg">
              ✍
            </span>
            {t('quote')}
          </Link>
        )}
      </nav>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp')}
        onClick={() => track('whatsapp_click', { placement: 'floating', page: pathname })}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 lg:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
