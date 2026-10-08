'use client';

import { useId } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { track } from '@vercel/analytics';
import { submitContactLead, type LeadFormState } from '@/app/[locale]/contact/actions';
import { getWhatsAppLink } from '@/lib/constants/nap';
import { PROJECT_TYPES, type ProjectTypeKey } from '@/lib/leads/projectTypes';
import { LeadContextFields } from './LeadContextFields';

const initial: LeadFormState = { status: 'idle' };

const inputClass =
  'w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-charcoal-900 focus:border-terracotta-600 focus:outline-none';

function SubmitButton() {
  const t = useTranslations('leads');
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-terracotta-600 px-6 py-3 text-base font-semibold text-white hover:bg-terracotta-700 disabled:opacity-50"
    >
      {pending ? t('sending') : t('submit')}
    </button>
  );
}

type QuickEnquiryProps = {
  /** Pre-fills the plot location, e.g. on a city page. */
  defaultCity?: string;
  defaultProjectType?: ProjectTypeKey;
  /** Overrides the default "Get a call back" heading. */
  heading?: string;
  /** Prefilled WhatsApp text for the fallback link. */
  whatsappMessage?: string;
};

/**
 * Four-field enquiry form for embedding on high-intent pages (home, city,
 * service). The full /quote form asks for ten fields, which is too much for a
 * first contact on a phone; this captures name + number and lets the
 * engineer's call do the rest.
 */
export function QuickEnquiry({
  defaultCity,
  defaultProjectType = 'house',
  heading,
  whatsappMessage,
}: QuickEnquiryProps) {
  const t = useTranslations('leads');
  const id = useId();
  const [state, formAction] = useFormState(submitContactLead, initial);

  if (state.status === 'success') {
    return (
      <div
        id="enquiry"
        className="scroll-mt-24 rounded-xl border border-sage-500/40 bg-white p-6 shadow-sm md:p-8"
      >
        <p role="status" className="text-lg font-medium text-sage-600">
          ✓ {state.message}
        </p>
      </div>
    );
  }

  return (
    <div
      id="enquiry"
      className="scroll-mt-24 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
    >
      <h2 className="font-serif text-2xl font-bold text-charcoal-900">
        {heading ?? t('formTitle')}
      </h2>
      <p className="mt-1 text-sm text-neutral-600">{t('formSubtitle')}</p>

      <form
        action={formAction}
        onSubmit={() => track('lead_form_submit', { form: 'quick_enquiry' })}
        className="relative mt-5 grid gap-4 md:grid-cols-2"
      >
        <LeadContextFields />
        <div>
          <label htmlFor={`${id}-name`} className="mb-1 block text-sm font-medium">
            {t('name')} <span className="text-terracotta-600">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-1 block text-sm font-medium">
            {t('phone')} <span className="text-terracotta-600">*</span>
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            minLength={10}
            maxLength={30}
            autoComplete="tel"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-city`} className="mb-1 block text-sm font-medium">
            {t('city')}
          </label>
          <input
            id={`${id}-city`}
            name="city"
            type="text"
            maxLength={200}
            defaultValue={defaultCity}
            placeholder="Pudukkottai"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-type`} className="mb-1 block text-sm font-medium">
            {t('projectType')}
          </label>
          <select
            id={`${id}-type`}
            name="project_type"
            defaultValue={t(`types.${defaultProjectType}`)}
            className={inputClass}
          >
            {PROJECT_TYPES.map((key) => (
              <option key={key} value={t(`types.${key}`)}>
                {t(`types.${key}`)}
              </option>
            ))}
          </select>
        </div>

        {state.status === 'error' ? (
          <p
            role="alert"
            className="rounded-md bg-terracotta-500/15 p-3 text-sm text-terracotta-700 md:col-span-2"
          >
            {state.message}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <SubmitButton />
          <p className="mt-3 text-center text-sm">
            <a
              href={getWhatsAppLink(whatsappMessage ?? t('waDefault'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { placement: 'quick_enquiry' })}
              className="font-medium text-sage-600 hover:underline"
            >
              {t('orWhatsapp')} →
            </a>
          </p>
          <p className="mt-1 text-center text-xs text-neutral-500">{t('privacy')}</p>
        </div>
      </form>
    </div>
  );
}
