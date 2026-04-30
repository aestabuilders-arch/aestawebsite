'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactLead, type LeadFormState } from './actions';

const initial: LeadFormState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700 disabled:opacity-50"
    >
      {pending ? 'Sending…' : 'Send message'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactLead, initial);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-charcoal-900">
          Your name <span className="text-terracotta-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={200}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-charcoal-900 focus:border-terracotta-600 focus:outline-none"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-charcoal-900">
            Phone <span className="text-terracotta-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={30}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-charcoal-900 focus:border-terracotta-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-charcoal-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={254}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-charcoal-900 focus:border-terracotta-600 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="city" className="mb-1 block text-sm font-medium text-charcoal-900">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          maxLength={200}
          placeholder="Pudukkottai, Karaikudi, Trichy…"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-charcoal-900 focus:border-terracotta-600 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={5000}
          placeholder="Tell us about your project — plot size, type, timeline."
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-charcoal-900 focus:border-terracotta-600 focus:outline-none"
        />
      </div>

      {state.status === 'success' ? (
        <p role="status" className="rounded-md bg-sage-500/15 p-3 text-sm text-sage-600">
          {state.message}
        </p>
      ) : null}
      {state.status === 'error' ? (
        <p role="alert" className="rounded-md bg-terracotta-500/15 p-3 text-sm text-terracotta-700">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
