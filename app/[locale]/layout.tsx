import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Fraunces, Noto_Sans_Tamil, Hind_Madurai } from 'next/font/google';
import { isValidLocale, type Locale, locales } from '@/i18n/config';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildOrganization } from '@/lib/schema/organization';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  variable: '--font-tamil',
  display: 'swap',
});

const hindMadurai = Hind_Madurai({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tamil-display',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('siteName'),
    description: t('tagline'),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale as Locale}
      className={`${inter.variable} ${fraunces.variable} ${notoTamil.variable} ${hindMadurai.variable}`}
    >
      <body className="bg-limestone-50 text-charcoal-900 antialiased">
        <JsonLd data={buildOrganization()} />
        <NextIntlClientProvider messages={messages}>
          <SkipToContent />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
