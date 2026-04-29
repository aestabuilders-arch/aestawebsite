import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FAQSection } from './FAQSection';

const items = [
  { question: 'What does a 1500 sqft G+1 house cost?', answer: 'Approximately ₹31–48 lakh.' },
  { question: 'Do you handle DTCP approvals?', answer: 'Yes, included in turnkey packages.' },
];

describe('FAQSection', () => {
  it('renders each question and answer visually', () => {
    render(<FAQSection items={items} />);
    expect(screen.getByText(/1500 sqft G\+1/)).toBeInTheDocument();
    expect(screen.getByText(/₹31–48 lakh/)).toBeInTheDocument();
    expect(screen.getByText(/DTCP approvals/)).toBeInTheDocument();
  });

  it('emits FAQPage JSON-LD with all questions', () => {
    const { container } = render(<FAQSection items={items} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(2);
    expect(data.mainEntity[0]['@type']).toBe('Question');
    expect(data.mainEntity[0].name).toContain('1500 sqft');
    expect(data.mainEntity[0].acceptedAnswer.text).toContain('₹31');
  });

  it('renders nothing (and emits no schema) when items array is empty', () => {
    const { container } = render(<FAQSection items={[]} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
    expect(container.querySelector('section')).toBeNull();
  });

  it('uses the provided heading when given', () => {
    render(<FAQSection items={items} heading="Frequently asked" />);
    expect(screen.getByRole('heading', { name: /Frequently asked/ })).toBeInTheDocument();
  });
});
