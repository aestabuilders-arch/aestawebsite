import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      siteName: 'AESTA — Architects & Builders',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      locations: 'Locations',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Get Free Quote',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    };
    return map[key] ?? key;
  },
  useLocale: () => 'en-IN',
}));

import { Header } from './Header';

describe('Header', () => {
  it('renders the AESTA wordmark linked to /', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /AESTA/ });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all six nav items in desktop nav', () => {
    render(<Header />);
    const desktopNav = screen.getByRole('navigation', { name: /primary/i });
    expect(desktopNav).toBeInTheDocument();
    for (const label of ['Services', 'Projects', 'Pricing', 'Locations', 'About', 'Contact']) {
      const links = screen.getAllByRole('link', { name: label });
      expect(links.length).toBeGreaterThan(0);
    }
  });

  it('renders a Get Quote CTA linked to /quote', () => {
    render(<Header />);
    const cta = screen.getByRole('link', { name: /Get Free Quote/ });
    expect(cta).toHaveAttribute('href', '/quote');
  });

  it('includes the language switcher (alternate locale link visible)', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /தமிழ்/ })).toBeInTheDocument();
  });

  it('renders as a banner landmark', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
