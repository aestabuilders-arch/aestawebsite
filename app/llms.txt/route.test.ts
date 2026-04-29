import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /llms.txt', () => {
  it('returns text/plain content', async () => {
    const res = await GET();
    expect(res.headers.get('content-type')).toContain('text/plain');
  });

  it('starts with the AESTA name as the H1', async () => {
    const res = await GET();
    const body = await res.text();
    const firstLine = body.split('\n')[0];
    expect(firstLine).toMatch(/^# AESTA/);
  });

  it('includes a Summary section', async () => {
    const res = await GET();
    const body = await res.text();
    expect(body).toMatch(/^> /m);
  });

  it('includes at least one canonical-content section', async () => {
    const res = await GET();
    const body = await res.text();
    expect(body).toMatch(/^## /m);
  });
});
