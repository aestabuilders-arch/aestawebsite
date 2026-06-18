import { describe, it, expect, vi, afterEach } from 'vitest';
import { NAP, getPhoneLink, getWhatsAppLink, getMailtoLink } from './nap';

describe('NAP', () => {
  it('has required business identity fields', () => {
    expect(NAP.name).toBeTruthy();
    expect(NAP.phone).toMatch(/^\+\d{1,3}-?\d+/);
    expect(NAP.whatsapp).toMatch(/^\+\d{1,3}-?\d+/);
    expect(NAP.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    expect(NAP.foundedYear).toBe(2010);
    expect(NAP.areaServed.length).toBeGreaterThanOrEqual(17);
  });

  it('provides a telephone URI', () => {
    expect(getPhoneLink()).toMatch(/^tel:\+\d+/);
    expect(getPhoneLink()).not.toContain(' ');
    expect(getPhoneLink()).not.toContain('-');
  });

  it('provides a wa.me URL with no leading +', () => {
    expect(getWhatsAppLink()).toMatch(/^https:\/\/wa\.me\/\d+/);
  });

  it('provides a wa.me URL with an optional prefilled message', () => {
    const url = getWhatsAppLink('Hello from website');
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(url.split('?text=')[1])).toBe('Hello from website');
  });

  it('provides a mailto URL', () => {
    expect(getMailtoLink()).toMatch(/^mailto:[^@]+@[^@]+\.[^@]+$/);
  });

  it('siteUrl has no surrounding or embedded whitespace', () => {
    expect(NAP.siteUrl).toBe(NAP.siteUrl.trim());
    expect(NAP.siteUrl).not.toMatch(/\s/);
  });
});

describe('NAP env hygiene', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('trims a trailing newline from a dashboard-polluted NEXT_PUBLIC_SITE_URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.test\n');
    vi.resetModules();
    const fresh = await import('./nap');
    expect(fresh.NAP.siteUrl).toBe('https://example.test');
    expect(fresh.NAP.siteUrl).not.toMatch(/\s/);
  });

  it('falls back to the default when the env var is blank/whitespace-only', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '   ');
    vi.resetModules();
    const fresh = await import('./nap');
    expect(fresh.NAP.siteUrl).toBe('https://aesta.co.in');
  });
});
