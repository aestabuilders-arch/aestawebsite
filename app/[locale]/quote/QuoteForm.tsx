'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitQuoteLead, type LeadFormState } from '../contact/actions';

const initial: LeadFormState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md bg-terracotta-600 px-6 py-3 text-sm font-medium text-white hover:bg-terracotta-700 disabled:opacity-50"
    >
      {pending ? 'Submitting…' : 'Request quote'}
    </button>
  );
}

export function QuoteForm() {
  const [state, formAction] = useFormState(submitQuoteLead, initial);

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
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
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
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
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
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium text-charcoal-900">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            maxLength={200}
            placeholder="Pudukkottai, Karaikudi…"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="floors" className="mb-1 block text-sm font-medium text-charcoal-900">
            Floors
          </label>
          <select
            id="floors"
            name="floors"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="G">Ground only</option>
            <option value="G+1">G+1</option>
            <option value="G+2">G+2</option>
            <option value="G+3">G+3</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="plot_sqft" className="mb-1 block text-sm font-medium text-charcoal-900">
            Plot size (sqft)
          </label>
          <input
            id="plot_sqft"
            name="plot_sqft"
            type="number"
            min={0}
            max={1000000}
            placeholder="e.g. 2400"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="built_up_sqft"
            className="mb-1 block text-sm font-medium text-charcoal-900"
          >
            Built-up area (sqft)
          </label>
          <input
            id="built_up_sqft"
            name="built_up_sqft"
            type="number"
            min={0}
            max={1000000}
            placeholder="e.g. 1500"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="tier_interest"
            className="mb-1 block text-sm font-medium text-charcoal-900"
          >
            Spec tier
          </label>
          <select
            id="tier_interest"
            name="tier_interest"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          >
            <option value="">Not sure yet</option>
            <option value="economy">Economy (₹1,999–₹2,199 / sqft)</option>
            <option value="standard">Standard (₹2,299–₹2,599 / sqft)</option>
            <option value="premium">Premium (₹2,699–₹2,999 / sqft)</option>
            <option value="luxury">Luxury (₹3,299+ / sqft)</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="mb-1 block text-sm font-medium text-charcoal-900">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="immediate">Immediate (next 1–2 months)</option>
            <option value="3_6_months">3–6 months</option>
            <option value="6_12_months">6–12 months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal-900">
          Anything specific?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={5000}
          placeholder="Style preferences, must-haves, constraints, anything we should know…"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 focus:border-terracotta-600 focus:outline-none"
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
