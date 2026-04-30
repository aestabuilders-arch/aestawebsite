import { useTranslations } from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('layout');
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-charcoal-900 focus:px-4 focus:py-2 focus:text-white"
    >
      {t('skipToContent')}
    </a>
  );
}
