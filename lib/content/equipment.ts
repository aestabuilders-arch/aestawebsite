// Owned infrastructure & equipment — a real differentiator for AESTA.
//
// The argument is ownership: because we own our plant rather than renting it
// per-job, builds don't stall waiting for a hired machine, there is no rental
// markup on your bill, and the equipment is maintained to our standards.
//
// IMPORTANT — keep this honest and verifiable:
//   - List only equipment AESTA actually owns. Edit `items` to your real
//     inventory; counts (e.g. "2× transit mixers") are stronger than vague
//     claims, but only state numbers that are true.
//   - Add real photos to /public/Assets/Equipment/<category>/ and reference
//     them in `images`. Categories render cleanly with no photos too, but the
//     section is far more persuasive with real images of your own yard/plant.

export type EquipmentImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type EquipmentCategory = {
  slug: string;
  name: string;
  /** One-line reason owning this matters to the client. */
  whyItMatters: string;
  items: string[];
  /** Optional photos in /public/Assets/Equipment/. Renders only when present. */
  images?: EquipmentImage[];
};

export type InfrastructureBenefit = {
  title: string;
  text: string;
};

export const OWNERSHIP_INTRO =
  'Most builders in this market rent their machinery job-to-job — which means your site waits in the queue, and the rental markup lands on your bill. AESTA owns its core plant and equipment, so our crews are self-sufficient from foundation to finish.';

// The "why owning matters" band — the client-facing benefits of ownership.
export const INFRASTRUCTURE_BENEFITS: InfrastructureBenefit[] = [
  {
    title: 'Schedule certainty',
    text: 'No waiting in a rental queue. Our machines are on our sites when the work needs them.',
  },
  {
    title: 'Cost control',
    text: 'No third-party rental markup passed through to your estimate.',
  },
  {
    title: 'Quality control',
    text: 'Equipment maintained and operated to our own standards, by our own crews.',
  },
  {
    title: 'Always available',
    text: 'Multiple sites supported in parallel without competing for hired plant.',
  },
];

// All seven categories below are confirmed AESTA-owned (Hari, 2026-06-19):
// earthwork, concrete mixing, formwork, lifting, power/cutting tools, site
// logistics, survey/testing. The named machines (monkey hoist, breaker,
// drilling machines, core cutter, concrete mixer) are explicit; the rest are
// representative of each category — extend with specific machines/counts as
// wanted. Photos still to be added via each category's `images`.
export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    slug: 'earthwork-excavation',
    name: 'Earthwork & excavation',
    whyItMatters: 'Foundations start on day one, not whenever a JCB is free to hire.',
    items: [
      'Excavator / backhoe loader (JCB-type)',
      'Soil compaction equipment',
      'Earth-moving and levelling attachments',
    ],
  },
  {
    slug: 'concrete-batching',
    name: 'Concrete & mixing',
    whyItMatters: 'Consistent, well-cured concrete — the single biggest driver of structural life.',
    items: [
      'Concrete mixer machine',
      'Needle and surface vibrators',
      'Concrete transport and placing equipment',
    ],
  },
  {
    slug: 'formwork-shuttering',
    name: 'Formwork, shuttering & centering',
    whyItMatters:
      'Owned steel shuttering means straight, plumb, reusable forms — not warped timber.',
    items: ['Steel shuttering plates', 'Adjustable props and spans', 'Slab centering and staging'],
  },
  {
    slug: 'lifting-access',
    name: 'Lifting & access',
    whyItMatters: 'Material moves up the building safely, without manual bottlenecks.',
    items: ['Monkey hoist (material lift)', 'Scaffolding systems', 'Access towers and ladders'],
  },
  {
    slug: 'power-finishing-tools',
    name: 'Power & cutting tools',
    whyItMatters: 'A full owned tool kit keeps trades moving instead of sharing hired tools.',
    items: [
      'Concrete / demolition breaker',
      'Drilling machines',
      'Core cutter',
      'Tile and stone cutters',
      'Angle grinders',
      'Power floats and plastering tools',
    ],
  },
  {
    slug: 'site-logistics',
    name: 'Site logistics & transport',
    whyItMatters: 'Materials and water reach site on our schedule, not a hired truck’s.',
    items: ['Material transport vehicle(s)', 'Water tanker / supply', 'Site power (generator/DG)'],
  },
  {
    slug: 'survey-quality',
    name: 'Survey & quality',
    whyItMatters: 'Levels, alignment and mixes are measured, not eyeballed.',
    items: [
      'Levelling and survey instruments',
      'Slump and basic material testing kit',
      'Measuring and setting-out tools',
    ],
  },
];
