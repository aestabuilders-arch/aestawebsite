# AESTA SEO + AEO Master Strategy — Design

**Version:** 1.0
**Date:** 2026-04-23
**Owner:** Hari
**Companion to:** `AESTA_WEBSITE_PLAN.md` v1.0
**Scope:** Layer on top of the existing master plan. This document specifies how AESTA wins organic and AI-answer traffic against directory listings (JustDial, Sulekha, IndiaMART, Houzz) and template/amateur competitors in the Pudukkottai–Karaikudi–Aranthangi belt, including Trichy, Thanjavur, Chennai, and surrounding districts.

---

## 1. Strategic framing

**We are not fighting directories for brand queries. We are beating them for intent queries and leapfrogging them entirely on AI answer surfaces.**

- **Brand queries** ("justdial pudukkottai builders") — concede. Outranking a directory on its own brand is wasted effort.
- **Intent queries** ("house construction cost pudukkottai 1500 sqft", "nit architect karaikudi", "chettinad style duplex price") — dominate. Directories are generic; AESTA is specific.
- **AI answer surfaces** (ChatGPT, Perplexity, Google AI Overviews, Gemini, Bing Copilot, Tamil voice queries) — own the citation layer. Directories don't write answer-first content, don't publish pricing tables as structured data, and have no Tamil entity coverage. Blue ocean for 12–18 months.

**Underlying thesis:** As AI search replaces traditional search for research-intent queries (construction buying is heavily research-intent — buyers research for months), being the source LLMs cite matters more than being the #3 blue link. Directories have authority but no substance. Build substance first, authority compounds.

**Success state at month 12:** AESTA is the Wikipedia-equivalent for "construction in the Pudukkottai–Karaikudi–Aranthangi belt." When any buyer anywhere — typing into Google, asking Perplexity, or voice-searching in Tamil — has a question about building in this region, the answer cites AESTA.

**Capacity assumption:** Moderate (option 3 from brainstorm) — 2 content pieces per week total (split roughly 1 programmatic page + 1 blog/entity post), 2 YouTube videos per month, weekly Quora/Reddit answers, willingness to hire part-time writer/VA for additional English volume and a Tamil writer for bilingual content. If capacity drops, Phase 2 and Phase 3 programmatic pages (§2 Pillar 4) scale down first. If capacity rises (VA hired, Hari dedicates weekends), Phase 2 completes faster and Phase 3 starts earlier.

---

## 2. Six competitive moats (pillars)

### Pillar 1 — Content & AEO architecture

**Why directories can't match it:** JD, Sulekha, IndiaMART publish listings, not answers. They have no incentive to explain the DTCP approval process in Pudukkottai — they monetize by hiding information behind lead forms. AESTA publishes the answer, earns the trust, then gets the lead.

**What we build:**

1. **Answer-first page structure.** Every content page opens with: `<h1>Question</h1>` → one-sentence direct answer in bold → supporting detail. LLMs extract the bold sentence as the citation; humans scan it as the summary. Example: *"What does a 1500 sqft G+1 house cost in Pudukkottai?"* → **"In 2026, a 1500 sqft G+1 house in Pudukkottai costs ₹31–48 lakh depending on specification tier (Economy to Luxury)."** → full cost breakdown table.

2. **Schema layer — full, not token.** Every page ships with at least one of:
   - `LocalBusiness` + `Service` (all service pages)
   - `FAQPage` (every page with 3+ Q&As — homepage, services, pricing, city pages, blog)
   - `HowTo` (process pages: "how to plan construction", "DTCP approval steps")
   - `Article` + `author` + `datePublished` (blog posts; drives E-E-A-T)
   - `Product` with `offers` and `priceRange` (pricing tiers — rare in construction, huge AEO win)
   - `AggregateRating` + `Review` (reviews section)
   - `BreadcrumbList` site-wide
   - `VideoObject` (YouTube embeds)
   - `Organization` with `founder`, `numberOfEmployees`, `award` (homepage, about)

3. **Entity pages** — Wikipedia-style definitive answers. Target 15–20 total in year 1:
   - *What is DTCP approval in Tamil Nadu?*
   - *What is Chettinad architecture?*
   - *What is a G+1 house?*
   - *Construction cost per sqft in Tamil Nadu 2026*
   - *Vastu-compliant house design in Tamil Nadu*
   - *Types of house foundations used in Pudukkottai soil*
   - *Turnkey vs. contractor-only construction*
   - *Soil testing for home construction in Tamil Nadu*
   - *Home construction loan process in Tamil Nadu*
   - *Sustainable construction materials in Tamil Nadu*
   - *Compound wall cost and design in Tamil Nadu*
   - *Borewell and sump planning for new homes*
   - *Difference between RCC and AAC block construction*
   - *Bathroom waterproofing methods for TN climate*
   - *Choosing flooring for a Tamil Nadu home*
   - 3–5 additional based on Google Search Console data post-launch
   
   These become pages LLMs cite because nobody else in this market writes them properly.

4. **`llms.txt` and AI-crawler allowlist.** Explicit `llms.txt` at root listing canonical content for AI ingestion. Robots rules that *welcome* GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot-Extended, CCBot. Most sites (and all directories) block or ignore AI crawlers; we actively invite them.

5. **Answer-engine-friendly formatting:**
   - Short paragraphs (2–3 sentences)
   - Frequent H2/H3s phrased as natural questions
   - Tables for comparative data
   - Bullet lists ≤ 7 items
   - Every claim attributable to a source or AESTA's own data
   - Date every page (`datePublished`, `dateModified` in schema and visible on page)

**Build implications:**
- Add MDX-based entity pages to `content/entities/` directory
- Build shared `<FAQSection>` component that auto-generates `FAQPage` JSON-LD from props
- Build shared `<ProcessSteps>` component that auto-generates `HowTo` schema
- `llms.txt` generator in Next.js config (emits at build time, lists canonical URLs by priority)
- Schema validation in CI — Lighthouse CI + `schema-dts` typecheck on all JSON-LD blocks; fail build on invalid schema

### Pillar 2 — Local & Entity signals

**Why directories can't match it:** Directories have one GBP per city for themselves. AESTA has one GBP optimized aggressively, plus a consistent entity fingerprint across the web that Google uses to trust us as a real local business.

**What we build:**

1. **GBP — treated as a product, not a checkbox.**
   - Weekly photo posts (completed project milestones)
   - Weekly text posts with UTM-tagged CTAs
   - Q&A section seeded with 15–20 real questions answered by AESTA before customers ask (GBP allows business to post and answer its own Q&As)
   - Service-specific subpages in GBP (each of 8 services added as a distinct "Service")
   - Products section used for each pricing tier (4 products: Economy, Standard, Premium, Luxury)
   - Booking link integration — GBP "Get Quote" button to `/quote?src=gbp`
   - Secondary GBP for Karaikudi office if a physical address exists there (never fake an address — Google penalizes hard)

2. **Local citation network — 40 citations in 60 days.** NAP-consistent listings:
   - Indian directories: JustDial, Sulekha, IndiaMART, TradeIndia, Getzinfoz, AskMe, Yalwa
   - Construction-specific: Houzz India, 99acres Professionals, MagicBricks Agents & Builders, NoBroker Pro, UrbanClap/UrbanPro
   - Maps: Google Maps, Bing Places, Apple Maps Connect, Here WeGo, OpenStreetMap
   - Professional: IIA (if eligible), COA (Council of Architecture), TN State Construction Workers Welfare Board
   - Local TN: Tamil Nadu business directories, Pudukkottai Chamber of Commerce if exists, Karaikudi Business Association

3. **Entity consistency** — one canonical name ("AESTA — Architects & Builders"), one phone, one address, one founded date (2010), one website, one logo used identically everywhere. Entity confusion kills local rankings.

4. **Geo-targeted structured data** — `LocalBusiness` with `areaServed` listing all 17 cities, `geo` coordinates, `hasMap`, `sameAs` linking to every social and directory listing.

5. **Hyper-local content signals** — each location page embeds:
   - Google Map of the city with AESTA projects pinned
   - Local climate/soil paragraph (Pudukkottai laterite soil vs. Karaikudi sandy loam — implications for foundation)
   - List of local suppliers AESTA partners with (cross-links, potential reciprocal backlinks)
   - Local construction regulations (TNCDBR rules applicable, town panchayat vs. municipality)

**Build implications:**
- `cities` table in Supabase expanded with: `geo_lat`, `geo_lng`, `soil_type`, `governing_authority`, `climate_notes`, `nearby_suppliers[]`
- `<LocationHero>` component renders a static geo-pinned map (Mapbox static tile or similar free tier)
- Centralized `NAP` constant (TypeScript `const`) — single source of truth consumed by schema, footer, contact page, GBP export

### Pillar 3 — Review moat (cross-platform aggregation)

**Why directories can't match it:** Reviews on JD stay on JD. Reviews on Sulekha stay on Sulekha. Nobody aggregates. AESTA aggregates everywhere, displays on-site with schema, and turns review volume into a flywheel.

**What we build:**

1. **Review target — ~120 reviews in 12 months across 5+ platforms:**

   | Platform | Target Month 6 | Target Month 12 | Purpose |
   |---|---|---|---|
   | Google Business Profile | 25 | 50 | Ranking factor, AI Overviews cite GBP |
   | Facebook | 10 | 20 | Meta's graph, FB search |
   | JustDial | 10 | 20 | Ranks listing *within* JD |
   | Sulekha | 5 | 10 | Same reason |
   | Houzz India | 5 | 10 | Design-focused, high-intent audience |
   | IndiaMART | 3 | 5 | B2B commercial surface |
   | Trustpilot | 2 | 5 | Increasingly cited by LLMs |
   | **Total** | **60** | **~120** | |

2. **Review collection — systematized:**
   - Post-handover automation: 7 days after project status = "completed", Supabase trigger → WhatsApp message to client with pre-filled links for GBP + Facebook + JustDial (one tap each)
   - Incentive: ₹500 Amazon voucher for clients completing 3+ platforms — verify platform ToS permit this before launching
   - Tamil + English review templates offered to clients who prefer help drafting
   - Supabase `review_outreach` table tracks per-client status: invited / posted-GBP / posted-FB / etc.

3. **On-site review display with schema:**
   - `/reviews` page aggregating all reviews with source platform badges
   - Homepage carousel pulls from aggregated pool
   - Each project page shows reviews tagged to that project
   - `AggregateRating` schema on homepage + service + city pages (conservative: count only verified platform reviews)
   - Rich snippets in Google SERP → stars under AESTA listing → directory listings without stars lose visually
   - Supabase `reviews` table; nightly cron pulls latest from GBP API; JD/Sulekha reviews entered manually via admin panel (no public APIs)

4. **Review-response policy.** Every review — positive or negative — replied to within 48 hours, publicly, with project context. Replies are SEO/AEO signals and turn negatives into trust-builders.

5. **Video testimonial subset** — 10 of the 100+ target as 45–90 second Tamil video testimonials, embedded with `VideoObject` + `Review` schema.

**Build implications:**
- `reviews` + `review_outreach` tables in Supabase (schema in §6)
- `<ReviewCard>` component with platform-source badge
- `/reviews` aggregator page with filter by platform and rating
- Nightly GBP review sync (Vercel cron calling GBP Business Information API)
- `<AggregateRating>` component consumed by qualifying pages
- Post-handover WhatsApp webhook triggered by `projects.status` transitioning to "completed"

### Pillar 4 — Programmatic SEO (scale without slop)

**Why directories can't match it:** Directories scale by adding empty-shell listings. AESTA scales by adding specific, useful, unique 800–1500 word pages that convert.

**Dimensions (multiplied carefully to avoid doorway-page trap):**
- **Locations:** 17 cities
- **Services:** 8
- **Modifiers:** tier (Economy/Standard/Premium/Luxury), size (1000/1200/1500/2000 sqft), floors (G/G+1/G+2), style (Chettinad/modern/contemporary)

Unrestricted cross-product is a trap (thousands of thin pages → Google penalty). Scope in phases.

**Phased programmatic plan (sized honestly to 1 programmatic page/week cadence):**

**Phase 1 — Launch (already in master plan):** 25 pages
- 17 city pages (1 × city)
- 8 service pages (1 × service)

**Phase 2 — Months 2–4 (~12 new programmatic pages, cumulative ~37):**
- Service × top-3-cities (Pudukkottai + Karaikudi + Aranthangi): 8 × 3 − 3 overlap with launch city pages = ~8 new pages
- Size-cost pages: 4 pages (1000 / 1200 / 1500 / 2000 sqft)

**Phase 3 — Months 5–9 (~25 new programmatic pages, cumulative ~62):**
- Service × secondary cities: ship ~15 of the highest-volume combinations (gate by Google Search Console impression data)
- Size-cost pages: 2 more (800, 3000+ sqft)
- Style × city: 5 style-specific ("Chettinad architecture in Karaikudi", "modern duplex Pudukkottai")
- Tier × construction deep spec pages: 3 (Economy, Premium, Luxury — Standard covered by base pricing page)

**Phase 4 — Months 10–12 (~15 new programmatic pages, cumulative ~77):**
- Cost-comparison pages: 5 ("G+1 vs G+2 cost Tamil Nadu")
- Additional service × secondary-city pages based on Phase 3 performance data: 10

**Year-1 page total at moderate capacity:** ~77 programmatic + ~50 blog posts + ~12–15 entity pages + 17 project case studies + base site (about/pricing/contact/reviews/press) = **~160–170 indexable pages**.

If VA or writer is hired at day 90, Phase 3 + Phase 4 can accelerate by ~30%. Budget for that scenario: +15 pages. Target ceiling: ~185 pages year 1.

**Never build:** Size × city × tier (looks spammy, thin). Keep dimensions ≤ 2 per page combo.

**Content-generation rules (anti-thin-content):**

- **Minimum 800 unique words per programmatic page.** First 300 words must be unique to that page (no template reuse).
- **Two mandatory unique content blocks:**
  1. Local specificity — soil/climate/regulation paragraph for city; style/material paragraph for service
  2. A real example — either an AESTA project that fits, or a worked cost breakdown with real local numbers
- **Structured data always.** Every programmatic page = `FAQPage` + `Service` + `LocalBusiness` schemas.
- **Internal linking network.** Every programmatic page links to: 3 sibling pages (same axis), 2 parent pages (service + city), 1 deep content asset (pricing or relevant blog post).
- **Content governance:** Pages drafted by Claude/AI using a rigid template, then edited by a human (Hari, VA, or Tamil). Zero pure-AI pages published. Every page has a human author byline for E-E-A-T.

**Build implications:**
- `landing_pages` table in Supabase (schema in §6): `slug`, `city_slug`, `service_slug`, `tier`, `modifiers`, `hero_image_id`, `unique_intro_md`, `unique_example_md`, `author_id`, `published`
- Next.js dynamic routes: `/[city]/[service]` and `/services/[service]/[modifier]`
- Programmatic sitemap generation with sitemap-index split (50K URLs/file limit — not a near-term concern but designed right)
- `authors` table with Hari, Tamil, civil engineer as named authors; rendered with `Person` schema

### Pillar 5 — Digital PR, backlinks & social seeding

**Why directories can't match it:** Directories have high generic domain authority but no topical authority for "NIT Trichy architect Tamil Nadu" or "sustainable Chettinad design." Topical authority drives long-tail rankings and AI citation.

**Backlink acquisition — 30 quality backlinks in 6 months:**

| Source type | Target | Tactic |
|---|---|---|
| NIT Trichy alumni network | 5 | Alumni directory, alumni magazine feature, department project showcase |
| Architecture portals (IIA, COA India, ArchiDiaries, Architizer, Rethinking The Future) | 5 | Submit 2–3 best projects with photos + case study |
| TN local news (The Hindu TN, Dinamalar, Dinakaran, local weeklies) | 5 | Pitch: "NIT-educated architects return to Pudukkottai, build 100 sustainable homes" |
| Sustainable construction blogs (TERI, GreenTech, BuildingGreen, Think Sustainability) | 3 | Guest post on a specific sustainable build |
| Construction industry pubs (Construction World, CW Interiors, Buildofy) | 3 | Paid or earned feature of a premium project |
| Neram ecosystem cross-links | 4 | From Neram Classes + other Neram properties |
| Local business cross-links | 3 | Local suppliers (cement dealer, tile showroom) — reciprocal |
| University/academic | 2 | TN architecture colleges using AESTA projects as student case studies |

**Reddit seeding** — r/india, r/bangalore, r/tamilnadu, r/IndianRealEstate, r/personalfinanceindia. Increasingly cited by Perplexity and Google AI Overviews. Answer genuine construction questions, build "verified architect" posture, no link-drops. Link only when asked or when a link adds real value. Long game: an account with 500+ karma answering construction questions becomes a reference LLMs cite.

**Quora seeding — 30 high-quality answers in 6 months.** Quora ranks in Google SERPs for long-tail construction queries; answers get cited in AI Overviews. Write 400–600 word answers with byline (B.Arch NIT Trichy, founder AESTA). 1–2 project photos per answer. Soft CTA at end.

**YouTube — 2 videos/month, Tamil-forward:**
- Project walkthroughs (Tamil narration, English subtitles) — 1/month
- Educational shorts (60-second explainers: DTCP approval, steel quantity, etc.) — 1/month
- Tamil title + description, tags include city names, `VideoObject` schema when embedded on site
- Cross-embed on relevant pages (project pages, entity pages, blog posts)

**Neram ecosystem cross-linking — controlled.** Footer mention + one dedicated "Our ecosystem" page on both Neram and AESTA. Don't over-link.

**HARO / SourceBottle / ProfNet India / Qwoted.** NIT-qualified working architect is a valuable source profile. Subscribe, respond to relevant construction/property/design queries, earn mentions in national press.

**Build implications:**
- Resource/blog posts structured as *linkable* assets (data tables, original research, quotable stats). Example: "Construction cost trend Tamil Nadu 2020–2026" with original dataset.
- Author pages (`/about/team/[name]`) with full credentials — drives E-E-A-T
- Press kit page (`/press`) with hi-res logos, founder bio, story angles, project photos, contact

### Pillar 6 — Tamil-first AEO (hardest-to-copy moat)

**Why directories can't match it:** JustDial has some Tamil, Sulekha has minimal, nobody does bilingual at depth. More importantly: ChatGPT, Gemini, Perplexity currently answer Tamil construction queries poorly — no good source material. AESTA becomes that source.

**Tamil coverage scope (expanded beyond master plan):**
- All 8 service pages (Tamil versions)
- Top 5 city pages (Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur)
- All 15–20 entity pages (Pillar 1)
- All 6 featured project case studies
- Pricing page + spec sheets
- 15–20 blog posts (Tamil-original, not translations) over 12 months — volume depends on Tamil writer capacity (Madhu/Tamil/freelancer)
- Tamil FAQ pages

**Tamil SEO done right:**
- Written by native speaker (Madhu, or TN freelance writer at ₹1.50–₹3/word market rate)
- Tamil meta titles, meta descriptions, H1s — not machine-translated
- URL strategy: English slug, Tamil content, Tamil H1 (avoid URL encoding issues with transliterated paths)
- `hreflang="ta-IN"` and `hreflang="en-IN"` tags bidirectionally
- Separate Tamil sitemap
- Tamil JSON-LD: `description` and `name` fields in Tamil on Tamil pages

**Tamil keyword research** — Google Keyword Planner supports Tamil; extract queries from Google Search Console post-launch. Terms to target: வீட்டு கட்டிட செலவு, கட்டிட ஒப்பந்தக்காரர் புதுக்கோட்டை, வீடு வடிவமைப்பு, செட்டிநாடு வீடு, DTCP அனுமதி, கான்க்ரீட் விலை, வீடு கட்ட தமிழ்நாடு. Tanglish hybrid queries also tracked.

**Tamil voice search.** Google Assistant/Siri in Tamil used heavily by older TN homebuyers. Voice queries are long and conversational. Entity pages with question-styled H2s capture these.

**Tamil YouTube.** Primary language for video content. English subtitles always.

**Tamil GBP.** GBP supports Tamil business descriptions and posts. Rare in this belt — Maps differentiation.

**Tamil on AI answer engines** — 12–18 month moat window. Publishing 40–50 Tamil pages with schema positions AESTA as near-default citation before competitors catch on.

**Build implications:**
- `locale` field throughout `projects`, `blog_posts`, `landing_pages`, `entities` tables (parallel rows per locale)
- `<LanguageSwitcher>` component with `hreflang` wiring
- `next-intl` configured: `en-IN` default, `ta-IN` alternate, URL strategy `/ta/*`
- Tamil font stack — Noto Sans Tamil (body), Catamaran or Hind Madurai (display); preloaded
- Tamil sitemap + schema output validated in CI

---

## 3. Directory counter-play

**Reframe:** Directories are a distribution channel that already has traffic. Job: be the winning listing *inside* each directory.

**JustDial (highest priority — ~60% of TN construction directory traffic):**
- Claim free listing immediately, fill every field: 17 cities as service areas, 8 services, hours, 50+ photos, owner video intro
- Upload project photos weekly from admin panel (JD rewards activity)
- **Paid "JD Verified" (₹10–20K/year) — evaluate by ROI, not ideology.** If it drives 5 leads/month at ₹3,000 CPL, it beats Google Ads. Test for 3 months, then decide.
- Collect 20+ JD reviews in month 1 (aligned with Pillar 3)
- Listing title: "AESTA — NIT Trichy Architects & Builders" (natural, not keyword-stuffed)
- Respond to JD inquiries within 15 minutes (JD tracks response rate; boosts fast responders)

**Sulekha:** Same playbook, lower budget. Free listing done thoroughly. Skip "Sulekha Pro" unless JD data shows directories convert.

**IndiaMART:** Better fit for commercial/turnkey. Free listing focused on commercial construction and design services. "TrustSEAL" worth it for B2B credibility.

**Houzz India:** Free Pro account. 50+ high-quality project photos with detailed descriptions. Photo metadata (alt text, project tags, style tags) = SEO gold. Respond to "ideabook" saves.

**MagicBricks / 99acres Professionals:** Claim builder profiles; minimal effort for residual traffic.

**The deeper play — content that makes directories redundant.** Create `/resources/` posts designed to outrank the directory listing for informational queries:
- *"Best construction companies in Pudukkottai — 2026 comparison"* (include competitors honestly; AESTA comes out well)
- *"How to choose a contractor in Tamil Nadu — 2026 guide"*
- *"JustDial vs. direct builder — which is better for house construction?"*

These rank because directories can't self-compare objectively. Users searching "best builder in X" want curation — AESTA provides it, honestly, with AESTA featured.

---

## 4. 90-day execution timeline

Assumes moderate capacity (option 3).

**Days 1–14 — Foundation:**
- NAP constants finalized; all schema consumes them
- `llms.txt` + robots.txt configured (AI crawlers allowed)
- GBP created and verified (verification takes 5–14 days — start day 1)
- All 8 service pages shipped with `Service` + `FAQPage` schema
- 5 Tier-1 city pages live with `LocalBusiness` + local-specificity paragraph
- 6 project case studies live
- Pricing page with `Product` + full spec tables
- Review aggregation table + `/reviews` page skeleton
- Post-handover WhatsApp automation wired

**Days 15–30 — Credibility burst:**
- JD, Sulekha, IndiaMART, Houzz, MagicBricks, 99acres listings claimed + optimized
- 15 additional local citations submitted
- 20 GBP reviews from past clients via WhatsApp outreach
- Press kit page live; pitch 5 TN journalists + 3 architecture portals
- First 3 Quora answers
- Reddit presence (account created, 3 genuine answers)
- First YouTube video (flagship project walkthrough, Tamil + English subs)

**Days 31–60 — Content engine online (4 weeks × 2 content pieces/week = 8 pieces):**
- Phase 2 programmatic: 4 pages (1/week) — service × top-3-cities
- Blog posts: 3 posts (educational, entity, cost-focused)
- Entity pages: 1 published (DTCP approval, highest search-volume topic first)
- 5 more Quora answers; 5 more Reddit answers
- 10 more reviews (cumulative ~30 GBP, ~5 elsewhere)
- 2 YouTube videos (1 project + 1 educational short)
- First backlink outreach batch: 10 pitches (architecture portals, NIT alumni, TN press)
- GBP Q&A seeded with 15 self-answered questions

**Days 61–90 — Compounding (4 weeks × 2 pieces/week = 8 pieces):**
- Phase 2 programmatic: 4 more pages (cumulative ~33 pages published site-wide)
- Blog posts: 3 more (cumulative 6)
- Entity pages: 1 more (cumulative 2 — Chettinad architecture or G+1 house)
- Tamil content: 5 pages published (services + city pages translated by hired Tamil writer, runs in parallel to English cadence)
- 30 more reviews (cumulative 60+ across platforms)
- 2 YouTube videos
- 10 more Quora answers; Reddit maintained
- Second backlink batch: HARO/Qwoted responses, guest post pitches, TN news follow-ups
- **Day 90 audit** — measure actual rankings, traffic, leads vs. KPI targets; adjust Phase 3 scope. If traffic trending above plan, commit to VA hire to accelerate Phase 3.

---

## 5. KPIs and measurement

**Weekly dashboard:**
- Organic sessions (GA4)
- Keyword rankings for 20 tracked queries (GSC + Ubersuggest/Ahrefs Webmaster)
- New reviews count
- Leads by source (form + WhatsApp click + phone — call tracking via a number routing tool like Exotel or CallHippo)
- GBP: impressions, calls, direction requests, website clicks
- Lead response time (median)

**Monthly:**
- Referring-domain count (Ahrefs Webmaster Tools, free tier)
- AI citation audit — manually test 10 tracked queries in ChatGPT, Perplexity, Google AI Overviews: *is AESTA cited?*
- Core Web Vitals (CrUX data, Google Search Console report)
- Directory listing performance (JD dashboard impressions/calls; Sulekha same)
- Conversion rate by source
- Schema validation pass rate (must stay 100%)

**Targets by milestone:**

| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Pages indexed (all types) | 45 | 90 | 160–170 |
| Monthly organic sessions | 500 | 2,000 | 8,000 |
| Ranking page 1 for... | 10 long-tail | 25 (incl. 3 primary) | 50 (incl. 8 primary) |
| Total reviews (all platforms) | 30 | 60 | 120 |
| Qualified leads/month from organic | 10 | 30 | 50+ |
| Backlinks (referring domains) | 10 | 25 | 50+ |
| AI citations observed (of 10 test queries) | 2 | 5 | 8 |
| YouTube subscribers | 50 | 300 | 1,500 |
| Signed projects attributable to website | 1–2 cumulative | 3–5 cumulative | 10+ cumulative |

**Kill/scale criteria at Day 90:**
- Month 3 leads/month < 5 → **something's broken**; audit technical SEO + conversion funnel before adding pages
- Month 3 leads/month 5–10 → **on track**; continue Phase 2 programmatic
- Month 3 leads/month > 15 → **above plan**; accelerate Phase 3, increase content budget, test paid local ads

**If AI citations at month 6 < 3 of 10 test queries:** entity pages need rewriting for more direct, quotable answers. Check that `llms.txt` is served and AI crawlers are not blocked (common CDN misconfiguration).

---

## 6. Schema additions to Supabase (delta from master plan §7.2)

New tables:

```sql
-- Entities (if MDX-backed, skip this table; DB-backed allows admin panel editing)
entities (
  slug text pk,                    -- "what-is-dtcp-approval"
  title text,
  title_ta text,
  question text,                   -- The question the page answers
  question_ta text,
  answer_short text,               -- One-sentence bold answer
  answer_short_ta text,
  body_md text,
  body_ta_md text,
  schema_type text,                -- "FAQPage" | "HowTo" | "Article"
  related_entities text[],         -- Slugs for internal linking
  related_services text[],
  related_cities text[],
  author_id uuid references authors(id),
  published boolean default false,
  published_at timestamptz,
  last_reviewed_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz
)

-- Authors (for E-E-A-T)
authors (
  id uuid pk,
  slug text unique,                -- "hari-babu"
  display_name text,
  credentials text,                -- "B.Arch NIT Trichy 2016"
  bio_md text,
  bio_ta_md text,
  photo_url text,
  email text,
  linkedin_url text,
  created_at timestamptz
)

-- Reviews (cross-platform)
reviews (
  id uuid pk,
  source text not null,            -- "gbp" | "facebook" | "justdial" | "sulekha" | "houzz" | "indiamart" | "trustpilot" | "direct"
  external_id text,                -- Platform's review ID (GBP returns one)
  client_name text,
  client_location text,
  rating integer check (rating between 1 and 5),
  quote text,
  quote_ta text,
  project_id uuid references projects(id),
  response_text text,              -- AESTA's reply
  responded_at timestamptz,
  source_url text,
  is_video boolean default false,
  video_url text,
  featured boolean default false,
  display_order integer,
  created_at timestamptz
)

-- Review outreach tracking
review_outreach (
  id uuid pk,
  client_name text,
  phone text,
  project_id uuid references projects(id),
  invited_at timestamptz,
  status text,                     -- "invited" | "posted_gbp" | "posted_fb" | "posted_jd" | "posted_multiple" | "declined" | "bounced"
  platforms_posted text[],
  incentive_sent boolean default false,
  incentive_sent_at timestamptz,
  notes text,
  updated_at timestamptz
)

-- Programmatic landing pages
landing_pages (
  id uuid pk,
  slug text unique,                -- "karaikudi/residential-construction"
  page_type text,                  -- "city_service" | "size_cost" | "tier_spec" | "style_city" | "comparison"
  city_slug text references cities(slug),
  service_slug text,
  tier text,
  modifier_json jsonb,             -- {size_sqft: 1500, floors: "G+1", style: "chettinad"}
  title text,
  title_ta text,
  meta_description text,
  meta_description_ta text,
  hero_image_id uuid,
  unique_intro_md text,
  unique_intro_ta_md text,
  unique_example_md text,
  unique_example_ta_md text,
  featured_project_ids uuid[],
  author_id uuid references authors(id),
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz
)

-- Suppliers / local partners (for backlinks + location page content)
suppliers (
  id uuid pk,
  name text,
  category text,                   -- "cement" | "tiles" | "steel" | "plumbing" | "electrical" | "paint"
  city_slug text references cities(slug),
  website_url text,
  phone text,
  is_partner boolean default false,
  created_at timestamptz
)
```

Field additions to existing tables:

```sql
-- projects: add locale tracking
alter table projects add column locale text default 'en-IN';
alter table projects add column author_id uuid references authors(id);

-- blog_posts: add E-E-A-T fields
alter table blog_posts add column author_id uuid references authors(id);
alter table blog_posts add column last_reviewed_at timestamptz;
alter table blog_posts add column reading_time_minutes integer;
alter table blog_posts add column locale text default 'en-IN';

-- cities: expand for hyper-local content
alter table cities add column geo_lat numeric(9,6);
alter table cities add column geo_lng numeric(9,6);
alter table cities add column soil_type text;
alter table cities add column governing_authority text;
alter table cities add column climate_notes text;
alter table cities add column climate_notes_ta text;
```

---

## 7. Build implications (delta from master plan §7)

**New / expanded sitemap nodes:**
- `/resources/entities/[slug]` — 15–20 entity pages
- `/reviews` — aggregated reviews with platform filters
- `/press` — press kit for journalists
- `/[city]/[service]` — programmatic dynamic route
- `/services/[service]/[modifier]` — programmatic dynamic route for size/tier/style
- `/about/team/[name]` — per-author pages
- `/ta/*` — expanded Tamil coverage (top 5 cities + all services + all entity pages + 6 projects)

**Build-time artifacts:**
- `llms.txt` — generated from a ranked list of canonical URLs
- `sitemap-index.xml` + per-section sitemaps (pages, blog, entities, projects, locations, landing, ta)
- `robots.txt` — AI crawlers allowed explicitly

**CI additions:**
- Schema validation: run `schema-dts` typecheck + Schema.org structured-data testing against key page types
- Lighthouse CI on homepage + pricing + one city page + one service page — fail build if any score drops > 5 points
- Broken-link check on all internal links (prevents programmatic page drift)
- `hreflang` validation (every `ta-IN` page has a matching `en-IN` and vice versa)

**Admin panel additions (delta from master plan §7.3):**
- **Reviews management** — list reviews by platform and status; add JD/Sulekha reviews manually; edit response text; mark featured; upload video testimonial
- **Review outreach inbox** — list past clients not yet invited; one-tap WhatsApp invite with pre-filled message; track status
- **Landing pages CRUD** — template-driven page creation with required unique-intro and unique-example fields; AI-assisted draft with human-edit-required gate before publish; published/draft toggle
- **Entity pages CRUD** — same pattern as landing pages
- **Authors** — add/edit authors, upload photos, edit bios EN + TA
- **Content calendar** — read-only view of scheduled blog + video posts
- **AI-citation checklist** — monthly form to log results of 10 test queries across ChatGPT / Perplexity / Google AI Overviews (manual, but persisted for trend tracking)

**Component additions:**
- `<FAQSection>` — renders Q&A pairs and emits `FAQPage` JSON-LD
- `<ProcessSteps>` — renders numbered steps and emits `HowTo` JSON-LD
- `<AggregateRating>` — renders stars + count and emits `AggregateRating` JSON-LD (only when source-verified reviews ≥ 3)
- `<ReviewCard>` — displays one review with platform badge
- `<LocationHero>` — static geo-pinned map for city pages
- `<AuthorByline>` — shows author name + credentials + photo; emits `Person` JSON-LD
- `<LanguageSwitcher>` — toggles between `en-IN` and `ta-IN` with proper `hreflang` wiring
- `<YouTubeEmbed>` — lazy-loaded YouTube with `VideoObject` JSON-LD from props

---

## 8. Open decisions requiring sign-off

These extend `AESTA_WEBSITE_PLAN.md` §12 (numbered 13+ to continue the series):

13. **JustDial paid listing budget** — approve ₹15–20K for 3-month paid test? Default: yes, measure CPL.
14. **Review incentive** — ₹500 Amazon voucher per multi-platform reviewer; budget for 50 reviewers = ₹25K over 12 months. Approve?
15. **Tamil writer** — hire freelancer (~₹1.50–₹3/word), or assign Madhu / Tamil / Hari? Affects content velocity.
16. **Reddit/Quora account owner** — who manages the daily posting? Suggestion: Hari (for credibility), with VA drafting.
17. **Photographer engagement** — one-day pre-launch shoot of 3–4 best projects (₹5–10K). Approve?
18. **Call tracking tool** — Exotel/CallHippo/similar to attribute phone leads to SEO. Approve ₹500–1500/month?
19. **Backlink outreach owner** — Hari personally, VA, or paid outreach agency? Affects quality vs. velocity trade-off.
20. **NIT alumni network activation** — comfortable leveraging personal alumni network for press/backlinks, or treat as separate non-AESTA identity?
21. **Neram cross-link scope** — footer mention only, dedicated ecosystem page, or deeper integration (shared resources section)?

---

## 9. Delta to fold into `AESTA_WEBSITE_PLAN.md`

Explicit edits to the master plan (not full re-draft):

- **§3.3** — expand GBP actions to include weekly posts, seeded Q&A, secondary GBP if physical Karaikudi address exists
- **§4.1 (sitemap)** — add `/resources/entities/*` (15–20 entity pages), `/reviews`, `/press`, `/[city]/[service]` dynamic routes, expand `/ta/*` to top 5 cities + all services + entity pages + 6 projects
- **§7.1** — add `llms.txt` generation, schema validation in CI, `next-intl` `ta-IN` config, `<YouTubeEmbed>` with `VideoObject` schema, static map rendering
- **§7.2 (schema)** — add `entities`, `authors`, `reviews`, `review_outreach`, `landing_pages`, `suppliers` tables; add `locale`, `author_id`, `last_reviewed_at` fields per §6 above
- **§7.3 (admin)** — add Reviews management, Review outreach inbox, Landing pages CRUD, Entity pages CRUD, Authors, Content calendar, AI-citation checklist
- **§8 (content homework)** — add: past-client WhatsApp list for review outreach; NIT alumni contacts; local TN journalist list; Tamil writer identified; Reddit/Quora accounts with bios
- **§9 (timeline)** — insert this 90-day sprint as "Week 5–17" after current Week 4 launch
- **§10 (metrics)** — adopt §5 KPI table as the authoritative version
- **§12 (open decisions)** — add items 13–21 per §8 above

---

## 10. Non-goals (explicitly not doing this round)

- Not pursuing Google Ads in the first 90 days — organic + directory + AI citation first, paid ads evaluated at Day 90 based on leads baseline
- Not building a community forum or user-generated-content surface (spam risk, moderation overhead)
- Not supporting more than two locales (`en-IN`, `ta-IN`) in v1 — Telugu/Kannada/Hindi are not priority markets
- Not targeting pan-India queries ("house construction cost India") — geographic focus is our edge
- Not publishing pure-AI-generated content without human editing and author byline
- Not paying for low-quality backlink packages, PBNs, or directory spam — one penalty resets a year of work

---

*End of design. Version 1.0. Ready for user review and transition to implementation plan.*
