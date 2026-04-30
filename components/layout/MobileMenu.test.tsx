import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      locations: 'Locations',
      about: 'About',
      contact: 'Contact',
    };
    return map[key] ?? key;
  },
}));

import { MobileMenu } from './MobileMenu';

afterEach(() => cleanup());

describe('MobileMenu', () => {
  it('renders the hamburger button collapsed by default', () => {
    render(<MobileMenu />);
    const button = screen.getByRole('button', { name: /Open menu/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: /mobile/i })).toBeNull();
  });

  it('opens the drawer when the hamburger is clicked', () => {
    render(<MobileMenu />);
    const button = screen.getByRole('button', { name: /Open menu/ });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Close menu/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
  });

  it('renders all six nav links inside the open drawer', () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByRole('button', { name: /Open menu/ }));
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Locations' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('closes the drawer on Escape key', () => {
    render(<MobileMenu />);
    fireEvent.click(screen.getByRole('button', { name: /Open menu/ }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('navigation', { name: /mobile/i })).toBeNull();
  });
});
