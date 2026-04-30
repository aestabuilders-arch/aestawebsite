import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === 'meta') {
      const map: Record<string, string> = { siteName: 'AESTA — Architects & Builders' };
      return map[key] ?? key;
    }
    if (namespace === 'footer') {
      const map: Record<string, string> = {
        services: 'Services',
        locations: 'Locations',
        resources: 'Resources',
        contact: 'Contact',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        whatsapp: 'WhatsApp',
        privacy: 'Privacy',
        terms: 'Terms',
        rights: 'All rights reserved.',
        blog: 'Blog',
        press: 'Press',
        reviews: 'Reviews',
      };
      return map[key] ?? key;
    }
    return key;
  },
  useLocale: () => 'en-IN',
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders as a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows the four heading columns', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Locations' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders a tel: phone link and a mailto: email link', () => {
    render(<Footer />);
    const tel = screen.getByRole('link', { name: /Phone/ });
    expect(tel.getAttribute('href')).toMatch(/^tel:\+/);
    const email = screen.getByRole('link', { name: /Email/ });
    expect(email.getAttribute('href')).toMatch(/^mailto:/);
  });

  it('renders a wa.me WhatsApp link', () => {
    render(<Footer />);
    const wa = screen.getByRole('link', { name: /WhatsApp/ });
    expect(wa.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);
  });

  it('renders Privacy and Terms links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/legal/privacy');
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/legal/terms');
  });
});
