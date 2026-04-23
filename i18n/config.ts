export const locales = ['en-IN', 'ta-IN'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-IN';

export const localePrefix = 'as-needed' as const;

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
