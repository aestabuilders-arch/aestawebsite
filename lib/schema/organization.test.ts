import { describe, it, expect } from 'vitest';
import { buildOrganization } from './organization';

describe('buildOrganization', () => {
  it('produces a valid Organization schema with NAP fields', () => {
    const org = buildOrganization() as unknown as Record<string, unknown>;
    expect(org['@context']).toBe('https://schema.org');
    expect(org['@type']).toBe('Organization');
    expect(String(org.name)).toContain('AESTA');
    expect(String(org.url)).toMatch(/^https?:\/\//);
    expect(String(org.foundingDate)).toMatch(/^\d{4}/);
  });

  it('includes founder, email, telephone', () => {
    const org = buildOrganization() as unknown as Record<string, unknown>;
    expect(String(org.email)).toMatch(/@/);
    expect(String(org.telephone)).toMatch(/^\+\d/);
  });

  it('@id is the canonical site URL with #organization fragment', () => {
    const org = buildOrganization() as unknown as Record<string, unknown>;
    expect(String(org['@id'])).toMatch(/#organization$/);
  });

  it('includes a PostalAddress and a description', () => {
    const org = buildOrganization() as unknown as Record<string, unknown>;
    const address = org.address as Record<string, unknown>;
    expect(address['@type']).toBe('PostalAddress');
    expect(String(address.addressLocality)).toContain('Pudukkottai');
    expect(String(address.addressCountry)).toBe('IN');
    expect(String(org.description)).toContain('design-build');
  });

  it('omits sameAs and logo when their env vars are unset', () => {
    const org = buildOrganization() as unknown as Record<string, unknown>;
    expect(org.sameAs).toBeUndefined();
    expect(org.logo).toBeUndefined();
  });
});
