import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('meta');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">{t('siteName')}</h1>
      <p className="mt-4 text-lg text-neutral-600">{t('tagline')}</p>
      <p className="mt-8 text-sm text-neutral-400">Scaffold OK · Plan 1 complete</p>
    </main>
  );
}
