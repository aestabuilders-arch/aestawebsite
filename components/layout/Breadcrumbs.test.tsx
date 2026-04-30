import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

const items = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Residential Construction', href: '/services/residential-construction' },
];

describe('Breadcrumbs', () => {
  it('renders all items as text', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Residential Construction')).toBeInTheDocument();
  });

  it('renders all but the last item as links', () => {
    render(<Breadcrumbs items={items} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/services');
  });

  it('the current (last) item has aria-current="page"', () => {
    render(<Breadcrumbs items={items} />);
    const current = screen.getByText('Residential Construction');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('emits BreadcrumbList JSON-LD with positions', () => {
    const { container } = render(<Breadcrumbs items={items} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement).toHaveLength(3);
    expect(data.itemListElement[0]).toMatchObject({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
    });
    expect(data.itemListElement[2].position).toBe(3);
  });

  it('returns null for empty items', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
