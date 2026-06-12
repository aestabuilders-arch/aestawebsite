export type LocationFaq = { question: string; answer: string };

export type LocationContent = {
  slug: string;
  name: string;
  nameTa: string;
  tier: 1 | 2;
  district: string;
  geo: { lat: number; lng: number };
  /** One-line context for the hero/card — direction and distance from the Pudukkottai base. */
  context: string;
  intro: string;
  soilNote: string;
  approvalNote: string;
  faqs: LocationFaq[];
};

// Cost-intent FAQ shared shape: every city answers "how much to build here" with
// the published tier range, so cost-query searchers land on a real answer.
const TIER_RANGE = '₹1,999–₹3,299+/sqft';

export const LOCATIONS: LocationContent[] = [
  // ── Tier 1 ────────────────────────────────────────────────────────────────
  {
    slug: 'pudukkottai',
    name: 'Pudukkottai',
    nameTa: 'புதுக்கோட்டை',
    tier: 1,
    district: 'Pudukkottai',
    geo: { lat: 10.3833, lng: 78.8001 },
    context: 'Our home town and head office.',
    intro:
      'Pudukkottai is our home district and where our office sits. We have built more homes here than anywhere else — soil behaviour, the monsoon calendar, panchayat and DTCP procedure, and local material supply chains are all second nature to us. From North Second Street we run daily site supervision across Pudukkottai town and the surrounding panchayats without travel overhead, which keeps both cost and response time low for clients building in the district.',
    soilNote:
      'Pudukkottai soil is largely lateritic with red-soil pockets. Foundations typically need stepped footing on sloping plots; a soil test is recommended for anything over 2400 sqft or on filled land.',
    approvalNote:
      'Plots in Pudukkottai town fall under municipality / DTCP rules; outlying plots are panchayat-approved. We hold both relationships and handle the full approval cycle (typically 4–8 weeks) in-house.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Pudukkottai?',
        answer: `House construction in Pudukkottai runs ${TIER_RANGE} depending on spec tier — roughly ₹30–50 lakh for a 1500 sqft G+1 home. The rate covers structure and finishes to your chosen tier; land, compound wall, and DTCP fees are separate. See the full per-line-item breakdown on our pricing page.`,
      },
      {
        question: 'How long does construction take in Pudukkottai?',
        answer:
          'A 1500 sqft G+1 home typically takes 7–10 months. The October–December monsoon can add 2–4 weeks if it overlaps foundation work.',
      },
      {
        question: 'Do you handle DTCP and panchayat approvals in Pudukkottai?',
        answer:
          'Yes. We have the municipality / DTCP and panchayat relationships in Pudukkottai town and surrounding areas — a typical approval cycle is 4–8 weeks.',
      },
    ],
  },
  {
    slug: 'karaikudi',
    name: 'Karaikudi',
    nameTa: 'காரைக்குடி',
    tier: 1,
    district: 'Sivaganga',
    geo: { lat: 10.0667, lng: 78.7833 },
    context: 'The Chettinad heartland, south of Pudukkottai.',
    intro:
      'Karaikudi sits at the heart of Chettinad, and clients here often want Chettinad-style proportions — large halls, internal courtyards, period-correct columns and athangudi tiling — combined with modern services. We balance that heritage vocabulary with contemporary structural and electrical standards. Plots tend to be larger than in Pudukkottai, expectations on craft are higher, and many owners have NRI links, so we run key design decisions over scheduled video reviews and document everything for absent stakeholders.',
    soilNote:
      'Karaikudi has predominantly sandy-loam soils with good bearing capacity. Foundations are straightforward; a deep raft is rarely needed below two storeys.',
    approvalNote:
      'Karaikudi falls under the municipality and Sivaganga-district authorities. We coordinate building-plan approval and service connections as part of turnkey packages.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Karaikudi?',
        answer: `Construction in Karaikudi runs ${TIER_RANGE}. Chettinad-style detailing (courtyards, athangudi tiles, teak joinery) usually lands in our Premium or Luxury tier; we quote those finishes line-by-line so there are no surprises.`,
      },
      {
        question: 'Can you build a modern Chettinad-style house in Karaikudi?',
        answer:
          'Yes — this is one of our specialties. We keep heritage proportions and detailing while delivering modern services and earthquake-resistant structure.',
      },
      {
        question: 'Can you coordinate with NRI owners building in Karaikudi?',
        answer:
          'Yes. We run scheduled video walkthroughs, share weekly photo updates, and document approvals so owners abroad can decide remotely with full visibility.',
      },
    ],
  },
  {
    slug: 'aranthangi',
    name: 'Aranthangi',
    nameTa: 'அறந்தாங்கி',
    tier: 1,
    district: 'Pudukkottai',
    geo: { lat: 10.1667, lng: 78.9833 },
    context: 'Coastal–interior belt, south-east of Pudukkottai.',
    intro:
      'Aranthangi covers a coastal-to-interior mix in southern Pudukkottai district. We work in the town and across the surrounding villages toward the Palk Strait coast. Material supply runs from Pudukkottai and Trichy, so we plan lead times into the schedule rather than letting them stall a site. On plots closer to the coast we specify corrosion-resistant fittings and tighter waterproofing as standard.',
    soilNote:
      'Aranthangi soil is variable — sandy near the coast, clay-rich inland. A soil test is strongly recommended for plots over 1500 sqft, and we design footing depth around the result.',
    approvalNote:
      'Most plots are panchayat-approved; town plots follow municipality rules. We handle the approval coordination and factor it into the project timeline.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Aranthangi?',
        answer: `House construction in Aranthangi runs ${TIER_RANGE}. Coastal sites usually need the corrosion-resistant fittings and enhanced waterproofing included from our Premium tier upward; we flag this at quoting.`,
      },
      {
        question: 'Do you build in coastal Aranthangi villages?',
        answer:
          'Yes. On coastal sites we specify corrosion-resistant hardware and additional waterproofing, included in our Premium and Luxury tiers.',
      },
    ],
  },
  {
    slug: 'trichy',
    name: 'Tiruchirappalli',
    nameTa: 'திருச்சிராப்பள்ளி',
    tier: 1,
    district: 'Tiruchirappalli',
    geo: { lat: 10.7905, lng: 78.7047 },
    context: 'The regional city, north of Pudukkottai.',
    intro:
      'Trichy is the regional centre and the city many of our clients work in before building a family home here or back in their native district. We build across Trichy city and the surrounding panchayats — Srirangam, Thiruverumbur, Lalgudi and beyond. Town & Country Planning approvals in the Trichy corporation area are well understood by our team, and our NIT Trichy background means the design talent is local to the city.',
    soilNote:
      'Trichy has rocky / hard-stratum pockets in some areas, which changes excavation cost. We survey the plot before quoting so the foundation line is accurate, not a guess.',
    approvalNote:
      'Trichy corporation plots follow TCP / corporation rules; peripheral plots are panchayat-approved. We manage the approval route end to end.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Trichy?',
        answer: `Construction in Trichy runs ${TIER_RANGE}. Where the plot has rocky strata, excavation can add to the foundation cost — we survey first and quote the actual figure rather than a flat assumption.`,
      },
      {
        question: 'Can you build in central Trichy and the suburbs?',
        answer:
          'Yes. We build across Trichy city and the surrounding panchayats including Srirangam, Thiruverumbur and Lalgudi.',
      },
    ],
  },
  {
    slug: 'thanjavur',
    name: 'Thanjavur',
    nameTa: 'தஞ்சாவூர்',
    tier: 1,
    district: 'Thanjavur',
    geo: { lat: 10.787, lng: 79.1378 },
    context: 'The temple city and Cauvery delta, north-east of Pudukkottai.',
    intro:
      'Thanjavur is rich with traditional building knowledge, and many sites carry heritage considerations or temple-proximity rules. We respect those and integrate them with modern engineering. The city sits in the Cauvery delta, so flood awareness and plinth levels matter on low-lying plots — we design for them rather than discovering the issue after a monsoon.',
    soilNote:
      'Thanjavur sits on alluvial plains with generally good bearing capacity. The real variable is flood risk on low-lying plots near the Cauvery, which we address through plinth height and drainage design.',
    approvalNote:
      'Thanjavur corporation plots follow corporation / DTCP rules; some plots fall under archaeological or heritage-proximity restrictions, which we check before scoping.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Thanjavur?',
        answer: `House construction in Thanjavur runs ${TIER_RANGE}. On low-lying delta plots, raised plinth and drainage work can add to the base — we account for it in the estimate rather than as a later variation.`,
      },
      {
        question: 'Are there special rules near temples in Thanjavur?',
        answer:
          'Some plots fall under archaeological or heritage-proximity rules. We check before scoping and, in restricted zones, adjust massing and finishes accordingly.',
      },
    ],
  },
  // ── Tier 2 ────────────────────────────────────────────────────────────────
  {
    slug: 'keeranur',
    name: 'Keeranur',
    nameTa: 'கீரனூர்',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.45, lng: 78.8167 },
    context: 'On the Pudukkottai–Trichy road, north of our office.',
    intro:
      'Keeranur sits on the Pudukkottai–Trichy road just north of our office, well inside our daily-supervision radius. Being on the highway makes material delivery and site visits efficient, so clients here get the same hands-on attention as in Pudukkottai town without a travel premium. We build individual homes and small commercial units along the through-road and in the surrounding panchayat villages.',
    soilNote:
      'Keeranur shares Pudukkottai’s lateritic / red-soil profile with good bearing capacity. Standard footing suits most two-storey homes; we recommend a soil test on filled or low-lying plots.',
    approvalNote:
      'Keeranur plots are panchayat-approved, with DTCP rules applying to layout plots. We handle the approval coordination as part of the build.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Keeranur?',
        answer: `House construction in Keeranur runs ${TIER_RANGE} — about ₹30–50 lakh for a 1500 sqft G+1 home depending on spec tier. Because Keeranur is on our regular Pudukkottai–Trichy supervision route, there is no travel surcharge.`,
      },
      {
        question: 'Do you supervise Keeranur sites daily?',
        answer:
          'Yes. Keeranur is on our Pudukkottai–Trichy corridor, so it gets the same daily supervision and weekly photo updates as town sites.',
      },
    ],
  },
  {
    slug: 'thirumayam',
    name: 'Thirumayam',
    nameTa: 'திருமயம்',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.2333, lng: 78.7667 },
    context: 'Fort town on the Pudukkottai–Karaikudi road, south of our office.',
    intro:
      'Thirumayam, known for its rock fort on the Pudukkottai–Karaikudi road, lies a short drive south of our office. It is a comfortable day-trip site for our supervisors, and its position between Pudukkottai and the Chettinad belt means we often blend straightforward modern homes here with the heritage detailing clients see further south. We build along the main road and across the surrounding panchayat villages.',
    soilNote:
      'Thirumayam has lateritic soil with rocky outcrops near the fort. Excavation effort varies by exact plot, so we survey before fixing the foundation cost.',
    approvalNote:
      'Thirumayam plots are panchayat / DTCP-approved. We manage plan approval and service connections within the project timeline.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Thirumayam?',
        answer: `Construction in Thirumayam runs ${TIER_RANGE}. Where a plot sits on rocky ground near the fort, excavation can add to the foundation line — we survey and quote the real figure first.`,
      },
      {
        question: 'Is Thirumayam within your regular service area?',
        answer:
          'Yes. Thirumayam is a short drive south of our Pudukkottai office on the Karaikudi road and is well within our daily-supervision range.',
      },
    ],
  },
  {
    slug: 'thirupathur',
    name: 'Thirupathur',
    nameTa: 'திருப்பத்தூர்',
    tier: 2,
    district: 'Sivaganga',
    geo: { lat: 10.2, lng: 78.5667 },
    context: 'Sivaganga-district town, south-west of Pudukkottai.',
    intro:
      'Thirupathur is a Sivaganga-district town south-west of Pudukkottai, on the route toward Madurai. We serve it as part of our wider Sivaganga-belt coverage alongside Karaikudi and Sivaganga town. For sites at this range we plan supervision in scheduled blocks and keep clients current with weekly photo and progress reports, so distance never means losing visibility of your build.',
    soilNote:
      'Thirupathur has mixed red and sandy-loam soils with generally sound bearing capacity. We confirm footing design against a soil test on larger or filled plots.',
    approvalNote:
      'Thirupathur plots follow panchayat / Sivaganga-district rules. We coordinate the approval route and connections as part of turnkey work.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Thirupathur?',
        answer: `House construction in Thirupathur runs ${TIER_RANGE}, around ₹30–50 lakh for a 1500 sqft home by tier. We plan supervision in scheduled visits and report weekly so the distance does not affect quality.`,
      },
      {
        question: 'How do you supervise sites in Thirupathur?',
        answer:
          'We schedule supervision visits in blocks and send weekly photo and progress reports, with a senior engineer signing off each milestone.',
      },
    ],
  },
  {
    slug: 'ponnamaravathy',
    name: 'Ponnamaravathy',
    nameTa: 'பொன்னமராவதி',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.2833, lng: 78.9167 },
    context: 'South-eastern Pudukkottai district.',
    intro:
      'Ponnamaravathy is a town in south-eastern Pudukkottai district, within our home-district coverage. We build individual homes and small commercial buildings here and in the surrounding villages, sourcing material through our established Pudukkottai supply chain. Being inside the district keeps approvals familiar and supervision frequent.',
    soilNote:
      'Ponnamaravathy has lateritic and clay-mixed soils. A soil test is advisable on clay-heavy or low-lying plots so footing depth is designed correctly.',
    approvalNote:
      'Plots are panchayat-approved, with DTCP rules for layout plots. As a Pudukkottai-district town, its approval procedure is one we run routinely.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Ponnamaravathy?',
        answer: `Construction in Ponnamaravathy runs ${TIER_RANGE}. On clay-rich plots, foundation design may add to the base — we test the soil and quote accordingly rather than assuming.`,
      },
      {
        question: 'Is Ponnamaravathy in your home district?',
        answer:
          'Yes. Ponnamaravathy is in Pudukkottai district, so approvals and material supply run through our usual local channels.',
      },
    ],
  },
  {
    slug: 'viralimalai',
    name: 'Viralimalai',
    nameTa: 'விராலிமலை',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.6, lng: 78.55 },
    context: 'North-western Pudukkottai district, toward Trichy and Manapparai.',
    intro:
      'Viralimalai — known for its Murugan temple and peacock sanctuary — sits in north-western Pudukkottai district toward Trichy and Manapparai. It falls on our Pudukkottai–Trichy working corridor, so site visits and deliveries are efficient. We build homes and small commercial units in the town and surrounding villages with the same supervision rhythm as our town sites.',
    soilNote:
      'Viralimalai has red lateritic soil with hard-stratum pockets in the hill-adjacent areas. We survey for rock before quoting excavation and foundation work.',
    approvalNote:
      'Viralimalai plots are panchayat / DTCP-approved. We handle plan approval and connections within the build schedule.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Viralimalai?',
        answer: `House construction in Viralimalai runs ${TIER_RANGE}. Hill-adjacent plots can carry extra excavation cost where rock is present, which we confirm by survey before quoting.`,
      },
      {
        question: 'Do you cover Viralimalai from Pudukkottai?',
        answer:
          'Yes. Viralimalai is on our Pudukkottai–Trichy corridor and within our regular daily-supervision range.',
      },
    ],
  },
  {
    slug: 'alangudi',
    name: 'Alangudi',
    nameTa: 'ஆலங்குடி',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.3667, lng: 78.9833 },
    context: 'East of Pudukkottai — the Guru temple town.',
    intro:
      'Alangudi, the Guru (Dakshinamurthy) temple town, lies just east of Pudukkottai and well within our home-district radius. Pilgrim footfall means we often advise clients here on homes with rentable frontage or guest accommodation alongside standard residences. Proximity to our office keeps supervision frequent and material supply simple.',
    soilNote:
      'Alangudi has lateritic and alluvial-mixed soils with generally good bearing capacity. We recommend a soil test on filled plots near water channels.',
    approvalNote:
      'Alangudi plots are panchayat-approved, with DTCP rules for layouts. Its approval route is one we run routinely as a Pudukkottai-district town.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Alangudi?',
        answer: `Construction in Alangudi runs ${TIER_RANGE}. If you are building with rentable frontage or guest rooms for pilgrim footfall, we cost the extra area at the same per-sqft tier rate.`,
      },
      {
        question: 'Can you design a home with rental frontage in Alangudi?',
        answer:
          'Yes. We regularly plan ground-floor shop or guest-room frontage with private living above for owners near the temple, and detail it in the design stage.',
      },
    ],
  },
  {
    slug: 'illuppur',
    name: 'Illuppur',
    nameTa: 'இலுப்பூர்',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.5167, lng: 78.6167 },
    context: 'North-western Pudukkottai district, on the Trichy side.',
    intro:
      'Illuppur is a town in north-western Pudukkottai district on the Trichy side, within our regular working corridor. We build individual homes and small commercial buildings here and across the surrounding panchayat villages, with material drawn from our Pudukkottai and Trichy supply chain. Being on the corridor keeps both supervision and delivery efficient.',
    soilNote:
      'Illuppur has red lateritic soils with good bearing capacity and occasional hard strata. Standard footing suits most homes; we survey where rock is likely.',
    approvalNote:
      'Illuppur plots are panchayat / DTCP-approved. We coordinate plan approval and service connections within the project timeline.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Illuppur?',
        answer: `House construction in Illuppur runs ${TIER_RANGE}, roughly ₹30–50 lakh for a 1500 sqft G+1 home by tier. Illuppur is on our Pudukkottai–Trichy route, so there is no travel surcharge.`,
      },
      {
        question: 'Is Illuppur within your daily-supervision range?',
        answer:
          'Yes. Illuppur sits on our Pudukkottai–Trichy corridor and gets the same daily supervision as town sites.',
      },
    ],
  },
  {
    slug: 'gandarvakottai',
    name: 'Gandarvakottai',
    nameTa: 'கந்தர்வக்கோட்டை',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.55, lng: 78.8833 },
    context: 'Northern Pudukkottai district, toward Thanjavur.',
    intro:
      'Gandarvakottai sits in northern Pudukkottai district on the route toward Thanjavur, within our home-district coverage. We build here and in the surrounding villages, drawing on our Pudukkottai supply chain and approval relationships. Its position toward the delta means we watch plinth levels and drainage on lower-lying plots.',
    soilNote:
      'Gandarvakottai has lateritic soils grading to alluvial nearer the delta. We design plinth height and drainage for low-lying plots and test soil on larger builds.',
    approvalNote:
      'Gandarvakottai plots are panchayat-approved, with DTCP rules for layouts. As a Pudukkottai-district town, the approval process is familiar to our team.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Gandarvakottai?',
        answer: `Construction in Gandarvakottai runs ${TIER_RANGE}. On lower-lying plots toward the delta, raised plinth and drainage may add to the base, which we include in the estimate.`,
      },
      {
        question: 'Do you build toward the Thanjavur side of the district?',
        answer:
          'Yes. Gandarvakottai is on our northern route toward Thanjavur and well within our regular service area.',
      },
    ],
  },
  {
    slug: 'avudaiyarkoil',
    name: 'Avudaiyarkoil',
    nameTa: 'அவுடையார்கோவில்',
    tier: 2,
    district: 'Pudukkottai',
    geo: { lat: 10.0333, lng: 79.0 },
    context: 'Coastal south-east Pudukkottai district, near Aranthangi.',
    intro:
      'Avudaiyarkoil, home to the Athmanathaswamy temple, lies in the coastal south-east of Pudukkottai district near Aranthangi. We serve it as part of our coastal-belt coverage, where corrosion-resistant fittings and careful waterproofing matter more than inland. Material runs through Pudukkottai and Aranthangi, and we plan lead times into the schedule.',
    soilNote:
      'Avudaiyarkoil has sandy coastal soils that can be loose near the shore. A soil test is strongly recommended, and we design footing depth and salt-resistant concrete cover around the result.',
    approvalNote:
      'Plots are panchayat-approved. We handle approval coordination and, on coastal sites, specify the additional protective detailing from the design stage.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Avudaiyarkoil?',
        answer: `House construction in Avudaiyarkoil runs ${TIER_RANGE}. Coastal sites usually need corrosion-resistant fittings and enhanced waterproofing — included from our Premium tier — which we flag at quoting.`,
      },
      {
        question: 'What extra care do coastal Avudaiyarkoil sites need?',
        answer:
          'Salt-resistant concrete cover, corrosion-resistant hardware, and enhanced waterproofing. We specify these from the design stage on coastal plots.',
      },
    ],
  },
  {
    slug: 'sivaganga',
    name: 'Sivaganga',
    nameTa: 'சிவகங்கை',
    tier: 2,
    district: 'Sivaganga',
    geo: { lat: 9.8433, lng: 78.4809 },
    context: 'Sivaganga district headquarters, south of Karaikudi.',
    intro:
      'Sivaganga is the district headquarters south of Karaikudi, and we serve it as part of our Sivaganga-belt coverage alongside Karaikudi and Devakottai. Clients here range from town residences to homes with Chettinad influences carried over from the surrounding region. We schedule supervision in regular blocks and keep weekly reporting tight so distance from Pudukkottai never costs visibility.',
    soilNote:
      'Sivaganga has sandy-loam and red-soil mixes with generally good bearing capacity. We confirm footing against a soil test on larger or filled plots.',
    approvalNote:
      'Sivaganga town plots follow municipality / district rules; outlying plots are panchayat-approved. We manage the full approval route in turnkey work.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Sivaganga?',
        answer: `Construction in Sivaganga runs ${TIER_RANGE}, around ₹30–50 lakh for a 1500 sqft home by tier. We schedule supervision in regular visits and report weekly so quality holds at this range.`,
      },
      {
        question: 'Do you serve Sivaganga town and district?',
        answer:
          'Yes. We cover Sivaganga town and the surrounding district as part of our Karaikudi–Sivaganga–Devakottai belt.',
      },
    ],
  },
  {
    slug: 'devakottai',
    name: 'Devakottai',
    nameTa: 'தேவகோட்டை',
    tier: 2,
    district: 'Sivaganga',
    geo: { lat: 9.95, lng: 78.8167 },
    context: 'Chettinad town in Sivaganga district, south-east of Karaikudi.',
    intro:
      'Devakottai is a major Chettinad town in Sivaganga district, south-east of Karaikudi, known for its grand merchant mansions. Like Karaikudi, clients here often want heritage proportions and craft — courtyards, athangudi tiling, teak joinery — delivered with modern structure and services. We carry the same Chettinad capability across to Devakottai and coordinate readily with NRI owners common to the area.',
    soilNote:
      'Devakottai has sandy-loam soils with good bearing capacity, similar to Karaikudi. Foundations are straightforward; a deep raft is rarely needed below two storeys.',
    approvalNote:
      'Devakottai plots follow municipality / Sivaganga-district rules. We coordinate building-plan approval and service connections in turnkey packages.',
    faqs: [
      {
        question: 'How much does it cost to build a house in Devakottai?',
        answer: `House construction in Devakottai runs ${TIER_RANGE}. Chettinad-style craft (courtyards, athangudi tiles, teak joinery) typically lands in our Premium or Luxury tier, quoted line by line.`,
      },
      {
        question: 'Can you build a Chettinad-style mansion in Devakottai?',
        answer:
          'Yes. We deliver heritage proportions and detailing with modern structure and services, and coordinate remotely with NRI owners where needed.',
      },
    ],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    nameTa: 'சென்னை',
    tier: 2,
    district: 'Chennai',
    geo: { lat: 13.0827, lng: 80.2707 },
    context: 'State capital — select design-led and NRI engagements.',
    intro:
      'Chennai is well outside our daily-supervision belt, so we take on Chennai work selectively — primarily design-led engagements (architecture, structural design, 3D visualisation) and projects for clients who already know our work in the Pudukkottai–Chettinad region and want us for a home back there or a considered build in the city. For full construction in Chennai we are candid about what we can supervise; we would rather scope honestly than overpromise on distance.',
    soilNote:
      'Chennai soils vary widely — from coastal sand to clay — and city-specific geotechnical input is essential. For construction engagements we commission a local soil test and design to it.',
    approvalNote:
      'Chennai plots follow CMDA / corporation rules, which differ from the district authorities we work with daily. For design-only engagements this does not apply; for construction we partner on local approvals.',
    faqs: [
      {
        question: 'Do you take on construction projects in Chennai?',
        answer:
          'Selectively. We focus on design-led work in Chennai — architecture, structural design, and 3D visualisation — and full construction mainly for clients we already work with. We scope each Chennai enquiry honestly against what we can supervise.',
      },
      {
        question: 'How much does it cost to build a house in Chennai?',
        answer: `Our published tier rates (${TIER_RANGE}) are calibrated to the Pudukkottai–Chettinad region; Chennai labour and logistics differ. For Chennai construction we quote against a local survey rather than applying our regional rate card directly.`,
      },
    ],
  },
];

export function getLocation(slug: string): LocationContent | null {
  return LOCATIONS.find((l) => l.slug === slug) ?? null;
}

export function getLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.slug);
}
