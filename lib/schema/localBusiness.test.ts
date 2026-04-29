import { describe, it, expect } from 'vitest';
import { buildLocalBusiness } from './localBusiness';

describe('buildLocalBusiness', () => {
  it('produces a valid LocalBusiness schema with geo fields', () => {
    const lb = buildLocalBusiness({
      cityName: 'Pudukkottai',
      cityNameTa: 'புதுக்கோட்டை',
      lat: 10.3833,
      lng: 78.8001,
    }) as unknown as Record<string, unknown>;
    expect(lb['@context']).toBe('https://schema.org');
    expect(lb['@type']).toBe('LocalBusiness');
    expect(String(lb.name)).toContain('AESTA');
    expect(lb.address).toBeDefined();
    expect(lb.geo).toMatchObject({
      '@type': 'GeoCoordinates',
      latitude: 10.3833,
      longitude: 78.8001,
    });
  });

  it('areaServed is an array of cities, including the focus city', () => {
    const lb = buildLocalBusiness({
      cityName: 'Karaikudi',
      cityNameTa: 'காரைக்குடி',
      lat: 10.0667,
      lng: 78.7833,
    }) as unknown as Record<string, unknown>;
    const areaNames = (lb.areaServed as { name: string }[]).map((a) => a.name);
    expect(areaNames).toContain('Karaikudi');
  });

  it('@id contains the city slug for uniqueness across city pages', () => {
    const lb = buildLocalBusiness({
      cityName: 'Aranthangi',
      cityNameTa: 'அறந்தாங்கி',
      lat: 10.1667,
      lng: 78.9833,
      citySlug: 'aranthangi',
    }) as unknown as Record<string, unknown>;
    expect(String(lb['@id'])).toContain('aranthangi');
  });
});
