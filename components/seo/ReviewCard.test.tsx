import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';

const review = {
  authorName: 'Karthik R',
  authorLocation: 'Alangudi',
  rating: 5 as const,
  quote: 'Excellent work, finished on time, transparent throughout.',
  source: 'gbp' as const,
  date: '2025-12-04',
};

describe('ReviewCard', () => {
  it('renders author name, quote, and rating stars', () => {
    render(<ReviewCard {...review} />);
    expect(screen.getByText('Karthik R')).toBeInTheDocument();
    expect(screen.getByText(/Excellent work/)).toBeInTheDocument();
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
  });

  it('shows the platform-source badge label', () => {
    render(<ReviewCard {...review} />);
    expect(screen.getByText(/Google/i)).toBeInTheDocument();
  });

  it('shows author location when provided', () => {
    render(<ReviewCard {...review} />);
    expect(screen.getByText(/Alangudi/)).toBeInTheDocument();
  });

  it('emits Review JSON-LD when withSchema=true', () => {
    const { container } = render(<ReviewCard {...review} withSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('Review');
    expect(data.author.name).toBe('Karthik R');
    expect(data.reviewRating.ratingValue).toBe(5);
    expect(data.reviewBody).toContain('Excellent');
    expect(data.datePublished).toBe('2025-12-04');
  });

  it('does NOT emit JSON-LD by default (parent aggregates)', () => {
    const { container } = render(<ReviewCard {...review} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('maps each known source to a friendly label', () => {
    const { rerender } = render(<ReviewCard {...review} source="justdial" />);
    expect(screen.getByText('JustDial')).toBeInTheDocument();
    rerender(<ReviewCard {...review} source="houzz" />);
    expect(screen.getByText('Houzz')).toBeInTheDocument();
    rerender(<ReviewCard {...review} source="facebook" />);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });
});
