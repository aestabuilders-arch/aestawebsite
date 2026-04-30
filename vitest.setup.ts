import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { vi } from 'vitest';

// Globally mock the locale-aware navigation helpers so component tests don't have
// to bring in the full next-intl runtime. Mirrors createSharedPathnamesNavigation
// behavior with localePrefix='as-needed' (en-IN is default → no prefix).
// Tests that need a specific pathname can override this mock at the file level.
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, locale, children, ...rest }: { href: string; locale?: string } & Record<string, unknown>) => {
    const prefix = locale === 'ta-IN' ? '/ta-IN' : '';
    const finalHref = href === '/' ? prefix || '/' : `${prefix}${href}`;
    return React.createElement('a', { ...rest, href: finalHref }, children as React.ReactNode);
  },
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  redirect: vi.fn(),
}));
