'use client';

import { useState } from 'react';
import { TIERS } from '@/lib/content/pricing';

function formatLakh(rupees: number): string {
  const lakh = rupees / 100000;
  // One decimal place reads naturally for crores-and-lakhs budgets.
  return `₹${lakh.toFixed(1)} lakh`;
}

const PRESETS = [800, 1200, 1500, 2000, 2400];

export function CostCalculator() {
  const [sqft, setSqft] = useState(1500);
  const [tierSlug, setTierSlug] = useState(TIERS[1].slug); // default Standard

  const tier = TIERS.find((t) => t.slug === tierSlug) ?? TIERS[1];
  const area = Number.isFinite(sqft) && sqft > 0 ? sqft : 0;
  const low = area * tier.rateRange.min;
  const high = area * tier.rateRange.max;

  return (
    <div className="rounded-xl border border-limestone-200 bg-white p-6">
      <h3 className="font-serif text-xl font-bold text-charcoal-900">
        Estimate your construction cost
      </h3>
      <p className="mt-1 text-sm text-neutral-600">
        Built-up area × your chosen tier rate. Indicative — excludes land, approvals and site works.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="calc-sqft" className="block text-sm font-medium text-charcoal-900">
            Built-up area (sqft)
          </label>
          <input
            id="calc-sqft"
            type="number"
            min={100}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(e.target.valueAsNumber)}
            className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-terracotta-600 focus:outline-none focus:ring-1 focus:ring-terracotta-600"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSqft(p)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  sqft === p
                    ? 'bg-terracotta-600 text-white'
                    : 'bg-limestone-100 text-neutral-700 hover:bg-limestone-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="calc-tier" className="block text-sm font-medium text-charcoal-900">
            Spec tier
          </label>
          <select
            id="calc-tier"
            value={tierSlug}
            onChange={(e) => setTierSlug(e.target.value as typeof tierSlug)}
            className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-terracotta-600 focus:outline-none focus:ring-1 focus:ring-terracotta-600"
          >
            {TIERS.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name} ({t.rateLabel})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-charcoal-900 p-5 text-center text-white">
        <p className="text-sm text-neutral-300">
          Estimated {tier.name} build, {area > 0 ? area.toLocaleString('en-IN') : '—'} sqft
        </p>
        <p className="mt-1 text-2xl font-bold" aria-live="polite">
          {area > 0 ? `${formatLakh(low)} – ${formatLakh(high)}` : 'Enter an area'}
        </p>
      </div>
    </div>
  );
}
