export type GuideSection = {
  heading: string;
  /** Paragraphs of body copy. Keep city-specific to avoid duplicate content. */
  body: string[];
};

export type GuideFaq = { question: string; answer: string };

export type GuideContent = {
  slug: string;
  /** Links the guide to a /locations/{citySlug} page when city-specific. */
  citySlug?: string;
  /** Display H1. */
  title: string;
  /** <title> tag. */
  seoTitle: string;
  description: string;
  /** YYYY-MM, shown as "last reviewed" and used in Article schema. */
  updated: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const GUIDES: GuideContent[] = [
  {
    slug: 'construction-cost-per-sqft-tamil-nadu',
    title: 'House Construction Cost per Sqft in Tamil Nadu (2026)',
    seoTitle: 'House Construction Cost per Sqft in Tamil Nadu 2026 | AESTA',
    description:
      'What house construction actually costs per sqft in Tamil Nadu in 2026 — tier-by-tier rates, what is included and excluded, worked examples, and the factors that move the number. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'House construction in the Pudukkottai–Karaikudi–Trichy belt of Tamil Nadu costs roughly ₹1,999 to ₹3,299+ per square foot of built-up area in 2026, depending on the materials and finishes you choose. The per-sqft figure is the single most-searched number for anyone planning a home — but it is also the most misunderstood, because what one builder includes at ₹2,000 another excludes and bills later. This guide breaks down the real rate by tier, states plainly what the rate does and does not cover, and shows worked examples for common house sizes so you can budget honestly.',
    sections: [
      {
        heading: 'Why the per-sqft rate varies so much',
        body: [
          'The gap between ₹1,999 and ₹3,299+ is not margin — it is specification. The structural skeleton (cement grade, TMT steel grade, brick type) and the finishes (flooring, joinery, wiring, sanitaryware, paint) are what separate an Economy build from a Luxury one. A 2x2 vitrified tile at ₹45/sqft and an Italian-marble floor at ₹250/sqft are both "flooring," but they sit ₹200/sqft apart on that line alone, multiplied across the whole house.',
          'This is why a quote without an itemised specification is meaningless. The tier table below is our published rate card, with every material named, so you can see exactly what you are paying for at each level rather than trusting a single round number.',
        ],
      },
      {
        heading: 'Built-up area, not plot area',
        body: [
          'Per-sqft rates apply to built-up area — the total covered floor area across all floors — not to your plot size and not to carpet (usable internal) area. A 30x40 plot (1200 sqft) with a G+1 house might have 1800–2000 sqft of built-up area once you count both floors, staircase, and walls. Always confirm which area a quote is measured against, because builders who quote on plot area look cheaper and then bill the difference.',
        ],
      },
      {
        heading: 'What pushes the number up or down across Tamil Nadu',
        body: [
          'Soil and foundation: rocky strata near Trichy raises excavation cost; loose coastal or delta soils near Aranthangi and Thanjavur need deeper or raised foundations. A soil test pays for itself by sizing the footing correctly.',
          'Distance from a supply hub: sites far from Pudukkottai or Trichy carry material-transport lead time and cost. We plan this into the schedule rather than treating it as a surprise.',
          'Design complexity: cantilevers, large spans, double-height volumes and curved work all add steel and labour beyond the flat per-sqft assumption.',
          'Approvals and site works: DTCP/panchayat fees, compound wall, sump, borewell and septic tank are excluded from the per-sqft rate and budgeted separately.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the average house construction cost per sqft in Tamil Nadu in 2026?',
        answer:
          'For the Pudukkottai–Karaikudi–Trichy region, roughly ₹1,999–₹2,199/sqft for an Economy build, ₹2,299–₹2,599 Standard, ₹2,699–₹2,999 Premium, and ₹3,299+ for Luxury — all on built-up area, excluding land, approvals and site works.',
      },
      {
        question: 'Does the per-sqft rate include interiors and compound wall?',
        answer:
          'No. The rate covers structure and in-built finishes to your tier. Loose furniture, modular interiors, compound wall, sump, borewell, septic tank, landscaping and approval fees are separate line items.',
      },
      {
        question: 'How do I get an accurate figure for my plot?',
        answer:
          'Share your plot size, the number of floors, and your preferred tier on our quote form. We return an itemised estimate within 24 hours, and a free site visit firms up soil and access factors.',
      },
    ],
  },
  {
    slug: '30x40-house-construction-cost',
    title: '30x40 House Construction Cost in Tamil Nadu (2026)',
    seoTitle: '30x40 House Construction Cost in Tamil Nadu 2026 | AESTA',
    description:
      'What it costs to build a 30x40 (1200 sqft plot) house in Tamil Nadu in 2026 — built-up area maths, tier-by-tier totals for G+1, and what is included. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'A 30x40 plot is 1200 square feet, and it is one of the most common house sizes people plan in Tamil Nadu. But the construction cost is not based on the 1200 sqft plot — it is based on the built-up area you actually construct, which for a G+1 (ground plus one floor) home on this plot is typically around 1800–2000 sqft once both floors are counted. This guide does the maths properly so your 30x40 budget is realistic rather than half the real figure.',
    sections: [
      {
        heading: 'From plot size to built-up area',
        body: [
          'On a 30x40 plot you will not build to the full footprint — setbacks required by approval rules leave a buildable footprint of roughly 800–950 sqft per floor. A single-floor (G) house therefore gives ~850 sqft built-up; a G+1 gives ~1700–1900 sqft; a G+2 around ~2600 sqft. The per-sqft rate is applied to that built-up figure, so a G+1 at the Standard tier is priced on ~1800 sqft, not on 1200.',
        ],
      },
      {
        heading: 'What a 30x40 G+1 costs by tier',
        body: [
          'Taking a representative ~1800 sqft built-up area for a G+1, the tier rates translate to roughly: Economy ₹36–40 lakh, Standard ₹41–47 lakh, Premium ₹49–54 lakh, and Luxury ₹59 lakh and up. The worked-example table below lets you slide the built-up area to match your actual plan, since setbacks and floor count shift the number.',
          'These totals are for structure and finishes to the chosen tier. Compound wall, gate, sump, borewell, septic tank, DTCP/panchayat fees and interiors are budgeted on top — for a 30x40 home, allow a sensible contingency for these site works.',
        ],
      },
      {
        heading: 'Getting the most from a 1200 sqft plot',
        body: [
          'Good design matters more on a compact plot than a large one. Stair placement, cross-ventilation, and where you spend the finish budget (kitchen and bathrooms repay it most) determine whether a 30x40 home feels generous or cramped. Our architects plan the layout to the setbacks first, then we cost it against your tier — so the estimate reflects a buildable design, not a generic rate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to build a 30x40 house in Tamil Nadu?',
        answer:
          'For a G+1 (~1800 sqft built-up), roughly ₹36–40 lakh at Economy, ₹41–47 lakh at Standard, ₹49–54 lakh at Premium, and ₹59 lakh+ at Luxury — excluding land, compound wall, site works and approvals.',
      },
      {
        question: 'Is the cost based on 1200 sqft?',
        answer:
          'No. It is based on built-up area. A 30x40 plot after setbacks gives roughly 850 sqft per floor, so a G+1 is priced on ~1800 sqft of built-up area across both floors.',
      },
      {
        question: 'Can you build a G+2 on a 30x40 plot?',
        answer:
          'Often yes, subject to local approval rules and soil. A G+2 gives more area (~2600 sqft built-up) on the same plot; we check feasibility during the free site visit.',
      },
    ],
  },
  {
    slug: 'house-construction-cost-in-pudukkottai',
    citySlug: 'pudukkottai',
    title: 'House Construction Cost in Pudukkottai (2026)',
    seoTitle: 'House Construction Cost in Pudukkottai 2026 — Per Sqft | AESTA',
    description:
      'House construction cost in Pudukkottai in 2026 — per-sqft rates by tier, local soil and approval factors, and worked totals for common sizes. By AESTA, based in Pudukkottai.',
    updated: '2026-06',
    intro:
      'Building a house in Pudukkottai in 2026 costs roughly ₹1,999–₹3,299+ per sqft of built-up area, depending on tier. As a firm based on North Second Street in Pudukkottai, we build more homes in this district than anywhere else, so this guide reflects the actual local conditions — soil, approvals, and material supply — rather than a generic state-wide figure.',
    sections: [
      {
        heading: 'Local factors that affect cost in Pudukkottai',
        body: [
          'Pudukkottai’s soil is largely lateritic with red-soil pockets. On level plots this keeps foundation cost predictable, but sloping plots need stepped footing and plots over 2400 sqft (or on filled land) warrant a soil test — both of which we size correctly rather than over- or under-spending.',
          'Because our office and core supply chain are in town, there is no material-transport premium for Pudukkottai sites, and supervision is daily. That local presence is a genuine cost and quality advantage over firms travelling in from Trichy or Madurai.',
        ],
      },
      {
        heading: 'Approvals in Pudukkottai',
        body: [
          'Plots in Pudukkottai town fall under municipality / DTCP rules; outlying plots are panchayat-approved. Approval fees are separate from the per-sqft construction rate and typically run a 4–8 week cycle, which we handle in-house. Budget for these alongside compound wall, sump and borewell when planning your total.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to build a house in Pudukkottai in 2026?',
        answer:
          'Roughly ₹1,999–₹3,299+/sqft of built-up area by tier — about ₹30–50 lakh for a 1500 sqft G+1 home. Land, approvals, compound wall and site works are separate.',
      },
      {
        question: 'Is building in Pudukkottai cheaper than Trichy or Chennai?',
        answer:
          'Generally yes. Labour and logistics in Pudukkottai are lower than in Trichy city or Chennai, and as a local firm we carry no travel premium here.',
      },
      {
        question: 'How long does a house take to build in Pudukkottai?',
        answer:
          'A 1500 sqft G+1 home typically takes 7–10 months. The October–December monsoon can add 2–4 weeks if it overlaps foundation work.',
      },
    ],
  },
  {
    slug: 'house-construction-cost-in-karaikudi',
    citySlug: 'karaikudi',
    title: 'House Construction Cost in Karaikudi (2026)',
    seoTitle: 'House Construction Cost in Karaikudi 2026 — Per Sqft | AESTA',
    description:
      'House construction cost in Karaikudi in 2026 — per-sqft rates by tier, Chettinad-style detailing costs, soil and approvals. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'House construction in Karaikudi costs roughly ₹1,999–₹3,299+ per sqft of built-up area in 2026, but Karaikudi has a distinctive driver the rate card alone does not capture: Chettinad-style craft. Courtyards, athangudi tiling, teak columns and period-correct detailing are what many Karaikudi clients want, and they place a build firmly in the Premium or Luxury tier. This guide explains how that translates to real numbers.',
    sections: [
      {
        heading: 'Chettinad detailing and where it lands on cost',
        body: [
          'Heritage proportions — large halls, internal courtyards (mutram), athangudi floor tiles, teak joinery — are labour- and material-intensive. They are beautiful and durable, but they are not Economy-tier finishes. We quote them line-by-line so you can see the cost of, say, athangudi tiling versus vitrified, and decide deliberately rather than discovering it mid-build.',
          'Plots in Karaikudi also tend to be larger than in Pudukkottai (3000+ sqft is common), so total project values are higher even at the same per-sqft rate simply because there is more built-up area.',
        ],
      },
      {
        heading: 'Soil, approvals and NRI coordination',
        body: [
          'Karaikudi’s sandy-loam soil has good bearing capacity, so foundations are usually straightforward and a deep raft is rarely needed below two storeys — a genuine saving versus rockier or coastal sites. Building-plan approval runs through the municipality and Sivaganga-district authorities. Many Karaikudi owners have NRI links, so we run key decisions over scheduled video reviews and document approvals for absent stakeholders, which keeps a remote build on budget and on time.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to build a house in Karaikudi in 2026?',
        answer:
          'Roughly ₹1,999–₹3,299+/sqft by tier. Chettinad-style detailing (courtyards, athangudi tiles, teak joinery) typically lands in the Premium or Luxury tier, quoted line by line.',
      },
      {
        question: 'How much extra does Chettinad-style detailing cost?',
        answer:
          'It depends on the specific elements. Athangudi tiling, teak columns and courtyards each carry a premium over standard finishes; we itemise them so you can choose where to invest.',
      },
      {
        question: 'Can you coordinate a Karaikudi build for an NRI owner?',
        answer:
          'Yes. We run scheduled video walkthroughs, weekly photo updates and documented approvals so owners abroad can decide remotely with full visibility.',
      },
    ],
  },
  {
    slug: 'house-construction-cost-in-trichy',
    citySlug: 'trichy',
    title: 'House Construction Cost in Trichy (2026)',
    seoTitle: 'House Construction Cost in Trichy 2026 — Per Sqft | AESTA',
    description:
      'House construction cost in Trichy (Tiruchirappalli) in 2026 — per-sqft rates by tier, rocky-strata excavation factors, approvals. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'House construction in Trichy costs roughly ₹1,999–₹3,299+ per sqft of built-up area in 2026. Trichy is the regional city, and city sites bring two cost factors that the surrounding districts do not always share: rocky strata in some pockets, and corporation-level approvals. Our NIT Trichy background means our design team is local to the city, and this guide reflects how Trichy sites actually price.',
    sections: [
      {
        heading: 'Rocky strata and excavation cost',
        body: [
          'Parts of Trichy sit on hard rock close to the surface. Where that is the case, excavation for the foundation costs more than on soft soil — sometimes meaningfully so. We survey the plot before quoting so the foundation line reflects the real ground condition rather than a flat assumption that turns into a variation bill later.',
          'Conversely, hard strata can reduce the need for deep foundations once you are through it, so it is not always a net negative. The point is to know before you sign, which is why we survey first.',
        ],
      },
      {
        heading: 'Approvals and where we build in Trichy',
        body: [
          'Plots inside the Trichy corporation follow corporation / Town & Country Planning rules; peripheral plots are panchayat-approved. We build across the city and surrounding panchayats — Srirangam, Thiruverumbur, Lalgudi and beyond. Approval fees and city labour rates make Trichy typically a little higher than the surrounding districts at the same tier, which we reflect honestly in the estimate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to build a house in Trichy in 2026?',
        answer:
          'Roughly ₹1,999–₹3,299+/sqft by tier. Where the plot has rocky strata, excavation can add to the foundation cost — we survey first and quote the actual figure.',
      },
      {
        question: 'Why is Trichy sometimes costlier than Pudukkottai?',
        answer:
          'City labour rates, corporation approval requirements, and rocky excavation in some pockets can make Trichy marginally higher at the same tier. We itemise these so the difference is transparent.',
      },
      {
        question: 'Do you build across Trichy city and suburbs?',
        answer:
          'Yes — across the corporation area and surrounding panchayats including Srirangam, Thiruverumbur and Lalgudi.',
      },
    ],
  },
  {
    slug: 'house-construction-cost-in-thanjavur',
    citySlug: 'thanjavur',
    title: 'House Construction Cost in Thanjavur (2026)',
    seoTitle: 'House Construction Cost in Thanjavur 2026 — Per Sqft | AESTA',
    description:
      'House construction cost in Thanjavur in 2026 — per-sqft rates by tier, Cauvery-delta flood and plinth factors, heritage-proximity approvals. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'House construction in Thanjavur costs roughly ₹1,999–₹3,299+ per sqft of built-up area in 2026. Thanjavur sits in the Cauvery delta, and its two distinctive cost factors flow from that setting and from the city’s temple heritage: flood-aware foundations on low-lying plots, and heritage-proximity approval checks. This guide explains how each affects your budget.',
    sections: [
      {
        heading: 'Delta soil, plinth height and drainage',
        body: [
          'Thanjavur’s alluvial soil generally has good bearing capacity, so the structural foundation itself is usually straightforward. The real variable is flood risk on low-lying plots near the Cauvery, which calls for a raised plinth and considered drainage. That adds to the base cost, but designing for it up front is far cheaper than dealing with water ingress after a monsoon — we account for it in the estimate, not as a later variation.',
        ],
      },
      {
        heading: 'Heritage-proximity approvals',
        body: [
          'Thanjavur corporation plots follow corporation / DTCP rules, and some plots fall under archaeological or heritage-proximity restrictions given the city’s temple landscape. We check this before scoping; in restricted zones we adjust massing and finishes to comply. These checks do not usually change the per-sqft rate, but they can affect what you are allowed to build, which is better known before you buy or design.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to build a house in Thanjavur in 2026?',
        answer:
          'Roughly ₹1,999–₹3,299+/sqft by tier. On low-lying delta plots, raised plinth and drainage work can add to the base — we include it in the estimate rather than as a later variation.',
      },
      {
        question: 'Do delta soils make building in Thanjavur more expensive?',
        answer:
          'Not the structural foundation itself, which is usually fine on alluvial soil. The cost factor is flood-aware plinth height and drainage on low-lying plots, which we design for from the start.',
      },
      {
        question: 'Are there building restrictions near Thanjavur temples?',
        answer:
          'Some plots fall under archaeological or heritage-proximity rules. We check before scoping and adjust the design to comply in restricted zones.',
      },
    ],
  },
  {
    slug: 'house-construction-cost-in-aranthangi',
    citySlug: 'aranthangi',
    title: 'House Construction Cost in Aranthangi (2026)',
    seoTitle: 'House Construction Cost in Aranthangi 2026 — Per Sqft | AESTA',
    description:
      'House construction cost in Aranthangi in 2026 — per-sqft rates by tier, coastal soil and corrosion factors, material lead times. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'House construction in Aranthangi costs roughly ₹1,999–₹3,299+ per sqft of built-up area in 2026. Aranthangi spans a coastal-to-interior belt in southern Pudukkottai district, and its cost factors come from that geography: variable soil, coastal corrosion protection, and material lead times from the Pudukkottai–Trichy supply hubs. This guide sets out what to budget.',
    sections: [
      {
        heading: 'Variable soil and material lead times',
        body: [
          'Aranthangi soil shifts from sandy near the coast to clay-rich inland, so footing depth genuinely depends on the plot — a soil test is strongly recommended above 1500 sqft and we design the foundation to its result. Because material is supplied from Pudukkottai and Trichy, we plan delivery lead times into the schedule so they do not stall the site, rather than absorbing them as cost surprises.',
        ],
      },
      {
        heading: 'Coastal corrosion protection',
        body: [
          'On plots closer to the Palk Strait coast, salt-laden air attacks ordinary fittings and reinforcement over time. We specify corrosion-resistant hardware, salt-resistant concrete cover and enhanced waterproofing on coastal sites — included from our Premium tier upward. This adds modestly to the cost but is essential to the building lasting, and we flag it clearly at quoting so it is a deliberate choice.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to build a house in Aranthangi in 2026?',
        answer:
          'Roughly ₹1,999–₹3,299+/sqft by tier. Coastal sites usually need corrosion-resistant fittings and enhanced waterproofing — included from the Premium tier — which we flag at quoting.',
      },
      {
        question: 'Do coastal plots in Aranthangi cost more to build?',
        answer:
          'Slightly. Corrosion-resistant hardware, salt-resistant concrete cover and enhanced waterproofing add modestly to the cost but protect the building’s lifespan near the coast.',
      },
      {
        question: 'Is a soil test necessary in Aranthangi?',
        answer:
          'We strongly recommend one above 1500 sqft, because the soil varies from sandy to clay-rich across the area and footing depth depends on it.',
      },
    ],
  },
];

export function getGuide(slug: string): GuideContent | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

/** Returns the cost guide whose citySlug matches, for cross-linking from location pages. */
export function getGuideForCity(citySlug: string): GuideContent | null {
  return GUIDES.find((g) => g.citySlug === citySlug) ?? null;
}
