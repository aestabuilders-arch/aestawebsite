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
});
