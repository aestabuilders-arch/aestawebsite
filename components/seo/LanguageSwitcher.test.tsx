import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

let mockLocale = 'en-IN';
let mockPathname = '/services';

vi.mock('next-intl', () => ({
  useLocale: () => mockLocale,
}));

vi.mock('next/navigation', () => ({
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
    mockPathname = '/ta-IN/services';
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: /English/ });
    expect(link).toHaveAttribute('href', '/services');
  });

  it('on ta-IN homepage: alternate link is /', () => {
    mockLocale = 'ta-IN';
    mockPathname = '/ta-IN';
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
