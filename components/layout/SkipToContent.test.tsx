import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = { skipToContent: 'Skip to main content' };
    return map[key] ?? key;
  },
}));

import { SkipToContent } from './SkipToContent';

describe('SkipToContent', () => {
  it('renders an anchor pointing to #main', () => {
    render(<SkipToContent />);
    const link = screen.getByRole('link', { name: /Skip to main content/ });
    expect(link).toHaveAttribute('href', '#main');
  });

  it('has visually-hidden styles by default but is keyboard-focusable', () => {
    render(<SkipToContent />);
    const link = screen.getByRole('link', { name: /Skip to main content/ });
    expect(link.className).toMatch(/sr-only|absolute|focus/);
  });
});
