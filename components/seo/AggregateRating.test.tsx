import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AggregateRating } from './AggregateRating';

describe('AggregateRating', () => {
  it('renders the average and count visually', () => {
    render(<AggregateRating average={4.7} count={32} />);
    expect(screen.getByText(/4\.7/)).toBeInTheDocument();
    expect(screen.getByText(/32 reviews/)).toBeInTheDocument();
  });

  it('emits AggregateRating JSON-LD when count >= 3', () => {
    const { container } = render(<AggregateRating average={4.7} count={32} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('AggregateRating');
    expect(data.ratingValue).toBe(4.7);
    expect(data.reviewCount).toBe(32);
    expect(data.bestRating).toBe(5);
    expect(data.worstRating).toBe(1);
    expect(data.itemReviewed).toBeDefined();
  });

  it('does NOT emit JSON-LD when count < 3 (avoid review-spam flagging)', () => {
    const { container } = render(<AggregateRating average={5} count={2} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('still renders visually even when count < 3', () => {
    render(<AggregateRating average={5} count={2} />);
    expect(screen.getByText(/2 reviews/)).toBeInTheDocument();
  });

  it('clamps average to one decimal place in JSON-LD', () => {
    const { container } = render(<AggregateRating average={4.6789} count={10} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data.ratingValue).toBe(4.7);
  });
});
