import { describe, it, expect } from 'vitest';
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
});
