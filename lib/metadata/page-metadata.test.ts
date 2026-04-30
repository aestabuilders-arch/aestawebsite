import { describe, it, expect } from 'vitest';
import { buildPageMetadata } from './page-metadata';

describe('buildPageMetadata', () => {
  it('produces title and description from inputs', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/services',
      title: 'Our Services',
      description: 'Eight construction services across Tamil Nadu.',
    });
    expect(m.title).toBe('Our Services');
    expect(m.description).toContain('Tamil Nadu');
  });

  it('canonical URL omits prefix for default locale (en-IN)', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/services',
      title: 'X',
    });
    expect(m.alternates?.canonical).toMatch(/\/services$/);
    expect(m.alternates?.canonical).not.toContain('/en-IN/');
  });

  it('canonical URL prefixes /ta-IN for non-default locale', () => {
    const m = buildPageMetadata({
      locale: 'ta-IN',
      pathname: '/services',
      title: 'X',
    });
    expect(m.alternates?.canonical).toMatch(/\/ta-IN\/services$/);
  });

  it('emits hreflang alternates for both locales', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/services',
      title: 'X',
    });
    expect(m.alternates?.languages).toMatchObject({
      'en-IN': expect.stringMatching(/\/services$/),
      'ta-IN': expect.stringMatching(/\/ta-IN\/services$/),
    });
  });

  it('homepage canonical is bare site URL for en-IN', () => {
    const m = buildPageMetadata({ locale: 'en-IN', pathname: '/', title: 'Home' });
    expect(m.alternates?.canonical).not.toContain('/services');
    expect(m.alternates?.canonical).toMatch(/^https?:\/\/[^/]+\/?$/);
  });
});
