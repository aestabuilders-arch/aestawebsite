import { describe, it, expect } from 'vitest';
import { PRIMARY_NAV, type NavItem } from './primary-nav';

describe('PRIMARY_NAV', () => {
  it('exposes all six top-level nav items in stable order', () => {
    expect(PRIMARY_NAV.map((i: NavItem) => i.href)).toEqual([
      '/services',
      '/projects',
      '/pricing',
      '/locations',
      '/about',
      '/contact',
    ]);
  });

  it('every item has a translation key under the nav namespace', () => {
    const keys = PRIMARY_NAV.map((i) => i.labelKey);
    expect(keys).toEqual(['services', 'projects', 'pricing', 'locations', 'about', 'contact']);
  });

  it('every href starts with /', () => {
    for (const item of PRIMARY_NAV) {
      expect(item.href.startsWith('/')).toBe(true);
    }
  });
});
