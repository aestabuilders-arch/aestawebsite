import { describe, it, expect } from 'vitest';
import { buildLocalBusiness } from './localBusiness';

describe('buildLocalBusiness', () => {
  it('is a GeneralContractor located at the Pudukkottai office', () => {
    const lb = buildLocalBusiness() as unknown as Record<string, unknown>;
    expect(lb['@context']).toBe('https://schema.org');
    expect(lb['@type']).toBe('GeneralContractor');
    expect(String(lb.name)).toContain('AESTA');
    expect(lb.address).toMatchObject({ addressLocality: 'Pudukkottai', postalCode: '622001' });
    expect(lb.geo).toMatchObject({
      '@type': 'GeoCoordinates',
      latitude: 10.3833,
      longitude: 78.8001,
    });
    expect(lb.priceRange).toBeDefined();
  });

  it('uses one stable @id so every page describes the same entity', () => {
    const a = buildLocalBusiness() as unknown as Record<string, unknown>;
    const b = buildLocalBusiness({
      aggregateRating: { ratingValue: 5, reviewCount: 3 },
    }) as unknown as Record<string, unknown>;
    expect(a['@id']).toBe(b['@id']);
    expect(String(a['@id'])).toMatch(/#localbusiness$/);
  });

  it('areaServed lists the served cities', () => {
    const lb = buildLocalBusiness() as unknown as Record<string, unknown>;
    const areaNames = (lb.areaServed as { name: string }[]).map((a) => a.name);
    expect(areaNames).toEqual(expect.arrayContaining(['Pudukkottai', 'Karaikudi']));
  });

  it('nests aggregateRating only when there are reviews', () => {
    const none = buildLocalBusiness() as unknown as Record<string, unknown>;
    expect(none.aggregateRating).toBeUndefined();
    const some = buildLocalBusiness({
      aggregateRating: { ratingValue: 4.8, reviewCount: 12 },
    }) as unknown as Record<string, unknown>;
    expect(some.aggregateRating).toMatchObject({ ratingValue: 4.8, reviewCount: 12 });
  });
});
