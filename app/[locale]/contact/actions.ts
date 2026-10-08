'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/utils/supabase/types';
import { notifyNewLead, type LeadAlert } from '@/lib/leads/notify';

export type LeadFormState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
};

type LeadInsert = Database['public']['Tables']['leads']['Insert'];

const FAILURE_MESSAGE = 'Sorry, something went wrong. Please try WhatsApp or call us instead.';

function field(formData: FormData, key: string, max = 200): string {
  return String(formData.get(key) ?? '')
    .trim()
    .slice(0, max);
}

// Hidden fields filled client-side by <LeadContextFields />: which page the
// enquiry came from and any campaign UTM tags, so we know what is working.
function leadContext(formData: FormData) {
  return {
    page: field(formData, 'page', 300) || null,
    utm_source: field(formData, 'utm_source') || null,
    utm_medium: field(formData, 'utm_medium') || null,
    utm_campaign: field(formData, 'utm_campaign') || null,
  };
}

// Bots fill every input, including the visually-hidden "website" trap. Humans
// never see it. Pretend success so the bot learns nothing.
function isBot(formData: FormData): boolean {
  return field(formData, 'website') !== '';
}

// A callable number has at least 10 digits (Indian mobile, or any number with a
// country code — NRI clients included). Most overseas marketing spam that
// reached the form used 8–9 digit numbers.
const PHONE_MESSAGE = 'Please enter a 10-digit mobile number so we can call you back.';
function isCallable(phone: string): boolean {
  return phone.replace(/\D/g, '').length >= 10;
}

/**
 * Saves the lead and alerts the owner. The alert goes out even if the insert
 * fails, so a database outage can never silently swallow an enquiry; the
 * visitor only sees an error when the lead reached neither place.
 */
async function recordLead(row: LeadInsert, alert: Omit<LeadAlert, 'saved'>): Promise<boolean> {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('leads').insert({ ...row, status: 'new' });
  if (error) console.error('[lead] supabase insert failed', error);

  const delivered = await notifyNewLead({ ...alert, saved: !error });
  const alerted = delivered.email === 'sent' || delivered.telegram === 'sent';
  return !error || alerted;
}

export async function submitContactLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (isBot(formData)) return { status: 'success', message: 'Thanks — we received your message.' };

  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const email = field(formData, 'email', 254);
  const city = field(formData, 'city');
  const projectType = field(formData, 'project_type', 100);
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !phone) {
    return { status: 'error', message: 'Name and phone are required.' };
  }
  if (name.length > 200 || phone.length > 30 || message.length > 4800) {
    return { status: 'error', message: 'One of the fields is too long.' };
  }
  if (!isCallable(phone)) return { status: 'error', message: PHONE_MESSAGE };

  const context = leadContext(formData);
  // No project_type / page columns on `leads`; fold them into the message so
  // they are visible in the Supabase table view too.
  const storedMessage =
    [
      projectType ? `Project: ${projectType}` : null,
      message || null,
      context.page ? `(from ${context.page})` : null,
    ]
      .filter(Boolean)
      .join('\n') || null;

  const ok = await recordLead(
    {
      source: 'contact_form',
      name,
      phone,
      email: email || null,
      city: city || null,
      message: storedMessage,
      utm_source: context.utm_source,
      utm_medium: context.utm_medium,
      utm_campaign: context.utm_campaign,
    },
    {
      source: 'contact_form',
      name,
      phone,
      email: email || null,
      city: city || null,
      projectType: projectType || null,
      message: message || null,
      page: context.page,
    },
  );

  if (!ok) return { status: 'error', message: FAILURE_MESSAGE };
  return {
    status: 'success',
    message: "Thanks — we received your message. We'll call or WhatsApp you within 24 hours.",
  };
}

export async function submitQuoteLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (isBot(formData)) return { status: 'success', message: 'Thanks — we received your request.' };

  const name = field(formData, 'name');
  const phone = field(formData, 'phone', 30);
  const email = field(formData, 'email', 254);
  const city = field(formData, 'city');
  const plotSqftRaw = field(formData, 'plot_sqft', 12);
  const builtUpSqftRaw = field(formData, 'built_up_sqft', 12);
  const floors = field(formData, 'floors', 50);
  const tierInterest = field(formData, 'tier_interest', 50);
  const timeline = field(formData, 'timeline');
  const message = field(formData, 'message', 4800);

  if (!name || !phone) {
    return { status: 'error', message: 'Name and phone are required.' };
  }
  if (!isCallable(phone)) return { status: 'error', message: PHONE_MESSAGE };

  const plotSqft = plotSqftRaw ? Number.parseInt(plotSqftRaw, 10) : null;
  const builtUpSqft = builtUpSqftRaw ? Number.parseInt(builtUpSqftRaw, 10) : null;
  const context = leadContext(formData);

  const details = [
    floors ? `Floors: ${floors}` : null,
    plotSqft ? `Plot: ${plotSqft} sqft` : null,
    builtUpSqft ? `Built-up: ${builtUpSqft} sqft` : null,
    tierInterest ? `Tier: ${tierInterest}` : null,
    timeline ? `Timeline: ${timeline}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const ok = await recordLead(
    {
      source: 'quote_form',
      name,
      phone,
      email: email || null,
      city: city || null,
      plot_sqft: Number.isFinite(plotSqft) ? plotSqft : null,
      built_up_sqft: Number.isFinite(builtUpSqft) ? builtUpSqft : null,
      floors: floors || null,
      tier_interest: tierInterest || null,
      timeline: timeline || null,
      message:
        [message || null, context.page ? `(from ${context.page})` : null]
          .filter(Boolean)
          .join('\n') || null,
      utm_source: context.utm_source,
      utm_medium: context.utm_medium,
      utm_campaign: context.utm_campaign,
    },
    {
      source: 'quote_form',
      name,
      phone,
      email: email || null,
      city: city || null,
      details: details || null,
      message: message || null,
      page: context.page,
    },
  );

  if (!ok) return { status: 'error', message: FAILURE_MESSAGE };
  return {
    status: 'success',
    message:
      "Thanks — we received your quote request. We'll call or WhatsApp you within 24 hours with an estimate.",
  };
}
