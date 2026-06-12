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

  it('includes an x-default hreflang pointing at the default-locale URL', () => {
    const m = buildPageMetadata({ locale: 'ta-IN', pathname: '/services', title: 'X' });
    const langs = m.alternates?.languages as Record<string, string>;
    expect(langs['x-default']).toMatch(/\/services$/);
    expect(langs['x-default']).not.toContain('/ta-IN/');
  });

  it('emits OpenGraph and Twitter cards with the canonical URL', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/pricing',
      title: 'Pricing',
      description: 'Rates',
    });
    expect(m.openGraph?.title).toBe('Pricing');
    expect((m.openGraph as { url?: string }).url).toMatch(/\/pricing$/);
    expect((m.openGraph as { locale?: string }).locale).toBe('en_IN');
    expect((m.twitter as { card?: string }).card).toBe('summary_large_image');
  });

  it('omits explicit images by default so the site-wide OG image applies', () => {
    const m = buildPageMetadata({ locale: 'en-IN', pathname: '/', title: 'Home' });
    expect((m.openGraph as { images?: unknown }).images).toBeUndefined();
  });

  it('uses an explicit ogImage and article type when provided', () => {
    const m = buildPageMetadata({
      locale: 'en-IN',
      pathname: '/projects/x',
      title: 'X',
      ogType: 'article',
      ogImage: 'https://aesta.co.in/cover.jpg',
    });
    expect((m.openGraph as { type?: string }).type).toBe('article');
    expect((m.openGraph as { images?: { url: string }[] }).images?.[0].url).toBe(
      'https://aesta.co.in/cover.jpg',
    );
    expect((m.twitter as { images?: string[] }).images?.[0]).toBe('https://aesta.co.in/cover.jpg');
  });
});
