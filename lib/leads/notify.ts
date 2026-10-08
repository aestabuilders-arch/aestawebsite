import { NAP } from '@/lib/constants/nap';

// Instant owner alerts for new website enquiries. Before this existed, leads
// were written to Supabase and nobody was told — an enquiry could sit unseen
// for days. Each channel is optional and configured purely by env vars, so a
// missing key silently skips that channel instead of breaking the form.
//
//   Email:    RESEND_API_KEY, LEAD_NOTIFY_EMAIL (default NAP.email),
//             LEAD_FROM_EMAIL (default Resend's onboarding sender)
//   Telegram: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

export type LeadAlert = {
  source: 'quote_form' | 'contact_form';
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  projectType?: string | null;
  details?: string | null;
  message?: string | null;
  page?: string | null;
  /** False when the Supabase insert failed — the alert is then the only record. */
  saved: boolean;
};

export type ChannelResult = 'sent' | 'skipped' | 'failed';

const TIMEOUT_MS = 5000;

const SOURCE_LABEL: Record<LeadAlert['source'], string> = {
  quote_form: 'Quote request',
  contact_form: 'Enquiry',
};

/** Visitors type numbers every which way; a bare 10-digit number is Indian. */
function toWhatsAppDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

export function formatLeadText(lead: LeadAlert): string {
  const lines = [
    `New ${SOURCE_LABEL[lead.source]} — aesta.co.in`,
    lead.saved ? null : '⚠ NOT saved to the database — this message is the only record.',
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.city ? `City: ${lead.city}` : null,
    lead.projectType ? `Project: ${lead.projectType}` : null,
    lead.details ? `Details: ${lead.details}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    lead.page ? `From page: ${lead.page}` : null,
    '',
    `Reply on WhatsApp: https://wa.me/${toWhatsAppDigits(lead.phone)}`,
    `Call: tel:${lead.phone.replace(/[^\d+]/g, '')}`,
  ];
  return lines.filter((l): l is string => l !== null).join('\n');
}

async function sendEmail(lead: LeadAlert, text: string): Promise<ChannelResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return 'skipped';
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || NAP.email;
  const from = process.env.LEAD_FROM_EMAIL?.trim() || 'AESTA Website <onboarding@resend.dev>';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New ${SOURCE_LABEL[lead.source]}: ${lead.name}${lead.city ? ` (${lead.city})` : ''}`,
        text,
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return 'sent';
  } catch (err) {
    console.error('[lead-notify] email failed', err);
    return 'failed';
  }
}

async function sendTelegram(text: string): Promise<ChannelResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return 'skipped';
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
    return 'sent';
  } catch (err) {
    console.error('[lead-notify] telegram failed', err);
    return 'failed';
  }
}

/**
 * Fans the lead out to every configured channel. Never throws: a failed alert
 * must not turn a successful enquiry into an error for the visitor.
 */
export async function notifyNewLead(
  lead: LeadAlert,
): Promise<{ email: ChannelResult; telegram: ChannelResult }> {
  const text = formatLeadText(lead);
  const [email, telegram] = await Promise.all([sendEmail(lead, text), sendTelegram(text)]);
  return { email, telegram };
}
