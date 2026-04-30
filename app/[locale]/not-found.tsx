import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-terracotta-600">404</p>
      <h1 className="text-4xl font-bold text-charcoal-900 md:text-5xl">{t('title')}</h1>
      <p className="mt-4 text-lg text-neutral-700">{t('subtitle')}</p>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-terracotta-600 px-5 py-3 text-sm font-medium text-white hover:bg-terracotta-700"
        >
          ← {t('back')}
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600">
          {t('popular')}
        </h2>
        <ul className="space-y-2 text-base">
          <li>
            <Link href="/services" className="text-terracotta-600 hover:underline">
              {t('services')}
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-terracotta-600 hover:underline">
              {t('pricing')}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-terracotta-600 hover:underline">
              {t('contact')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
