import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessSteps } from './ProcessSteps';

const steps = [
  { name: 'Consult', text: 'Free initial consultation at site or office.' },
  { name: 'Design', text: 'Architectural plans, 3D visualizations, structural drawings.' },
  { name: 'Build', text: 'Daily site supervision, quality checks, transparent reporting.' },
];

describe('ProcessSteps', () => {
  it('renders each step name and description', () => {
    render(<ProcessSteps name="How we work" steps={steps} />);
    expect(screen.getByText('Consult')).toBeInTheDocument();
    expect(screen.getByText(/Free initial consultation/)).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
  });

  it('emits HowTo JSON-LD with numbered steps', () => {
    const { container } = render(<ProcessSteps name="How we work" steps={steps} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('HowTo');
    expect(data.name).toBe('How we work');
    expect(data.step).toHaveLength(3);
    expect(data.step[0]['@type']).toBe('HowToStep');
    expect(data.step[0].name).toBe('Consult');
    expect(data.step[0].position).toBe(1);
    expect(data.step[2].position).toBe(3);
  });

  it('renders nothing and emits no schema for empty steps', () => {
    const { container } = render(<ProcessSteps name="empty" steps={[]} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('renders the heading', () => {
    render(<ProcessSteps name="Eight-step journey" steps={steps} />);
    expect(screen.getByRole('heading', { name: /Eight-step journey/ })).toBeInTheDocument();
  });
});
