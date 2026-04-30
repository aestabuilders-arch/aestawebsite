import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('meta');
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-serif text-5xl font-bold text-charcoal-900 md:text-6xl">
        {t('siteName')}
      </h1>
      <p className="mt-4 text-xl text-neutral-700">{t('tagline')}</p>
      <p className="mt-12 text-sm text-neutral-500">
        Plan 3a complete · Header + Footer + 404 live · Plan 3b builds the real homepage next.
      </p>
    </section>
  );
}
