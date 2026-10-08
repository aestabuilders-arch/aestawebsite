import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatLeadText, notifyNewLead, type LeadAlert } from './notify';

const lead: LeadAlert = {
  source: 'quote_form',
  name: 'Ravi Kumar',
  phone: '+91 98765 43210',
  city: 'Pudukkottai',
  projectType: 'New house',
  message: 'G+1, 1800 sqft',
  page: '/locations/pudukkottai',
  saved: true,
};

describe('formatLeadText', () => {
  it('includes name, phone, city, project type, message and page', () => {
    const text = formatLeadText(lead);
    for (const part of [
      'Ravi Kumar',
      '+91 98765 43210',
      'Pudukkottai',
      'New house',
      'G+1, 1800 sqft',
      '/locations/pudukkottai',
    ]) {
      expect(text).toContain(part);
    }
  });

  it('adds a one-tap WhatsApp reply link built from the phone digits', () => {
    expect(formatLeadText(lead)).toContain('https://wa.me/919876543210');
  });

  it('assumes an Indian number when the visitor types 10 digits', () => {
    expect(formatLeadText({ ...lead, phone: '98765 43210' })).toContain(
      'https://wa.me/919876543210',
    );
  });

  it('warns loudly when the database insert failed', () => {
    expect(formatLeadText({ ...lead, saved: false })).toMatch(/NOT saved/);
  });

  it('omits empty optional fields', () => {
    const text = formatLeadText({ source: 'contact_form', name: 'A', phone: '9', saved: true });
    expect(text).not.toContain('City:');
    expect(text).not.toContain('undefined');
  });
});

describe('notifyNewLead', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('does nothing (and reports nothing delivered) when no channel is configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('TELEGRAM_BOT_TOKEN', '');
    vi.stubEnv('TELEGRAM_CHAT_ID', '');
    const result = await notifyNewLead(lead);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toEqual({ email: 'skipped', telegram: 'skipped' });
  });

  it('sends to both Resend and Telegram when both are configured', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('LEAD_NOTIFY_EMAIL', 'owner@example.com');
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'bot123');
    vi.stubEnv('TELEGRAM_CHAT_ID', '42');
    const result = await notifyNewLead(lead);

    const urls = fetchMock.mock.calls.map((c) => String(c[0]));
    expect(urls).toContain('https://api.resend.com/emails');
    expect(urls).toContain('https://api.telegram.org/botbot123/sendMessage');

    const resendCall = fetchMock.mock.calls.find((c) => String(c[0]).includes('resend'))!;
    const body = JSON.parse((resendCall[1] as RequestInit).body as string);
    expect(body.to).toEqual(['owner@example.com']);
    expect(body.subject).toContain('Ravi Kumar');

    expect(result).toEqual({ email: 'sent', telegram: 'sent' });
  });

  it('never throws when a channel fails — reports the failure instead', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'bot123');
    vi.stubEnv('TELEGRAM_CHAT_ID', '42');
    fetchMock.mockImplementation(async (url: string) => {
      if (String(url).includes('resend')) throw new Error('network down');
      return new Response('bad', { status: 500 });
    });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await notifyNewLead(lead);
    expect(result).toEqual({ email: 'failed', telegram: 'failed' });
    spy.mockRestore();
  });
});
