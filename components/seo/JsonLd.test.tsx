import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('renders a script tag with type application/ld+json', () => {
    const { container } = render(
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Thing' }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it('serializes the data as JSON inside the script tag', () => {
    const { container } = render(
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Thing', name: 'X' }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain('"name":"X"');
  });

  it('escapes < to avoid breaking out of the script tag', () => {
    const { container } = render(
      <JsonLd
        data={{ '@context': 'https://schema.org', '@type': 'Thing', name: '</script><b>x' }}
      />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).not.toContain('</script>');
    expect(script?.textContent).toContain('\\u003c/script>\\u003cb');
  });
});
