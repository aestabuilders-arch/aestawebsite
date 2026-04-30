export type ServiceSlug =
  | 'residential-construction'
  | 'commercial-construction'
  | 'architectural-design'
  | 'interior-design'
  | 'renovation'
  | 'project-management'
  | 'three-d-visualization'
  | 'turnkey-homes';

export type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  shortDescription: string;
  longDescription: string;
  whatsIncluded: string[];
  process: { name: string; text: string }[];
  faqs: { question: string; answer: string }[];
  pricingHint: string;
};

export const SERVICES: ServiceContent[] = [
  {
    slug: 'residential-construction',
    name: 'Residential Construction',
    shortDescription:
      'Single-family homes, duplexes, bungalows. Our core practice — 100+ delivered across the Pudukkottai–Karaikudi belt.',
    longDescription:
      'AESTA designs and builds residential homes from foundation to finish. Architects from NIT Trichy lead the design; civil engineers run the site daily; finishes are sourced from named brands at every tier. Single-point accountability — you do not coordinate multiple contractors.',
    whatsIncluded: [
      'Architectural drawings (2D plans + 3D elevation)',
      'Structural design (in-house engineer, soil-test recommended)',
      'DTCP / panchayat approval coordination',
      'Foundation, structure, brickwork, plastering',
      'Electrical and plumbing rough-in + finish',
      'Flooring, painting, doors, windows per spec tier',
      'Daily site supervision + weekly client updates',
      'Workmanship warranty (1–10 years by tier)',
    ],
    process: [
      { name: 'Consult', text: 'Free site visit and brief. We listen, then propose options.' },
      { name: 'Design', text: 'Architectural and structural drawings with 3D walkthrough.' },
      {
        name: 'Estimate',
        text: 'Itemized quote against your chosen spec tier. No surprises.',
      },
      { name: 'Approve', text: 'DTCP / panchayat clearances handled by our team.' },
      { name: 'Build', text: 'Daily supervision, photo updates, transparent reporting.' },
      { name: 'Quality check', text: 'Senior engineer sign-off before each major milestone.' },
      { name: 'Handover', text: 'Walkthrough, defects-list close-out, warranty docs.' },
    ],
    faqs: [
      {
        question: 'How much does a 1500 sqft G+1 house cost in 2026?',
        answer:
          'Approximately ₹31–48 lakh for built-up area, depending on tier (Economy ₹2,099/sqft to Luxury ₹3,299+/sqft). Excludes land, DTCP fees, compound wall, and interiors.',
      },
      {
        question: 'How long does a 1500 sqft house take?',
        answer: 'Typically 7–10 months from foundation to handover, weather permitting.',
      },
      {
        question: 'Do you handle DTCP approvals?',
        answer:
          'Yes. Approval coordination is included in turnkey packages and available as an add-on otherwise.',
      },
      {
        question: 'Can I see homes you have built?',
        answer:
          'Yes — we arrange site visits to recently completed and ongoing projects in your area. Ask during the first consultation.',
      },
    ],
    pricingHint: 'Per-sqft rates apply. Choose your tier on the pricing page.',
  },
  {
    slug: 'commercial-construction',
    name: 'Commercial Construction',
    shortDescription:
      'Shops, offices, small commercial complexes. Built to BIS standards with structural engineer sign-off.',
    longDescription:
      'AESTA builds ground-up commercial spaces — retail shops, office floors, small mixed-use complexes. We handle the regulatory side (panchayat trade license coordination, parking norms, fire-NOC inputs) so you focus on launching the business.',
    whatsIncluded: [
      'Site survey and layout planning',
      'Structural design with commercial load calculations',
      'Trade-license-compliant fit-out',
      'Power load planning + main panel installation',
      'Storefront / signage substrate',
      'Parking and access compliance',
    ],
    process: [
      { name: 'Brief', text: 'Tenant or owner specifies the use case — retail, office, F&B, etc.' },
      { name: 'Approvals', text: 'We map out NOCs, trade-licence prereqs, and parking norms.' },
      { name: 'Build', text: 'Standard residential cadence with commercial-grade specs.' },
      { name: 'Handover', text: 'Compliance certificates and trade-license inputs delivered.' },
    ],
    faqs: [
      {
        question: 'How is commercial construction priced differently?',
        answer:
          'Typically 10–15% above residential standard rates due to higher load specifications, fire-safety requirements, and commercial-grade finishes.',
      },
      {
        question: 'Can you handle trade-license coordination?',
        answer:
          'We provide the structural and infrastructure inputs the local trade-license office requires; final license processing remains with the owner.',
      },
    ],
    pricingHint: 'Commercial rate is approximately Standard residential rate + 10–15%.',
  },
  {
    slug: 'architectural-design',
    name: 'Architectural Design',
    shortDescription:
      'Standalone design — 2D plans, 3D elevations, structural drawings. Use any contractor; we supply the drawings.',
    longDescription:
      'Already have a contractor? Want to bid the build separately? We provide architectural and structural drawings as a stand-alone service. NIT Trichy-trained architects, structural engineers in-house. Drawings are issued in formats your contractor can build from directly.',
    whatsIncluded: [
      'Site analysis + climate/soil considerations',
      '2D floor plans (all floors)',
      '3D elevation rendering',
      'Structural drawings (RCC, beams, columns, slab schedules)',
      'Working drawings (electrical, plumbing layouts)',
      'Approval-ready submission set',
    ],
    process: [
      { name: 'Brief', text: 'Plot details, family size, budget range, style preferences.' },
      { name: 'Concept', text: '2D options + sketches — choose the direction.' },
      { name: 'Develop', text: '3D elevation, structural drawings, working drawings.' },
      { name: 'Issue', text: 'Final drawing set delivered as PDF + DWG.' },
    ],
    faqs: [
      {
        question: 'How much does architectural design cost?',
        answer: '₹15–40 per sqft of built-up area, depending on complexity and revisions.',
      },
      {
        question: 'Can I upgrade to full construction later?',
        answer:
          'Yes — design fees credit toward total construction cost if you go forward with us.',
      },
    ],
    pricingHint: '₹15–40/sqft based on complexity.',
  },
  {
    slug: 'interior-design',
    name: 'Interior Design',
    shortDescription:
      'Modular kitchens, wardrobes, false ceiling, furnishing. Natural extension of construction.',
    longDescription:
      'Once the structure is up, interiors transform a house into your home. We design and build modular kitchens, fitted wardrobes, false ceilings, and complete furnishing schemes — coordinated with the architectural and electrical layouts so nothing clashes.',
    whatsIncluded: [
      'Room-by-room interior brief and 3D rendering',
      'Modular kitchen (cabinets, hardware, countertops)',
      'Fitted wardrobes',
      'False ceiling design and installation',
      'Furniture sourcing or fabrication',
      'Lighting plan',
    ],
    process: [
      { name: 'Walkthrough', text: 'Room-by-room consultation post-handover or pre-handover.' },
      { name: 'Render', text: '3D visualizations of each room.' },
      { name: 'Approve', text: 'Material samples and finishes approved on-site.' },
      { name: 'Install', text: 'Phased installation room-by-room to minimize disruption.' },
    ],
    faqs: [
      {
        question: 'How is interior design priced?',
        answer:
          'Lump sum per room, or 10–15% of furnishing cost. We provide an itemized quote against your moodboard.',
      },
    ],
    pricingHint: 'Lump sum or 10–15% of furnishing cost.',
  },
  {
    slug: 'renovation',
    name: 'Renovation & Extension',
    shortDescription:
      'Old house → modern home. Structural retrofits, room additions, full refurbishment.',
    longDescription:
      'Older houses in TN often have great bones — heritage proportions, generous compounds — but dated layouts and finishes. AESTA renovates with a structural-first approach: we retrofit where needed (often more cost-effective than rebuild), then update layouts, electrical, plumbing, and finishes to modern standards.',
    whatsIncluded: [
      'Structural assessment by senior engineer',
      'Selective demolition with impact analysis',
      'Retrofitting (column reinforcement, slab repair)',
      'Layout reconfiguration',
      'Modern electrical and plumbing systems',
      'New finishes per chosen spec tier',
    ],
    process: [
      { name: 'Inspect', text: 'Structural assessment determines what stays and what goes.' },
      { name: 'Plan', text: 'New layout overlaid on retained structure.' },
      {
        name: 'Phase',
        text: 'Demolition, retrofit, rebuild, finish — sequenced to manage disruption.',
      },
      { name: 'Handover', text: 'Walkthrough with before/after documentation.' },
    ],
    faqs: [
      {
        question: 'Renovation vs. rebuild — which is cheaper?',
        answer:
          'Renovation is typically 60–80% of new-construction cost when the structure is sound. We assess this in the first visit.',
      },
    ],
    pricingHint: 'Typically 60–80% of new-construction rates.',
  },
  {
    slug: 'project-management',
    name: 'Project Management',
    shortDescription:
      'Build with your own contractors. We supervise quality, manage subcontractors, protect your timeline and budget.',
    longDescription:
      'Some clients want their own masons, but recognize they need a professional supervising daily. We act as your representative on-site: coordinate subcontractors, run quality checks, manage the schedule, certify payments, and protect your interests. Lower-ticket entry into the AESTA standard of work.',
    whatsIncluded: [
      'Daily site supervision',
      'Subcontractor coordination',
      'Quality checks at each milestone',
      'Schedule management',
      'Payment certification',
      'Material verification and approval',
    ],
    process: [
      { name: 'Onboard', text: 'Walk the site, meet your contractors, set up reporting.' },
      { name: 'Operate', text: 'Daily presence, weekly written reports, monthly invoice review.' },
      { name: 'Close', text: 'Snag-list close-out and warranty handover.' },
    ],
    faqs: [
      {
        question: 'How is PM-only priced?',
        answer: '5–10% of total construction cost, depending on project size and complexity.',
      },
    ],
    pricingHint: '5–10% of total construction cost.',
  },
  {
    slug: 'three-d-visualization',
    name: '3D Visualization',
    shortDescription: 'Pre-construction walkthrough. See your home before a single brick is laid.',
    longDescription:
      'Floor plans are abstract; 3D renderings make them real. We produce photorealistic walkthroughs of your design so you can validate layout, light, scale, and materials before construction starts. Most clients catch and fix at least one mistake at this stage — well worth the small investment.',
    whatsIncluded: [
      'Photorealistic exterior renders (4–6 angles)',
      'Interior renders for key rooms (living, kitchen, primary bedroom)',
      'Daylight and dusk variants',
      'Material variation studies',
      'Walkthrough video (optional add-on)',
    ],
    process: [
      { name: 'Drawings', text: 'Existing 2D drawings or provided to us by you.' },
      { name: 'Model', text: 'Volumetric model with materials and lighting.' },
      { name: 'Render', text: 'High-resolution stills + optional walkthrough video.' },
    ],
    faqs: [
      {
        question: 'What does a 3D walkthrough cost?',
        answer: '₹5,000–₹25,000 per project depending on number of views and detail level.',
      },
    ],
    pricingHint: '₹5,000–₹25,000 per project.',
  },
  {
    slug: 'turnkey-homes',
    name: 'Turnkey Homes',
    shortDescription:
      'Land to keys. Approvals, design, construction, interiors — single contract, single team, single price.',
    longDescription:
      'For clients who want zero coordination overhead. AESTA handles every step from plot survey to handover with keys: DTCP approvals, design, construction, interiors, compound wall, sump, borewell — all under one contract. The premium offering for homeowners who value time and predictability.',
    whatsIncluded: [
      'Plot survey and soil test',
      'DTCP / panchayat approvals',
      'Architectural and structural design',
      'Full construction (foundation to handover)',
      'Interior design and furnishing (per agreed scope)',
      'Compound wall, sump, borewell',
      'Single project manager throughout',
    ],
    process: [
      { name: 'Land', text: 'Plot diligence + soil test.' },
      { name: 'Design', text: 'Architectural + interior design in parallel.' },
      { name: 'Approve', text: 'All regulatory approvals in our name.' },
      { name: 'Build', text: 'Construction + interiors, sequenced.' },
      { name: 'Move in', text: 'Handover with keys and warranty.' },
    ],
    faqs: [
      {
        question: 'Why turnkey instead of separate contracts?',
        answer:
          'Single-point accountability. One number to call. No finger-pointing between architect, builder, and interior designer.',
      },
      {
        question: 'How is turnkey priced?',
        answer:
          'Per-sqft tier rate (Economy to Luxury) + 8–12% project-management fee for the integrated coordination.',
      },
    ],
    pricingHint: 'Per-sqft tier rate + 8–12% PM fee.',
  },
];

export function getService(slug: string): ServiceContent | null {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}
