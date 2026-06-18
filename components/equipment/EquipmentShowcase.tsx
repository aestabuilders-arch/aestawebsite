import Image from 'next/image';
import type { EquipmentCategory, InfrastructureBenefit } from '@/lib/content/equipment';

type EquipmentShowcaseProps = {
  benefits: InfrastructureBenefit[];
  categories: EquipmentCategory[];
};

export function EquipmentShowcase({ benefits, categories }: EquipmentShowcaseProps) {
  return (
    <>
      {/* Why owning matters */}
      <section className="my-12 rounded-2xl bg-limestone-100 p-6 md:p-8">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">
          Why owning our equipment matters
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title}>
              <h3 className="font-semibold text-charcoal-900">{b.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment categories */}
      <div className="my-12 grid gap-6 md:grid-cols-2">
        {categories.map((cat) => {
          const cover = cat.images?.[0];
          return (
            <article
              key={cat.slug}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-limestone-200 bg-white shadow-sm"
            >
              {cover ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-limestone-100">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <EquipmentPlaceholder label={cat.name} />
              )}

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="font-serif text-xl font-bold text-charcoal-900">{cat.name}</h3>
                <p className="mt-2 text-sm font-medium text-terracotta-700">{cat.whyItMatters}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-neutral-700">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-terracotta-600">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function EquipmentPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-limestone-100 via-limestone-200 to-terracotta-50">
      <div className="flex flex-col items-center gap-2 text-charcoal-800/60">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
          <path
            d="M30 6l-4 4 4 4 4-4a8 8 0 01-10 10L10 38a3 3 0 01-4-4l14-14A8 8 0 0130 6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <p className="px-4 text-center text-[11px] font-medium uppercase tracking-wider">{label}</p>
        <p className="text-[11px] text-charcoal-800/50">Photo coming soon</p>
      </div>
    </div>
  );
}
