import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!isValidLocale(locale)) notFound();
  const messages = (await import(`./messages/${locale}.json`)).default;
  return {
    messages,
    timeZone: 'Asia/Kolkata',
    now: new Date(),
  };
});
