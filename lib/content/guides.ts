export type GuideSection = {
  heading: string;
  /** Paragraphs of body copy. Keep city-specific to avoid duplicate content. */
  body: string[];
};

export type GuideFaq = { question: string; answer: string };

export type GuideContent = {
  slug: string;
  /**
   * 'cost' guides render the per-sqft rate card, calculator and worked-cost
   * table (house-construction pricing). 'topic' guides are advice/explainer
   * pieces (architect fees, process, comparisons) that omit those blocks.
   * Defaults to 'cost' when omitted so the original guides are unaffected.
   */
  kind?: 'cost' | 'topic';
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

  // ── Topic / advice guides (no house-construction rate card) ─────────────────
  {
    slug: 'architect-fees-in-tamil-nadu',
    kind: 'topic',
    title: 'Architect Fees in Tamil Nadu: How Design Pricing Works (2026)',
    seoTitle: 'Architect & House Design Fees in Tamil Nadu 2026 | AESTA',
    description:
      'How architect and house-design fees work in Tamil Nadu in 2026 — the percentage, per-sqft and fixed-fee models, what each covers, and worked examples. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'Architect fees in Tamil Nadu are quoted three different ways — as a percentage of construction cost, per square foot of built-up area, or as a fixed lump sum — and the same house can look cheap or expensive depending only on which model you are shown. As a firm of NIT Trichy-credentialed architects, we provide design-only services across Tamil Nadu and India, not just where we build. This guide explains how design pricing actually works so you can compare quotes on equal terms.',
    sections: [
      {
        heading: 'The three ways architects charge',
        body: [
          'Percentage of construction cost is the traditional model: the architect charges a share of the total build value, commonly 5–10% for a residential project depending on scope and supervision. It scales with the house, which is fair on larger or more complex builds but can feel high on a simple home.',
          'Per square foot is the most transparent model for a homeowner — typically ₹15–40 per sqft of built-up area in Tamil Nadu, rising with design complexity and the number of revisions. Fixed lump sum suits a tightly-defined brief where the scope will not move. We quote per sqft for most residential design because you can check the number against your own area.',
        ],
      },
      {
        heading: 'What the fee includes — and what it does not',
        body: [
          'A complete design fee normally covers site and soil analysis, 2D floor plans for every floor, a 3D elevation, structural drawings (RCC, beams, columns, slab schedules), working drawings for electrical and plumbing, and an approval-ready submission set. A defined number of revision rounds is included; extensive re-designs after sign-off are extra.',
          'What the design fee does not include is on-site supervision and project management unless you contract that separately — under a design-only arrangement your contractor builds from our drawings. If you want us to both design and supervise, that is the turnkey route, priced differently.',
        ],
      },
      {
        heading: 'Design-only vs design-and-build',
        body: [
          'You can engage us for drawings alone and build with your own contractor anywhere in Tamil Nadu or beyond — we issue the set as PDF and DWG so any competent builder can work from it. Many clients abroad or in other cities use this remote design service and run construction locally.',
          'If you later decide to build with AESTA, the design fee is credited toward your construction cost, so paying for good drawings up front is not money lost. Good design also saves money on site: a plan resolved on paper avoids the expensive on-the-fly decisions that inflate a build.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much do architects charge in Tamil Nadu in 2026?',
        answer:
          'Roughly ₹15–40 per sqft of built-up area, or 5–10% of construction cost, depending on complexity, revisions and whether site supervision is included. A fixed lump sum is also possible for a well-defined brief.',
      },
      {
        question: 'Do you provide design-only services across Tamil Nadu and India?',
        answer:
          'Yes. We design houses remotely and issue full PDF + DWG drawing sets that any contractor can build from, for clients across Tamil Nadu, the rest of India, and NRI owners building back home.',
      },
      {
        question: 'Is the architect fee adjusted if I build with you?',
        answer:
          'Yes — if you go forward with AESTA for construction, the design fee is credited toward your total construction cost.',
      },
    ],
  },
  {
    slug: 'home-renovation-cost-in-tamil-nadu',
    kind: 'topic',
    title: 'Home Renovation Cost in Tamil Nadu (2026)',
    seoTitle: 'Home Renovation & Remodelling Cost in Tamil Nadu 2026 | AESTA',
    description:
      'What home renovation and remodelling costs in Tamil Nadu in 2026 — cosmetic vs structural scope, typical per-sqft ranges, old-house factors, and when renovating beats rebuilding. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'Home renovation cost in Tamil Nadu varies far more than new construction, because "renovation" covers everything from a fresh coat of paint to a structural retrofit of a 40-year-old house. The honest answer depends entirely on scope. This guide breaks renovation into the levels we actually quote against, gives realistic ranges for each, and explains the factors that move the number on an older Tamil Nadu home.',
    sections: [
      {
        heading: 'Cosmetic, full refurbishment, or structural',
        body: [
          'A cosmetic refresh — painting, re-flooring, new doors and fittings, a re-done kitchen and bathrooms — leaves the structure untouched and is the lightest spend. A full refurbishment adds re-wiring, re-plumbing, waterproofing, new openings and layout changes within the existing shell. A structural renovation touches the skeleton itself: strengthening or replacing columns and beams, adding a floor, or correcting settlement.',
          'These three levels sit far apart on cost, so the first job on any renovation is to decide honestly which one you are doing. We survey the existing building before quoting, because what is hidden behind old plaster — corroded reinforcement, weak slabs, damp — is what determines whether a job stays cosmetic or becomes structural.',
        ],
      },
      {
        heading: 'What pushes renovation cost up',
        body: [
          'Old electrical and plumbing almost always need full replacement in a house over 20 years old, and that work is more disruptive (and so more costly per unit) inside an occupied or finished structure than in new construction. Waterproofing and damp treatment are common and easy to under-budget. Matching new work to old finishes — especially in Chettinad or heritage homes around Karaikudi — adds skilled labour.',
          'Access and occupancy matter too: working around a family living in the house, or on a tight urban plot, slows the schedule. We phase renovations room-by-room where possible to keep the home usable, and we flag the likely hidden-condition risks at survey so the budget carries a sensible contingency rather than a nasty surprise.',
        ],
      },
      {
        heading: 'When renovation beats a rebuild',
        body: [
          'Renovation usually wins when the structure is sound, the layout is broadly workable, and you value the location and the existing footprint — refurbishing is faster, avoids fresh approvals in many cases, and keeps a home you are attached to. A rebuild makes more sense when the structure is failing, the layout fights how you want to live, or a new design would add significant usable area.',
          'We give an unbiased view because we do both. At survey we will tell you plainly when a tired house is worth saving and when you are better off putting the renovation budget toward a new build — the cost comparison should drive that call, not sentiment alone.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does home renovation cost in Tamil Nadu?',
        answer:
          'It depends on scope. A cosmetic refresh is modest per sqft; a full refurbishment with re-wiring, re-plumbing and waterproofing costs considerably more; a structural retrofit is the highest. We survey the existing building first and quote against the actual scope.',
      },
      {
        question: 'Is renovating cheaper than rebuilding?',
        answer:
          'Often, if the structure is sound and the layout works. When the skeleton is failing or you want significantly more area, a rebuild can be the better value. We assess both at survey and give an honest comparison.',
      },
      {
        question: 'Can you renovate an old Chettinad or heritage-style home?',
        answer:
          'Yes. We match new work to period finishes and detailing, handle damp and structural strengthening, and modernise services (wiring, plumbing, waterproofing) while preserving the character.',
      },
    ],
  },
  {
    slug: 'interior-design-cost-in-tamil-nadu',
    kind: 'topic',
    title: 'Interior Design Cost in Tamil Nadu (2026)',
    seoTitle: 'Interior Design Cost in Tamil Nadu 2026 — Per Room | AESTA',
    description:
      'What interior design and execution costs in Tamil Nadu in 2026 — pricing models, cost by room (modular kitchen, wardrobes, false ceiling), and material tiers. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'Interior design cost in Tamil Nadu is driven less by floor area than by what you fit into that area — a modular kitchen, fitted wardrobes, false ceilings and furnishing carry most of the budget, and their cost depends heavily on the materials you choose. This guide sets out how interiors are priced, what each major element typically costs, and where the money goes so you can plan a realistic interiors budget on top of your construction cost.',
    sections: [
      {
        heading: 'How interiors are priced',
        body: [
          'Interior work is usually quoted one of two ways: a lump sum per room or element (a fixed price for the modular kitchen, each wardrobe, the false ceiling), or as a percentage of the overall furnishing budget, commonly around 10–15%. For most homes the per-element lump sum is clearest, because you can add or drop items and see the effect on the total immediately.',
          'The single biggest variable is material grade. The same wardrobe carcass in commercial ply, BWP ply or imported board sits at very different price points, and kitchen shutters in laminate versus acrylic versus lacquered glass swing the kitchen cost substantially. We quote interiors against a named-material specification so you are choosing finishes deliberately, not discovering the cost of "premium" after the fact.',
        ],
      },
      {
        heading: 'Cost by element',
        body: [
          'The modular kitchen is normally the largest single interior line — cabinetry, hardware, countertop and appliances together — and it repays investment because it is used daily and is hard to redo later. Fitted wardrobes are the next major item, priced by running foot and by material. False ceilings with integrated lighting are priced per sqft of ceiling treated and vary with design complexity.',
          'Beyond the built-ins, furnishing (loose furniture, soft furnishings, lighting and décor) is as elastic as your taste — it can be a modest refresh or a major spend. We help clients put the fixed budget where it earns the most: kitchen and bathrooms first, then the rooms you actually live in, rather than spreading it thinly everywhere.',
        ],
      },
      {
        heading: 'Why interiors are best coordinated with the build',
        body: [
          'Interiors designed alongside the architecture avoid the expensive clashes that come from treating them as an afterthought — electrical points end up where the furniture actually goes, plumbing suits the kitchen layout, and false-ceiling levels are planned with the lighting from the start. Retrofitting these into a finished house means chasing walls and redoing work.',
          'Because we design and build the structure, our interiors team works from the same drawings, so the modular kitchen and the wiring were planned together. That coordination is itself a cost saving, quite apart from the design quality.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How is interior design priced in Tamil Nadu?',
        answer:
          'Either as a lump sum per room or element (modular kitchen, each wardrobe, false ceiling), or as roughly 10–15% of the furnishing budget. We provide an itemised quote against a named-material specification.',
      },
      {
        question: 'What is the most expensive part of home interiors?',
        answer:
          'Usually the modular kitchen, followed by fitted wardrobes. Both are driven by material grade — ply type, shutter finish, hardware and countertop choice move the cost the most.',
      },
      {
        question: 'Should interiors be planned during construction?',
        answer:
          'Yes. Planning interiors with the structure means electrical points, plumbing and false-ceiling levels suit the final layout, avoiding costly rework after handover.',
      },
    ],
  },
  {
    slug: 'steps-to-build-a-house-in-tamil-nadu',
    kind: 'topic',
    title: 'How to Build a House in Tamil Nadu: Step by Step (2026)',
    seoTitle: 'Steps to Build a House in Tamil Nadu 2026 — Full Guide | AESTA',
    description:
      'The full step-by-step process of building a house in Tamil Nadu in 2026 — land and budget, soil test, design, DTCP/panchayat approvals, construction stages and handover, with a realistic timeline. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'Building a house in Tamil Nadu follows a clear sequence, and knowing it up front is what keeps a project on budget and on schedule. This guide walks through every stage from land and budget to handover, including the approvals that trip up first-time builders, so you understand what happens, in what order, and roughly how long it takes.',
    sections: [
      {
        heading: 'Stage 1 — Land, budget and soil',
        body: [
          'Start with the plot and a realistic budget. Confirm clear title and that the land use permits residential construction, then fix a budget that separates construction cost (priced on built-up area, not plot size) from the things people forget: land registration, approvals, compound wall, sump, borewell, septic tank and interiors. A soil test, recommended on larger or filled plots, sizes the foundation correctly and prevents both over-spending and structural risk.',
          'This is also the point to choose a spec tier honestly. The gap between an Economy and a Luxury build is specification, not margin, so deciding early what level of materials and finishes you want makes every later estimate meaningful.',
        ],
      },
      {
        heading: 'Stage 2 — Design and approvals',
        body: [
          'Next comes design: 2D floor plans, a 3D elevation, and the structural and working drawings your build will be executed from. A plan resolved properly on paper is far cheaper than changing your mind on site. In parallel, the building plan goes for approval — DTCP or municipality rules for town plots, panchayat approval for outlying plots — and approval fees and timelines (commonly a 4–8 week cycle) are budgeted separately from construction.',
          'Getting approvals right matters beyond the paperwork: setbacks and permissible coverage determine how much you can actually build on the plot, which feeds straight back into the design and the budget. A firm that handles approvals in-house removes the single most common source of delay for first-time builders.',
        ],
      },
      {
        heading: 'Stage 3 — Construction and handover',
        body: [
          'Construction runs in a fixed order: foundation and plinth, then the RCC structure, brickwork and plastering, followed by the services rough-in (electrical and plumbing), then flooring, doors and windows, painting and final finishes to your tier. Quality checks at each major milestone — ideally a senior engineer sign-off — catch problems while they are still cheap to fix.',
          'A 1500 sqft G+1 home typically takes 7–10 months from foundation to handover, with the October–December monsoon adding a few weeks if it overlaps foundation work. Handover should include a walkthrough, a defects list closed out, and warranty documentation — not just the keys.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does it take to build a house in Tamil Nadu?',
        answer:
          'A 1500 sqft G+1 home typically takes 7–10 months from foundation to handover. Design and approvals add time before that, and the monsoon can add 2–4 weeks if it overlaps foundation work.',
      },
      {
        question: 'What approvals do I need to build a house in Tamil Nadu?',
        answer:
          'Town plots need DTCP or municipality building-plan approval; outlying plots are panchayat-approved. Fees and a typical 4–8 week cycle are separate from construction cost. We handle the full approval cycle in-house.',
      },
      {
        question: 'What is the first step to building a house?',
        answer:
          'Confirm the plot title and land use, fix a realistic budget separating construction from site works and approvals, and get a soil test on larger or filled plots — then move to design.',
      },
    ],
  },
  {
    slug: 'civil-engineer-vs-architect',
    kind: 'topic',
    title: 'Civil Engineer vs Architect: Who Does What in a House Build?',
    seoTitle: 'Civil Engineer vs Architect — Roles in Home Building | AESTA',
    description:
      'The difference between a civil engineer and an architect when building a house — what each does, why you usually need both, and how a design-build firm combines the roles. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'Civil engineer or architect — homeowners planning a build often ask which one they need, and the honest answer for most houses is both. They do genuinely different jobs, and confusing the two is how projects end up either beautiful but structurally unsound, or solid but awkward to live in. This guide explains exactly what each does and how a design-build firm brings the two together under one accountable roof.',
    sections: [
      {
        heading: 'What an architect does',
        body: [
          'An architect is responsible for the design: how the house looks and how it works to live in. That means the floor plan and space planning, light and ventilation, the elevation and aesthetics, how rooms relate to each other, and the overall experience of the building. The architect also prepares the drawings used for approval and sets the design intent the whole project follows.',
          'A good architect saves you money precisely by resolving these decisions on paper — a plan that suits how your family actually lives, on a plot worked to its setbacks and orientation, avoids expensive changes once walls are going up.',
        ],
      },
      {
        heading: 'What a civil / structural engineer does',
        body: [
          "A civil and structural engineer is responsible for the building standing up safely and lasting. That covers the foundation sized to the soil, the RCC design — columns, beams, slabs and reinforcement — load calculations, and the technical execution on site. The engineer translates the architect's design into a structure that carries its loads and resists settlement, wind and, where relevant, seismic forces.",
          "On site, the engineer's daily supervision is what turns drawings into sound construction: correct steel, correct concrete grade and cover, correct sequencing. Skip this and a fine-looking house can hide serious structural risk.",
        ],
      },
      {
        heading: 'Why you usually need both — and how design-build helps',
        body: [
          'Architect and engineer are complementary, not alternatives. The architect makes the house worth living in; the engineer makes it safe and durable. On a simple, small structure you may lean more on the engineer; on anything ambitious you want both fully engaged and, crucially, talking to each other.',
          'That coordination is the real argument for a design-build firm. At AESTA our NIT Trichy-credentialed architects and in-house civil engineers work from the same drawings and report to one accountable team, so you are not refereeing between a designer and a contractor when something needs resolving — and there is a single point of responsibility from design to handover.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need both a civil engineer and an architect to build a house?',
        answer:
          'For most houses, yes. The architect handles design, space and approvals; the civil/structural engineer handles the foundation, RCC design and safe execution. They do different jobs and the best results come from both working together.',
      },
      {
        question: 'Who do I hire first — architect or engineer?',
        answer:
          'Design usually comes first, then the structural engineer translates it into a buildable, safe structure. In a design-build firm both are engaged together from the start, so the sequence is handled for you.',
      },
      {
        question: 'Does AESTA provide both architecture and civil engineering?',
        answer:
          'Yes. We have NIT Trichy-credentialed architects and in-house civil and structural engineers working from the same drawings, with single-point accountability from design through construction.',
      },
    ],
  },
  {
    slug: 'how-to-choose-a-construction-company-in-tamil-nadu',
    kind: 'topic',
    title: 'How to Choose a Construction Company in Tamil Nadu (2026 Checklist)',
    seoTitle: 'How to Choose a Construction Company in Tamil Nadu | AESTA',
    description:
      'A practical checklist for choosing a construction company or builder in Tamil Nadu in 2026 — credentials, transparent itemised pricing, contracts, supervision, warranty, and the red flags to avoid. By AESTA Architects & Builders.',
    updated: '2026-06',
    intro:
      'Choosing the right construction company is the decision that most determines whether your build goes well, and it is hard to judge from a glossy brochure or the lowest quote. This is a practical checklist — what to verify, what a fair contract looks like, and the warning signs that should make you walk away — written by a firm that would rather you ask these questions of everyone, including us.',
    sections: [
      {
        heading: 'Credentials and track record',
        body: [
          'Start with who actually does the work: are there qualified architects and civil engineers on the team, or only a contractor sub-letting trades? Ask how long the firm has operated, how many projects it has completed, and to see homes it has built — ideally both a recent completion and a live site, so you see finished quality and working practices. Talking to a past client is worth more than any testimonial.',
          "Local presence matters in Tamil Nadu specifically: a firm that knows your district's soil, the DTCP or panchayat approval route, and reliable local material supply will cost and schedule more accurately than one travelling in from far away.",
        ],
      },
      {
        heading: 'Transparent pricing and a real contract',
        body: [
          'Insist on an itemised, specification-backed quote — every material named, measured against built-up area — not a single round per-sqft number. A vague quote is how "₹2,000/sqft" quietly becomes much more once exclusions surface. Confirm exactly what is and is not included: approvals, compound wall, sump, borewell, septic tank and interiors are commonly excluded and should be stated, not assumed.',
          'A proper contract protects both sides: a clear scope and specification, a payment schedule tied to construction milestones (never large sums far ahead of work done), a stated timeline, and a written workmanship warranty. If a builder resists putting the specification and schedule in writing, treat that as the answer.',
        ],
      },
      {
        heading: 'Supervision, communication and red flags',
        body: [
          'Ask who supervises the site day to day and how you will be kept informed — regular photo updates and a named point of contact prevent most disputes. Find out who signs off quality at each milestone, and what happens if a defect appears after handover. These operational details separate firms that deliver from firms that disappear after the advance.',
          'Walk away from a few clear red flags: a quote far below everyone else (something is being left out), pressure to pay large amounts up front, reluctance to give references or show sites, and no written specification or warranty. The cheapest quote is rarely the cheapest build once variations arrive.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I choose a good construction company in Tamil Nadu?',
        answer:
          'Verify qualified architects and engineers on the team, a real track record (ask to see completed and live sites), an itemised specification-backed quote, a milestone-based contract with a written warranty, and clear day-to-day supervision and communication.',
      },
      {
        question: 'What should a construction contract include?',
        answer:
          'A clear scope and named-material specification, a payment schedule tied to construction milestones, a stated timeline, exclusions (approvals, compound wall, sump, borewell, interiors), and a written workmanship warranty.',
      },
      {
        question: 'Why is the cheapest quote often not the cheapest build?',
        answer:
          'A very low quote usually leaves items out or uses lower specifications, which surface later as variations. An itemised quote measured against built-up area lets you compare builders on equal terms.',
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
