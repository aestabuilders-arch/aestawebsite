'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export type LeadFormState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
};

export async function submitContactLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const city = String(formData.get('city') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !phone) {
    return { status: 'error', message: 'Name and phone are required.' };
  }
  if (name.length > 200 || phone.length > 30 || message.length > 5000) {
    return { status: 'error', message: 'One of the fields is too long.' };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from('leads').insert({
    source: 'contact_form',
    name,
    phone,
    email: email || null,
    city: city || null,
    message: message || null,
    status: 'new',
  });

  if (error) {
    return {
      status: 'error',
      message: 'Sorry, something went wrong. Please try WhatsApp or call us instead.',
    };
  }

  return {
    status: 'success',
    message: "Thanks — we received your message. We'll respond within 24 hours.",
  };
}

export async function submitQuoteLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const city = String(formData.get('city') ?? '').trim();
  const plotSqftRaw = String(formData.get('plot_sqft') ?? '').trim();
  const builtUpSqftRaw = String(formData.get('built_up_sqft') ?? '').trim();
  const floors = String(formData.get('floors') ?? '').trim();
  const tierInterest = String(formData.get('tier_interest') ?? '').trim();
  const timeline = String(formData.get('timeline') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !phone) {
    return { status: 'error', message: 'Name and phone are required.' };
  }

  const plotSqft = plotSqftRaw ? Number.parseInt(plotSqftRaw, 10) : null;
  const builtUpSqft = builtUpSqftRaw ? Number.parseInt(builtUpSqftRaw, 10) : null;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from('leads').insert({
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
    message: message || null,
    status: 'new',
  });

  if (error) {
    return {
      status: 'error',
      message: 'Sorry, something went wrong. Please try WhatsApp or call us instead.',
    };
  }

  return {
    status: 'success',
    message:
      "Thanks — we received your quote request. We'll send a detailed estimate within 24 hours.",
  };
}
