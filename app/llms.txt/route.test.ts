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

  it('surfaces NAP facts and per-sqft pricing for AI answers', async () => {
    const res = await GET();
    const body = await res.text();
    expect(body).toContain('Pudukkottai');
    expect(body).toMatch(/\+91/); // phone
    expect(body).toMatch(/₹[\d,]+/); // a rupee rate from the tier card
    expect(body).toContain('/guides/'); // cost guides are linked
  });
});
