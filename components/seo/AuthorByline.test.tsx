import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthorByline } from './AuthorByline';

const author = {
  name: 'Hari Babu',
  credentials: 'B.Arch, NIT Trichy 2016',
  slug: 'hari-babu',
  photoUrl: 'https://aesta.co.in/team/hari.jpg',
};

describe('AuthorByline', () => {
  it('renders the author name and credentials', () => {
    render(<AuthorByline author={author} />);
    expect(screen.getByText('Hari Babu')).toBeInTheDocument();
    expect(screen.getByText(/B\.Arch, NIT Trichy 2016/)).toBeInTheDocument();
  });

  it('shows the photo when provided', () => {
    render(<AuthorByline author={author} />);
    const img = screen.getByRole('img', { name: /Hari Babu/ });
    expect(img).toHaveAttribute('src', author.photoUrl);
  });

  it('renders publishedAt date when provided', () => {
    render(<AuthorByline author={author} publishedAt="2026-04-29" />);
    expect(screen.getByText(/2026-04-29/)).toBeInTheDocument();
  });

  it('emits Person JSON-LD with @id linking to the author page', () => {
    const { container } = render(<AuthorByline author={author} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Hari Babu');
    expect(data.jobTitle).toContain('B.Arch');
    expect(data['@id']).toMatch(/\/about\/team\/hari-babu$/);
    expect(data.image).toBe(author.photoUrl);
  });
});
