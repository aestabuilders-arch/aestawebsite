import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('vitest runs', () => {
    expect(1 + 1).toBe(2);
  });

  it('jsdom provides document', () => {
    expect(typeof document).toBe('object');
    expect(document.createElement('div')).toBeDefined();
  });
});
