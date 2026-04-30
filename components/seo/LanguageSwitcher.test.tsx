import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as React from 'react';

let mockLocale = 'en-IN';
let mockPathname = '/services';

vi.mock('next-intl', () => ({
  useLocale: () => mockLocale,
}));

// Override the global @/i18n/navigation mock so we can vary pathname per case.
// next-intl's usePathname returns the locale-stripped pathname (e.g. /services,
// not /ta-IN/services), so we mirror that. The mock Link prefixes the active
// locale prop the same way createSharedPathnamesNavigation would in production.
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    locale,
    children,
    ...rest
  }: { href: string; locale?: string } & Record<string, unknown>) => {
    const prefix = locale === 'ta-IN' ? '/ta-IN' : '';
    const finalHref = href === '/' ? prefix || '/' : `${prefix}${href}`;
    return React.createElement('a', { ...rest, href: finalHref }, children as React.ReactNode);
  },
  usePathname: () => mockPathname,
}));

import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    cleanup();
  });

  it('on en-IN page: renders alternate link to /ta-IN/<path>', () => {
    mockLocale = 'en-IN';
    mockPathname = '/services';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /தமிழ்/ });
    expect(link).toHaveAttribute('href', '/ta-IN/services');
  });

  it('on en-IN homepage: alternate link is /ta-IN', () => {
    mockLocale = 'en-IN';
    mockPathname = '/';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /தமிழ்/ });
    expect(link).toHaveAttribute('href', '/ta-IN');
  });

  it('on ta-IN page: alternate link strips the /ta-IN prefix (default locale has no prefix)', () => {
    mockLocale = 'ta-IN';
    mockPathname = '/services';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /English/ });
    expect(link).toHaveAttribute('href', '/services');
  });

  it('on ta-IN homepage: alternate link is /', () => {
    mockLocale = 'ta-IN';
    mockPathname = '/';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /English/ });
    expect(link).toHaveAttribute('href', '/');
  });

  it('shows the current locale label as static text (not a link)', () => {
    mockLocale = 'en-IN';
    mockPathname = '/';
    render(<LanguageSwitcher />);
    expect(screen.getByText('English')).toBeInTheDocument();
    const englishElements = screen.queryAllByRole('link', { name: /^English$/ });
    expect(englishElements).toHaveLength(0);
  });
});
